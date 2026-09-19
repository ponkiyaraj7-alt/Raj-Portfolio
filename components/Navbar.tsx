"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import PresenceChip from "@/components/hero/PresenceChip";
import AudioToggle from "@/components/hero/AudioToggle";
import { sounds } from "@/lib/audio";

const LINKS = [
  { id: "stack", label: "Skills" },
  { id: "work", label: "Work" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      setScrolled(y > 80);
      setProgress(Math.min(1, Math.max(0, y / max)));
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const updatePill = (index: number) => {
    const el = linkRefs.current[index];
    const parent = el?.parentElement;
    if (!el || !parent) { setPill(null); return; }
    const er = el.getBoundingClientRect();
    const pr = parent.getBoundingClientRect();
    setPill({ x: er.left - pr.left, w: er.width });
  };

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    sounds.click();

    if (isHome) {
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    router.push("/");
  };

  const handleSectionClick = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    sounds.click();
    if (!isHome) return;

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  const dark = false;

  return (
    <motion.nav
      className="portfolio-nav"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      style={{
        position: "fixed", top: "20px", left: "50%",
        transform: "translateX(-50%)", zIndex: 50,
        background: dark
          ? "rgba(15,17,23,0.55)"
          : scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.30)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: dark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.08)",
        borderRadius: "100px",
        padding: "6px 8px",
        boxShadow: scrolled
          ? "0 8px 30px rgba(0,0,0,0.10)"
          : dark ? "0 8px 40px rgba(0,0,0,0.35)" : "0 4px 20px rgba(0,0,0,0.04)",
        transition: "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
        overflow: "hidden",
      }}
    >
      {/* Scroll-progress hairline */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1.5,
          transformOrigin: "left center",
          transform: `scaleX(${progress})`,
          background: "linear-gradient(90deg, #52b788, #38bdf8)",
          opacity: progress > 0.01 ? 1 : 0,
          transition: "transform 0.12s linear, opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      <div className="portfolio-nav-inner" style={{ display: "flex", alignItems: "center", gap: 4, position: "relative" }}>
        {/* Logo */}
        <Link
          href="/"
          data-cursor="click"
          onClick={handleHomeClick}
          onMouseEnter={() => sounds.hover()}
          style={{
            padding: "8px 16px", borderRadius: "100px",
            fontSize: "15px", fontWeight: 700,
            color: dark ? "#ffffff" : "#0f172a",
            textDecoration: "none",
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "-0.025em",
            transition: "color 0.4s ease",
            display: "inline-flex", alignItems: "baseline", gap: 1,
          }}
        >
          <span className="nav-logo-n" style={{ display: "inline-block", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>R</span>
          <span>aj</span>
        </Link>

        <div className="nav-divider-primary" style={{
          width: 1, height: 16, margin: "0 4px",
          background: dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.10)",
          transition: "background 0.4s ease",
        }} />

        {/* Links wrapper with magnetic pill */}
        <div className="nav-links" style={{ position: "relative", display: "flex", alignItems: "center" }}
             onMouseLeave={() => setPill(null)}>
          {/* Pill background */}
          <div
            aria-hidden
            style={{
              position: "absolute", top: "50%",
              left: pill ? pill.x : 0,
              width: pill ? pill.w : 0,
              height: 30,
              transform: "translateY(-50%)",
              background: dark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.06)",
              borderRadius: 100,
              transition: "left 0.35s cubic-bezier(0.16,1,0.3,1), width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
              opacity: pill ? 1 : 0,
              pointerEvents: "none",
            }}
          />
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              ref={(el) => { linkRefs.current[i] = el; }}
              href={`/#${l.id}`}
              data-cursor="click"
              onClick={handleSectionClick(l.id)}
              onMouseEnter={() => { updatePill(i); sounds.hover(); }}
              style={{
                position: "relative", zIndex: 1,
                padding: "8px 14px", borderRadius: 100,
                fontSize: 13, fontWeight: 500,
                color: dark ? "rgba(255,255,255,0.78)" : "#475569",
                textDecoration: "none",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                letterSpacing: "-0.01em",
                transition: "color 0.3s ease",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-divider-secondary" style={{
          width: 1, height: 16, margin: "0 6px",
          background: dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.10)",
          transition: "background 0.4s ease",
        }} />

        {/* Presence chip — visible on >= 720px */}
        <span className="nav-presence" style={{ display: "inline-flex" }}>
          <PresenceChip dark={dark} />
        </span>

        <span className="nav-audio" style={{ marginLeft: 6 }}>
          <AudioToggle dark={dark} />
        </span>

        {/* Primary CTA */}
        <Link
          href="/quote"
          data-cursor="click"
          onClick={() => sounds.click()}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#40916c"; sounds.hover(); }}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#2d6a4f")}
          style={{
            marginLeft: 6,
            padding: "9px 18px", borderRadius: 100,
            fontSize: 13, fontWeight: 600,
            background: "#2d6a4f", color: "#ffffff",
            textDecoration: "none",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            letterSpacing: "-0.01em",
            transition: "background 0.25s ease",
          }}
        >
          Get Quote
        </Link>
      </div>

      <style jsx global>{`
        .nav-logo-n:hover { transform: rotate(360deg); }
        @media (max-width: 760px) {
          .nav-presence { display: none !important; }
        }
        @media (max-width: 640px) {
          .portfolio-nav {
            top: 12px !important;
            max-width: calc(100vw - 24px) !important;
            padding: 6px !important;
          }
          .portfolio-nav-inner {
            flex-wrap: nowrap !important;
          }
          .portfolio-nav a {
            display: inline-flex !important;
          }
          .portfolio-nav .nav-links,
          .portfolio-nav .nav-divider-primary,
          .portfolio-nav .nav-divider-secondary,
          .portfolio-nav .nav-audio,
          .portfolio-nav .nav-presence {
            display: none !important;
          }
        }
      `}</style>
    </motion.nav>
  );
}

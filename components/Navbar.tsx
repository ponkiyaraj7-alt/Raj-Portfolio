"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import PresenceChip from "@/components/hero/PresenceChip";
import AudioToggle from "@/components/hero/AudioToggle";
import { sounds } from "@/lib/audio";

const LINKS = [
  { id: "system", label: "System" },
  { id: "capabilities", label: "Capabilities" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "playground", label: "Lab" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
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
        position: "fixed", top: "18px", left: "50%",
        transform: "translateX(-50%)", zIndex: 50,
        background: scrolled ? "rgba(255, 255, 255, 0.92)" : "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid #e2e5e9",
        borderRadius: "100px",
        padding: "5px 8px",
        boxShadow: scrolled
          ? "0 8px 30px rgba(17,19,24,0.06), 0 1px 3px rgba(17,19,24,0.04)"
          : "0 4px 20px rgba(17,19,24,0.03)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Scroll-progress hairline */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          transformOrigin: "left center",
          transform: `scaleX(${progress})`,
          background: "linear-gradient(90deg, #2563eb, #6366f1)",
          opacity: progress > 0.01 ? 1 : 0,
          transition: "transform 0.12s linear, opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      <div className="portfolio-nav-inner" style={{ display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
        {/* Logo: RAJ.PONKIYA */}
        <Link
          href="/"
          data-cursor="click"
          onClick={handleHomeClick}
          onMouseEnter={() => sounds.hover()}
          style={{
            padding: "6px 14px", borderRadius: "100px",
            fontSize: "12.5px", fontWeight: 700,
            color: "#111318",
            textDecoration: "none",
            fontFamily: "var(--font-mono), monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            transition: "color 0.2s ease",
            display: "inline-flex", alignItems: "center", gap: 3,
          }}
        >
          <span>RAJ</span>
          <span style={{ color: "#2563eb" }}>.</span>
          <span>PONKIYA</span>
        </Link>

        <div className="nav-divider-primary" style={{
          width: 1, height: 16, margin: "0 4px",
          background: "#e2e5e9",
          transition: "background 0.3s ease",
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
              height: 28,
              transform: "translateY(-50%)",
              background: "rgba(37, 99, 235, 0.08)",
              borderRadius: 100,
              transition: "left 0.25s cubic-bezier(0.16,1,0.3,1), width 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease",
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
                padding: "6px 12px", borderRadius: 100,
                fontSize: 12.5, fontWeight: 500,
                color: "#5f6672",
                textDecoration: "none",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                letterSpacing: "-0.01em",
                transition: "color 0.2s ease",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-divider-secondary" style={{
          width: 1, height: 16, margin: "0 4px",
          background: "#e2e5e9",
          transition: "background 0.3s ease",
        }} />

        {/* Technical Status Pill */}
        <div
          className="nav-presence"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 100,
            background: "#f1f3f5",
            fontSize: 11,
            fontWeight: 600,
            color: "#111318",
            fontFamily: "var(--font-mono), monospace",
            letterSpacing: "0.04em",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#2563eb",
              boxShadow: "0 0 6px #2563eb",
            }}
          />
          <span>OPEN</span>
        </div>

        <span className="nav-audio" style={{ marginLeft: 4 }}>
          <AudioToggle dark={false} />
        </span>

        {/* Primary CTA */}
        <Link
          href="/quote"
          data-cursor="click"
          onClick={() => sounds.click()}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#1d4ed8"; sounds.hover(); }}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#2563eb")}
          style={{
            marginLeft: 4,
            padding: "8px 16px", borderRadius: 100,
            fontSize: 12.5, fontWeight: 600,
            background: "#2563eb", color: "#ffffff",
            textDecoration: "none",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            letterSpacing: "-0.01em",
            boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
            transition: "all 0.2s ease",
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

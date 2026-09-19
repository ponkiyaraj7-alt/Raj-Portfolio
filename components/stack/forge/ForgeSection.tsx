"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SKILLS, type Skill } from "@/data/content";
import TechMarquee from "@/components/stack/TechMarquee";
import ForgeBento from "./ForgeBento";
import ForgeCommandBar, { type FilterValue } from "./ForgeCommandBar";
import { DensityProvider } from "./DensityContext";

const ConstellationBG  = dynamic(() => import("./ConstellationBG"),  { ssr: false });
const CommandPalette   = dynamic(() => import("./CommandPalette"),   { ssr: false });
const CreativeProcessPanel = dynamic(() => import("./CreativeProcessPanel"), { ssr: false });

function ForgeInner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<FilterValue>("All");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  // Counts per filter value (for chips)
  const counts = useMemo<Record<FilterValue, number>>(() => {
    const c: Record<FilterValue, number> = { "All": SKILLS.length, "AI & GenAI": 0, "Web": 0, "Mobile": 0, "Infra": 0, "DesignOps": 0 };
    SKILLS.forEach((s) => { c[s.category] += 1; });
    return c;
  }, []);

  // ⌘K listener — scoped to the section being in viewport
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key?.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "k") {
        // only trigger when section is at least partially visible
        const r = sectionRef.current?.getBoundingClientRect();
        if (!r) return;
        const inView = r.bottom > 0 && r.top < window.innerHeight;
        if (inView) {
          e.preventDefault();
          setPaletteOpen(true);
        }
      } else if (k === "escape" && paletteOpen) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  const handlePick = useCallback((s: Skill) => {
    // If skill is filtered out, switch filter to "All" first
    if (filter !== "All" && s.category !== filter) setFilter("All");
    setHighlighted(s.name);
    requestAnimationFrame(() => {
      const el = bentoRef.current?.querySelector<HTMLElement>(`[aria-label*="${CSS.escape(s.name)}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    window.setTimeout(() => setHighlighted(null), 1800);
  }, [filter]);

  return (
    <section
      id="stack"
      ref={sectionRef}
      style={{
        backgroundColor: "#080C10",
        padding: "120px 0 0",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Noise texture */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "160px",
      }} />

      {/* Deep ambient orbs (kept from legacy for cohesion) */}
      <div aria-hidden style={{ position: "absolute", top: "-200px", left: "-150px", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(82,183,136,0.055) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", top: "10%", right: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", bottom: "0", left: "30%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(2,125,253,0.045) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Ambient WebGL/canvas constellation */}
      <ConstellationBG />

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 2 }}>

        {/* ── Header ── */}
        <div className="forge-hdr" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 56, alignItems: "end" }}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}
            >
              <div style={{ width: 28, height: 1, background: "rgba(82,183,136,0.6)" }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#52b788", fontFamily: "var(--font-mono), monospace" }}>
                The Forge · A live arsenal
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                margin: 0,
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(42px, 5.5vw, 80px)",
                lineHeight: 1.0,
                letterSpacing: "-0.05em",
                color: "#f1f5f9",
              }}
            >
              The Tools I<br />
              <span style={{
                background: "linear-gradient(135deg, #52b788 0%, #A855F7 55%, #61DAFB 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Build With.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.85, color: "rgba(148,163,184,0.72)", maxWidth: 460 }}>
              Not a logo wall — a <em style={{ color: "#f1f5f9", fontStyle: "normal", fontWeight: 600 }}>working</em> arsenal.
              Hover the showpieces below to see retrieval-augmented pipelines, streaming LLMs, type-safe everything,
              and Flutter UI breathing in real time. <span style={{ color: "#52b788" }}>Press ⌘K</span> to search 33 tools.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { n: "6+",                 label: "years",        c: "#52b788" },
                { n: `${SKILLS.length}`,    label: "technologies", c: "#A855F7" },
                { n: "30+",                label: "shipped",      c: "#61DAFB" },
              ].map(({ n, label, c }) => (
                <div key={label} style={{
                  padding: "10px 18px", borderRadius: 14,
                  background: `${c}0d`, border: `1px solid ${c}22`,
                  display: "flex", flexDirection: "column", gap: 1,
                }}>
                  <span style={{ fontSize: 20, fontWeight: 900, color: c, letterSpacing: "-0.04em", fontFamily: "var(--font-display), sans-serif", lineHeight: 1 }}>{n}</span>
                  <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(148,163,184,0.42)", letterSpacing: "0.1em", fontFamily: "var(--font-mono), monospace" }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Command bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ForgeCommandBar
            active={filter}
            onChange={setFilter}
            counts={counts}
            onOpenPalette={() => setPaletteOpen(true)}
          />
        </motion.div>

        {/* ── Sidebar + Bento Grid ── */}
        <div
          ref={bentoRef}
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 20,
            alignItems: "start",
          }}
          className="forge-main-grid"
        >
          {/* Creative Process Sidebar */}
          <CreativeProcessPanel />

          {/* Bento Grid */}
          <ForgeBento
            skills={SKILLS}
            filter={filter}
            highlightedName={highlighted}
          />
        </div>

        {/* ── Divider ── */}
        <div style={{
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
          margin: "64px 0 32px",
        }} />

        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(148,163,184,0.32)", fontFamily: "var(--font-mono), monospace" }}>
            Also works with
          </span>
        </div>
      </div>

      {/* Marquee (kept) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ paddingBottom: 100, position: "relative", zIndex: 2 }}
      >
        <TechMarquee />
      </motion.div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        skills={SKILLS}
        onPick={handlePick}
      />

      <style jsx global>{`
        @media (max-width: 1100px) {
          .forge-main-grid { grid-template-columns: 280px 1fr !important; }
        }
        @media (max-width: 900px) {
          .forge-hdr { grid-template-columns: 1fr !important; gap: 32px !important; }
          .forge-main-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes marquee-left {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marquee-right {
          0%   { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </section>
  );
}

export default function ForgeSection() {
  return (
    <DensityProvider>
      <ForgeInner />
    </DensityProvider>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/data/content";
import BaseCell from "./BaseCell";
import { useReducedMotion } from "../useReducedMotion";

const SCRIPT: { text: string; cls?: "cmd" | "ok" | "muted" | "head" | "info" | "deploy"; delay?: number }[] = [
  { text: "$ next build", cls: "cmd" },
  { text: "  ▲ Next.js 15.4", cls: "info", delay: 220 },
  { text: "  Creating an optimized production build...", cls: "muted" },
  { text: "  ✓ Compiled successfully", cls: "ok", delay: 380 },
  { text: "  ✓ Linting & type checking", cls: "ok" },
  { text: "  ✓ Collecting page data", cls: "ok" },
  { text: "  ✓ Finalizing page optimization", cls: "ok", delay: 220 },
  { text: "", cls: "muted" },
  { text: "  Route (app)             Size    First Load", cls: "head" },
  { text: "  ┌ ○ /                  4.2 kB     102 kB", cls: "muted" },
  { text: "  ├ ○ /work              8.1 kB     106 kB", cls: "muted" },
  { text: "  └ ○ /quote             2.9 kB      98 kB", cls: "muted" },
  { text: "", cls: "muted" },
  { text: "$ vercel --prod", cls: "cmd", delay: 480 },
  { text: "  🚀 Deployed to production", cls: "deploy", delay: 320 },
];

export default function NextShipCell({ skill, index = 0, span }: { skill: Skill; index?: number; span?: { col?: number; row?: number } }) {
  const reduced = useReducedMotion();
  const cellRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lineIdx, setLineIdx] = useState(reduced ? SCRIPT.length : 0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!cellRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.2 }
    );
    obs.observe(cellRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    const clear = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
    clear();
    setLineIdx(0);
    let i = 0;
    const tick = () => {
      i += 1;
      setLineIdx(i);
      if (i < SCRIPT.length) {
        const next = SCRIPT[i];
        timersRef.current.push(setTimeout(tick, (next.delay ?? 140)));
      } else {
        // restart after a long pause
        timersRef.current.push(setTimeout(() => { setLineIdx(0); i = 0; tick(); }, 5500));
      }
    };
    timersRef.current.push(setTimeout(tick, 220));
    return clear;
  }, [visible, reduced]);

  const colorFor = (cls?: typeof SCRIPT[number]["cls"]) => {
    switch (cls) {
      case "cmd":    return "#f1f5f9";
      case "ok":     return "#52b788";
      case "info":   return "#cbd5e1";
      case "head":   return "rgba(148,163,184,0.85)";
      case "deploy": return skill.color;
      default:       return "rgba(148,163,184,0.55)";
    }
  };

  return (
    <BaseCell
      ref={cellRef}
      color={skill.color}
      index={index}
      span={span}
      minHeight={360}
      padding="22px"
      noTilt={false}
      ariaLabel="Demonstration: Next.js production build and Vercel deploy"
    >
      <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", gap: 12, zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#52b788", boxShadow: `0 0 10px #52b788` }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f1f5f9", fontFamily: "var(--font-mono), monospace" }}>
              {skill.name} · BUILD
            </span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(148,163,184,0.45)", fontFamily: "var(--font-mono), monospace" }}>
            EDGE · APP ROUTER
          </span>
        </div>

        {/* Terminal */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            borderRadius: 12,
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "10px 12px",
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: 11,
            lineHeight: 1.55,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Window dots */}
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F57" }} />
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FEBC2E" }} />
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28C840" }} />
          </div>

          <div>
            {SCRIPT.slice(0, lineIdx).map((l, i) => (
              <div key={i} style={{ color: colorFor(l.cls), whiteSpace: "pre", minHeight: 17 }}>
                {l.text || "\u00A0"}
              </div>
            ))}
            {lineIdx < SCRIPT.length && (
              <span style={{ display: "inline-block", width: 6, height: 12, background: "#52b788", verticalAlign: "middle", animation: "term-blink 1s steps(2) infinite" }} />
            )}
          </div>
        </div>

        {/* Deploy pill */}
        {lineIdx >= SCRIPT.length && (
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 100,
              background: `${skill.color}1f`,
              border: `1px solid ${skill.color}55`,
              animation: "pill-in 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#52b788", animation: "pulse-dot 1.6s ease-in-out infinite" }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: "#f1f5f9", fontFamily: "var(--font-mono), monospace" }}>
              DEPLOYED · 1.4s
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes term-blink { 0%,50%{opacity:1;} 51%,100%{opacity:0;} }
        @keyframes pill-in { from {opacity:0; transform: translateY(6px);} to {opacity:1; transform: translateY(0);} }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(82,183,136,0.6); }
          50% { transform: scale(1.3); opacity: 0.7; box-shadow: 0 0 0 6px rgba(82,183,136,0); }
        }
      `}</style>
    </BaseCell>
  );
}

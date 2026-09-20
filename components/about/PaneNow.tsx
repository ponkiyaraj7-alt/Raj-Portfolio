"use client";
// Pane A — `now()` terminal. Stylized status output with live time.

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Line = { label: string; value: React.ReactNode };

export default function PaneNow() {
  const [time, setTime] = useState<string>("");
  const [typed, setTyped] = useState(false);
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Live PKT time
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Type-on once per session, only when in viewport
  useEffect(() => {
    if (reduceMotion) { setTyped(true); return; }
    const KEY = "portfolio-about-typed";
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem(KEY)) {
        setTyped(true);
        return;
      }
    } catch {}
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        // Trigger the reveal class which CSS will animate; mark done after duration
        setTimeout(() => {
          setTyped(true);
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
        }, 1100);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion]);

  const lines: Line[] = [
    { label: "status",    value: (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
          <span style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "#52b788", opacity: 0.55,
            animation: reduceMotion ? "none" : "presenceRipple 1.8s ease-out infinite",
          }} />
          <span style={{
            position: "relative", width: 8, height: 8, borderRadius: "50%",
            background: "#52b788",
          }} />
        </span>
        <span style={{ color: "#a7f3d0" }}>Available</span>
        <span style={{ color: "rgba(255,255,255,0.30)" }}>·</span>
        <span style={{ color: "rgba(255,255,255,0.55)" }}>Open for opportunities</span>
      </span>
    )},
    { label: "focus",     value: <span style={{ color: "rgba(255,255,255,0.78)" }}>AI Development · Intelligent Automation & Agents</span> },
    { label: "time",  value: (
      <span>
        <span style={{ color: "rgba(255,255,255,0.78)", fontVariantNumeric: "tabular-nums" }}>{time || "--:--"}</span>
      </span>
    )},
    { label: "rhythm",    value: (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
        <span aria-hidden style={{
          display: "inline-flex", gap: 2, alignItems: "center",
        }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} style={{
              width: 5, height: 10, borderRadius: 1,
              background: i < 8 ? "#52b788" : "rgba(255,255,255,0.10)",
            }} />
          ))}
        </span>
        <span style={{ color: "rgba(255,255,255,0.55)" }}>82% capacity this week</span>
      </span>
    )},
  ];

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Current status"
      style={{
        position: "relative",
        padding: "16px 18px 18px",
        fontFamily: "var(--font-mono), monospace",
        fontSize: 12,
        color: "rgba(255,255,255,0.85)",
        overflow: "hidden",
      }}
    >
      {/* Scanline overlay */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(180deg, transparent 0 2px, rgba(255,255,255,0.015) 2px 3px)",
        pointerEvents: "none",
      }} />

      {/* Prompt header */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
        <span style={{ color: "#52b788" }}>dev@portfolio</span>
        <span style={{ color: "rgba(255,255,255,0.40)" }}>:</span>
        <span style={{ color: "#38bdf8" }}>~</span>
        <span style={{ color: "rgba(255,255,255,0.40)" }}>$</span>
        <span style={{ color: "rgba(255,255,255,0.85)", marginLeft: 4 }}>now()</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {lines.map((l, i) => (
          <div
            key={l.label}
            className={typed || reduceMotion ? "" : "pane-now-line"}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              animationDelay: `${i * 0.18}s`,
              opacity: typed || reduceMotion ? 1 : 0,
            }}
          >
            <span style={{ color: "rgba(56,189,248,0.85)", minWidth: 14 }}>→</span>
            <span style={{ color: "rgba(255,255,255,0.40)", minWidth: 70 }}>{l.label}</span>
            <span style={{ flex: 1 }}>{l.value}</span>
          </div>
        ))}
        {/* Caret */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <span style={{ color: "rgba(255,255,255,0.30)" }}>$</span>
          <span aria-hidden style={{
            display: "inline-block", width: 7, height: 13,
            background: "#52b788", opacity: 0.85,
            animation: reduceMotion ? "none" : "heroCursorBlink 1.05s step-end infinite",
          }} />
        </div>
      </div>

      <style jsx>{`
        .pane-now-line {
          animation: paneNowFadeIn 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes paneNowFadeIn {
          0%   { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

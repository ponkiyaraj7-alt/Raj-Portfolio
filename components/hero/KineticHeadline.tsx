"use client";
// Layer 3B — Kinetic headline.
// - Per-line mask reveal
// - Per-character magnetization toward cursor (spring)
// - Scramble effect on the gradient word ("life") on first paint, once per session
// - Hover bumps font-weight (variable axis) per character

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

function MagneticChar({
  char,
  delay,
  gradient = false,
  reduceMotion = false,
}: { char: string; delay: number; gradient?: boolean; reduceMotion?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, weight = 800;
    const RADIUS = 90;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const ex = r.left + r.width / 2;
      const ey = r.top + r.height / 2;
      const dx = e.clientX - ex;
      const dy = e.clientY - ey;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < RADIUS) {
        const f = (1 - dist / RADIUS);
        cx = dx * f * 0.30;
        cy = dy * f * 0.30;
        weight = 800 + Math.round(f * 150);
      } else {
        cx = 0; cy = 0; weight = 800;
      }
    };

    const tick = () => {
      tx += (cx - tx) * 0.18;
      ty += (cy - ty) * 0.18;
      el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
      el.style.fontVariationSettings = `"wght" ${weight}`;
      el.style.fontWeight = String(weight);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <motion.span
      ref={ref}
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        willChange: "transform",
        ...(gradient
          ? {
              background: "linear-gradient(90deg,#52b788 0%,#38bdf8 55%,#818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }
          : {}),
      }}
      initial={reduceMotion ? false : { opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

function ScrambleWord({
  target,
  active,
  reduceMotion,
}: { target: string; active: boolean; reduceMotion: boolean }) {
  const [out, setOut] = useState(reduceMotion || !active ? target : target.replace(/./g, " "));
  useEffect(() => {
    if (reduceMotion || !active) { setOut(target); return; }
    const dur = 700;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      // Reveal characters left-to-right, others scramble
      const reveal = Math.floor(t * target.length);
      let s = "";
      for (let i = 0; i < target.length; i++) {
        if (i < reveal) s += target[i];
        else if (target[i] === " ") s += " ";
        else s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setOut(s);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setOut(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduceMotion]);
  return <>{out}</>;
}

export default function KineticHeadline() {
  const reduceMotion = useReducedMotion() ?? false;
  const [scrambleActive, setScrambleActive] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    const KEY = "portfolio-hero-scramble-played";
    if (sessionStorage.getItem(KEY)) return;
    const t = window.setTimeout(() => {
      setScrambleActive(true);
      sessionStorage.setItem(KEY, "1");
    }, 1500);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  // Line 1: "I bring dead"
  const line1 = useMemo(() => "I bring dead".split(""), []);
  // Line 2: "projects " then gradient word "to life."
  const line2A = useMemo(() => "projects ".split(""), []);

  return (
    <h1
      data-cursor="text"
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "var(--font-display), sans-serif",
        fontWeight: 800,
        letterSpacing: "-0.045em",
        fontSize: "clamp(56px,7.5vw,116px)",
        lineHeight: 1.02,
      }}
    >
      <div style={{ overflow: "visible", lineHeight: 1.1, paddingBottom: "0.1em" }}>
        <span style={{ color: "#ffffff", display: "block" }}>
          {line1.map((c, i) => (
            <MagneticChar key={`a${i}`} char={c} delay={0.30 + i * 0.012} reduceMotion={reduceMotion} />
          ))}
        </span>
      </div>
      <div style={{ overflow: "visible", lineHeight: 1.1, paddingBottom: "0.1em" }}>
        <span style={{ display: "block" }}>
          <span style={{ color: "#ffffff" }}>
            {line2A.map((c, i) => (
              <MagneticChar key={`b${i}`} char={c} delay={0.42 + i * 0.012} reduceMotion={reduceMotion} />
            ))}
          </span>
          <span
            aria-label="to life."
            style={{
              background: "linear-gradient(90deg,#52b788 0%,#38bdf8 55%,#818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
            }}
          >
            <ScrambleWord target="to life." active={scrambleActive} reduceMotion={reduceMotion} />
          </span>
        </span>
      </div>
    </h1>
  );
}

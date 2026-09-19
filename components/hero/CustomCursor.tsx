"use client";
// Layer 5 — Contextual cursor augment.
// Reads `data-cursor="drag" | "click" | "view" | "text" | "link"` on hovered ancestors.
// Uses transform with spring lag. Disabled on touch + reduced-motion.

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CursorState = "default" | "drag" | "click" | "view" | "text" | "link" | "watch";

const LABELS: Record<CursorState, string> = {
  default: "",
  drag: "DRAG",
  click: "CLICK",
  view: "VIEW",
  text: "",
  link: "",
  watch: "WATCH",
};

const SIZES: Record<CursorState, number> = {
  default: 12,
  drag: 56,
  click: 38,
  view: 44,
  text: 4,
  link: 28,
  watch: 60,
};

export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return; // touch devices: no custom cursor

    let mx = 0, my = 0, x = 0, y = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) setVisible(true);

      // Determine state from element under cursor
      const el = e.target as HTMLElement | null;
      let s: CursorState = "default";
      if (el) {
        const cursorEl = el.closest("[data-cursor]") as HTMLElement | null;
        if (cursorEl) {
          s = (cursorEl.dataset.cursor as CursorState) || "default";
        } else {
          const tag = el.tagName.toLowerCase();
          if (tag === "a" || tag === "button" || el.closest("a,button")) s = "click";
          else if (["p", "span", "h1", "h2", "h3", "h4", "li"].includes(tag)) s = "text";
        }
      }
      setState(s);
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      // Spring-ish lag toward target
      x += (mx - x) * 0.22;
      y += (my - y) * 0.22;
      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const size = SIZES[state];
  const label = LABELS[state];
  const isLabelState = state === "drag" || state === "click" || state === "view" || state === "watch";

  return (
    <div
      ref={ringRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: size, height: size,
        borderRadius: 999,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: reduceMotion ? 0 : visible ? 1 : 0,
        background: state === "default" || state === "text"
          ? "rgba(255,255,255,0.85)"
          : state === "drag"
          ? "rgba(82,183,136,0.95)"
          : state === "click"
          ? "rgba(82,183,136,0.92)"
          : state === "view"
          ? "rgba(56,189,248,0.92)"
          : state === "watch"
          ? "rgba(250,204,21,0.92)"
          : "transparent",
        border: state === "link" ? "1.5px solid rgba(255,255,255,0.85)" : "none",
        mixBlendMode: state === "default" || state === "text" ? "difference" : "normal",
        transition: "width 0.28s cubic-bezier(0.16,1,0.3,1), height 0.28s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, opacity 0.2s ease, border-radius 0.25s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-mono), monospace",
        fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
        color: state === "view" ? "#0a0f1c" : "#0a0f1c",
        textTransform: "uppercase",
      }}
    >
      {isLabelState && label}
    </div>
  );
}

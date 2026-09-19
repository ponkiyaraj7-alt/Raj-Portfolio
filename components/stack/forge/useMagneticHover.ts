"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface Options {
  /** Max tilt in degrees on each axis. Default 12. */
  maxTilt?: number;
  /** Scale multiplier on hover. Default 1.025. */
  hoverScale?: number;
  /** Perspective in px. Default 800. */
  perspective?: number;
}

/**
 * Returns mouse handlers that produce a magnetic 3-D tilt on the target div.
 * Disabled on touch devices and when user prefers reduced motion.
 *
 * Apply the returned `bind` props to the OUTER element you want to tilt.
 */
export function useMagneticHover<T extends HTMLElement = HTMLDivElement>(
  opts: Options = {}
) {
  const { maxTilt = 12, hoverScale = 1.025, perspective = 800 } = opts;
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      // Skip on touch — no real cursor.
      if (window.matchMedia?.("(hover: none)").matches) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;   // -1..1
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      const rotY = Math.max(-maxTilt, Math.min(maxTilt, x * maxTilt));
      const rotX = Math.max(-maxTilt, Math.min(maxTilt, -y * maxTilt));
      el.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${hoverScale})`;
      // expose pointer-relative coords as CSS vars for halo effects
      el.style.setProperty("--mx", `${(x + 1) * 50}%`);
      el.style.setProperty("--my", `${(y + 1) * 50}%`);
    },
    [maxTilt, hoverScale, perspective, reduced]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    el.style.willChange = "auto";
  }, [perspective]);

  const onMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.willChange = "transform";
  }, []);

  return { ref, onMouseMove, onMouseLeave, onMouseEnter };
}

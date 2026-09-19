"use client";

import { CSSProperties, ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";
import { useMagneticHover } from "../useMagneticHover";

interface BaseCellProps {
  color: string;                  // accent color of this cell
  index?: number;                 // for stagger delay
  span?: { col?: number; row?: number };  // grid span (12-col grid)
  minHeight?: number;             // px
  padding?: string;
  radius?: number;
  /** disables magnetic tilt (for live-demo cells where tilt would distort the demo) */
  noTilt?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  ariaLabel?: string;
}

const BaseCell = forwardRef<HTMLDivElement, BaseCellProps>(function BaseCell(
  { color, index = 0, span, minHeight = 240, padding = "24px", radius = 22, noTilt = false, className, style, children, ariaLabel },
  forwardedRef
) {
  const { ref: tiltRef, onMouseMove, onMouseEnter, onMouseLeave } = useMagneticHover<HTMLDivElement>({
    maxTilt: noTilt ? 0 : 8,
    hoverScale: noTilt ? 1 : 1.015,
  });

  const setRefs = (el: HTMLDivElement | null) => {
    tiltRef.current = el;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, clipPath: "inset(0 0 100% 0 round 22px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 22px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.05 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{
        gridColumn: span?.col ? `span ${span.col}` : undefined,
        gridRow: span?.row ? `span ${span.row}` : undefined,
        minWidth: 0,
      }}
      className={className}
      aria-label={ariaLabel}
    >
      <div
        ref={setRefs}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          position: "relative",
          height: "100%",
          minHeight,
          padding,
          borderRadius: radius,
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          overflow: "hidden",
          transition: "transform 0.18s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
          willChange: "auto",
          ...style,
        }}
      >
        {/* Cursor-follow halo */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), ${color}1f, transparent 60%)`,
            opacity: 0.9,
            transition: "opacity 0.3s ease",
          }}
        />
        {/* Inner-light hairline */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: radius,
            pointerEvents: "none",
            boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.04)`,
          }}
        />
        {children}
      </div>
    </motion.div>
  );
});

export default BaseCell;

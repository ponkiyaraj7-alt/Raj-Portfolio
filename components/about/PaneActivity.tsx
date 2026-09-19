"use client";
// Pane B — 52-week activity heatmap (deterministic, honest).
// Cells reveal in a left-to-right wave on first viewport entry.

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { generateHeatmap, HEAT_COLORS_DARK, type HeatCell } from "@/lib/heatmap";

export default function PaneActivity() {
  const reduceMotion = useReducedMotion();
  const data = useMemo(() => generateHeatmap(), []);
  const [revealed, setRevealed] = useState(reduceMotion ?? false);
  const ref = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; cell: HeatCell } | null>(null);

  useEffect(() => {
    if (reduceMotion) { setRevealed(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setRevealed(true);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion]);

  const aria = `Activity heatmap: ${data.totalActiveDays} active days, ${data.totalContributions} contributions, longest streak ${data.longestStreak} days, last 52 weeks.`;

  return (
    <div
      ref={ref}
      style={{
        padding: "14px 18px 16px",
        fontFamily: "var(--font-inter), Inter, sans-serif",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11, color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.06em",
        }}>
          activity · last 52 weeks
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.40)", fontFamily: "var(--font-mono), monospace" }}>
          <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            {data.totalActiveDays}
          </span>
          <span style={{ color: "rgba(255,255,255,0.30)" }}> active days</span>
        </div>
      </div>

      {/* Grid */}
      <div
        role="img"
        aria-label={aria}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(52, 1fr)",
          gridAutoRows: "minmax(0, 1fr)",
          gap: 3,
          width: "100%",
          aspectRatio: `52 / 7`,
          maxHeight: 80,
        }}
      >
        {data.weeks.flatMap((week, wIdx) =>
          week.map((cell, dIdx) => {
            const delayMs = revealed ? wIdx * 8 + dIdx * 1 : 0;
            return (
              <div
                key={`${wIdx}-${dIdx}`}
                aria-hidden
                onMouseEnter={(e) => {
                  const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const parent = ref.current?.getBoundingClientRect();
                  if (!parent) return;
                  setTip({
                    x: r.left - parent.left + r.width / 2,
                    y: r.top - parent.top - 8,
                    cell,
                  });
                }}
                onMouseLeave={() => setTip(null)}
                style={{
                  background: HEAT_COLORS_DARK[cell.level],
                  borderRadius: 2,
                  width: "100%", height: "100%",
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "scale(1)" : "scale(0.6)",
                  transition: reduceMotion
                    ? "none"
                    : `opacity 0.4s ease ${delayMs}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms, background 0.2s ease`,
                  cursor: "default",
                }}
              />
            );
          })
        )}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "var(--font-mono), monospace",
        fontSize: 10, color: "rgba(255,255,255,0.40)",
      }}>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          longest streak <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{data.longestStreak}</span> days
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          less
          {[0, 1, 2, 3, 4].map((lv) => (
            <span key={lv} style={{
              width: 8, height: 8, borderRadius: 2,
              background: HEAT_COLORS_DARK[lv as 0 | 1 | 2 | 3 | 4],
            }} />
          ))}
          more
        </span>
      </div>

      {/* Tooltip */}
      {tip && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            left: tip.x, top: tip.y,
            transform: "translate(-50%, -100%)",
            background: "rgba(15,17,23,0.95)",
            color: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 10,
            fontFamily: "var(--font-mono), monospace",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          {tip.cell.count > 0
            ? `${tip.cell.count} contribution${tip.cell.count === 1 ? "" : "s"} · ~${tip.cell.weeksAgo}w ago`
            : `no activity · ~${tip.cell.weeksAgo}w ago`}
        </div>
      )}
    </div>
  );
}

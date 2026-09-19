"use client";

// ActivityGlow.tsx - Futuristic contribution heatmap
// 52-week activity visualization with glass effects and glowing cells

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface HeatCell {
  level: 0 | 1 | 2 | 3 | 4;
  weekIndex: number;
  dayIndex: number;
}

const HEAT_COLORS = [
  "rgba(255, 255, 255, 0.05)",   // 0 - empty
  "rgba(82, 183, 136, 0.2)",     // 1 - low
  "rgba(82, 183, 136, 0.4)",     // 2 - medium
  "rgba(82, 183, 136, 0.6)",     // 3 - high
  "rgba(82, 183, 136, 0.9)",     // 4 - max
];

const GLOW_COLORS = [
  "transparent",
  "rgba(82, 183, 136, 0.3)",
  "rgba(82, 183, 136, 0.5)",
  "rgba(82, 183, 136, 0.7)",
  "rgba(82, 183, 136, 1)",
];

// Generate deterministic random data
function generateActivityData(): HeatCell[][] {
  const weeks: HeatCell[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: HeatCell[] = [];
    for (let d = 0; d < 7; d++) {
      // More recent weeks have higher activity
      const recency = (w / 52);
      const baseLevel = Math.random() < (0.3 + recency * 0.4) 
        ? Math.floor(Math.random() * 4) + 1 
        : 0;
      week.push({
        level: baseLevel as 0 | 1 | 2 | 3 | 4,
        weekIndex: w,
        dayIndex: d,
      });
    }
    weeks.push(week);
  }
  return weeks;
}

export default function ActivityGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredCell, setHoveredCell] = useState<HeatCell | null>(null);
  const weeks = useMemo(() => generateActivityData(), []);

  // Calculate stats
  const stats = useMemo(() => {
    let total = 0;
    let active = 0;
    let maxStreak = 0;
    let currentStreak = 0;

    weeks.forEach((week) => {
      week.forEach((cell) => {
        if (cell.level > 0) {
          total += cell.level;
          active++;
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      });
    });

    return { total, active, maxStreak };
  }, [weeks]);

  return (
    <div ref={ref} className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm font-mono">activity</span>
          <span className="text-white/30 text-sm font-mono">•</span>
          <span className="text-white/40 text-xs font-mono">last 52 weeks</span>
        </div>
        <div className="text-xs text-white/40 font-mono">
          <span className="text-white/80">{stats.active}</span> active days
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="relative overflow-hidden rounded-lg bg-white/[0.02] p-4 border border-white/5">
        {/* CRT scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
          }}
        />

        <div className="flex gap-[3px]">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((cell, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: weekIndex * 0.01 + dayIndex * 0.005,
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative w-3 h-3 rounded-sm cursor-pointer"
                  style={{
                    background: HEAT_COLORS[cell.level],
                  }}
                  onMouseEnter={() => setHoveredCell(cell)}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {/* Glow effect on hover */}
                  {hoveredCell?.weekIndex === weekIndex && hoveredCell?.dayIndex === dayIndex && (
                    <motion.div
                      layoutId="cellGlow"
                      className="absolute -inset-1 rounded-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background: GLOW_COLORS[cell.level],
                        filter: "blur(4px)",
                      }}
                    />
                  )}

                  {/* Pulse animation for recent high activity */}
                  {cell.level >= 3 && weekIndex > 40 && (
                    <motion.div
                      className="absolute inset-0 rounded-sm"
                      animate={{
                        boxShadow: [
                          `0 0 0 0 ${HEAT_COLORS[cell.level]}`,
                          `0 0 10px 2px ${HEAT_COLORS[cell.level]}`,
                          `0 0 0 0 ${HEAT_COLORS[cell.level]}`,
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="text-white/30 text-xs font-mono">Less</span>
            {HEAT_COLORS.map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm"
                style={{ background: color }}
              />
            ))}
            <span className="text-white/30 text-xs font-mono">More</span>
          </div>
          <div className="text-xs text-white/40 font-mono">
            longest streak <span className="text-white/80">{stats.maxStreak}</span> days
          </div>
        </div>

        {/* Tooltip */}
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-10 px-3 py-2 rounded-lg text-xs font-mono"
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(82, 183, 136, 0.3)",
              backdropFilter: "blur(10px)",
              left: `calc(${(hoveredCell.weekIndex / 52) * 100}% - 50px)`,
              bottom: "80px",
            }}
          >
            <div className="text-white/60">
              {hoveredCell.level > 0 ? (
                <>
                  <span className="text-emerald-400 font-semibold">{hoveredCell.level * 2 + 1}</span>
                  <span> contributions</span>
                </>
              ) : (
                <span>No activity</span>
              )}
              <div className="text-white/30 mt-1">
                Week {hoveredCell.weekIndex + 1}, {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][hoveredCell.dayIndex]}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[
          { label: "Contributions", value: stats.total * 2 },
          { label: "Active Days", value: stats.active },
          { label: "Max Streak", value: stats.maxStreak },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="text-center p-3 rounded-lg bg-white/[0.02] border border-white/5"
          >
            <div className="text-lg font-semibold text-white/90">{stat.value}</div>
            <div className="text-xs text-white/40 font-mono">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";
// Pane C — Recent shipping log. Stylized commit-style entries.
// Honest framing: these are "shipping notes", not a literal git fetch.

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type EntryType = "feat" | "ship" | "fix" | "spec" | "chore";

const TYPE_COLORS: Record<EntryType, string> = {
  feat:  "#52b788",
  ship:  "#38bdf8",
  fix:   "#facc15",
  spec:  "#a78bfa",
  chore: "rgba(255,255,255,0.45)",
};

type Entry = {
  type: EntryType;
  project: string;
  message: string;
  ago: string;        // "4h ago"
  recent: boolean;    // filled vs. open dot
};

const ENTRIES: Entry[] = [
  { type: "feat",  project: "web-app",         message: "Next.js routing optimization", ago: "4h ago",  recent: true  },
  { type: "ship",  project: "dashboard",       message: "v2.0 — auth & performance",   ago: "1d ago",  recent: true  },
  { type: "fix",   project: "portfolio",       message: "smooth scroll physics update",ago: "2d ago",  recent: true  },
  { type: "feat",  project: "component-lib",   message: "dynamic UI interactions",     ago: "3d ago",  recent: false },
  { type: "spec",  project: "client-project",  message: "architecture and API design", ago: "5d ago",  recent: false },
  { type: "chore", project: "monorepo",        message: "build cache speedup",         ago: "1w ago",  recent: false },
];

export default function PaneShipping() {
  const reduceMotion = useReducedMotion();
  const [pulseIdx, setPulseIdx] = useState<number>(-1);

  // Cycle a "just landed" pulse on a random recent row every 4s
  useEffect(() => {
    if (reduceMotion) return;
    const recentIdx = ENTRIES.map((e, i) => e.recent ? i : -1).filter((i) => i >= 0);
    let lastIdx = -1;
    const tick = () => {
      let next = recentIdx[Math.floor(Math.random() * recentIdx.length)];
      if (next === lastIdx && recentIdx.length > 1) {
        next = recentIdx[(recentIdx.indexOf(next) + 1) % recentIdx.length];
      }
      lastIdx = next;
      setPulseIdx(next);
    };
    tick();
    const id = setInterval(tick, 4000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div style={{
      padding: "14px 18px 18px",
      fontFamily: "var(--font-mono), monospace",
      fontSize: 11.5,
      color: "rgba(255,255,255,0.85)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ color: "#52b788" }}>▸</span>
        <span style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em" }}>shipping</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.30)" }}>last 7 days</span>
      </div>

      <div role="list" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {ENTRIES.map((e, i) => {
          const isPulse = i === pulseIdx;
          return (
            <div
              key={`${e.project}-${e.message}`}
              role="listitem"
              className="ship-row"
              style={{
                display: "grid",
                gridTemplateColumns: "14px 44px 1fr auto",
                alignItems: "center",
                gap: 10,
                padding: "5px 8px",
                borderRadius: 6,
                background: isPulse ? "rgba(82,183,136,0.08)" : "transparent",
                transition: "background 0.45s ease",
                position: "relative",
              }}
            >
              {/* Dot */}
              <span
                aria-hidden
                style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: e.recent ? TYPE_COLORS[e.type] : "transparent",
                  border: e.recent ? "none" : `1px solid rgba(255,255,255,0.30)`,
                  boxShadow: isPulse && !reduceMotion
                    ? `0 0 0 0 ${TYPE_COLORS[e.type]}`
                    : "none",
                  animation: isPulse && !reduceMotion ? "shipPulse 1.2s ease-out" : "none",
                }}
              />
              {/* Type tag */}
              <span style={{
                color: TYPE_COLORS[e.type],
                fontSize: 10, fontWeight: 600,
                textAlign: "left", letterSpacing: "0.04em",
              }}>{e.type}</span>
              {/* Project + message */}
              <span style={{ display: "flex", alignItems: "baseline", gap: 8, minWidth: 0 }}>
                <span style={{
                  color: "rgba(255,255,255,0.95)",
                  fontWeight: 500, whiteSpace: "nowrap",
                }}>{e.project}</span>
                <span style={{
                  color: "rgba(255,255,255,0.50)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  minWidth: 0,
                }}>{e.message}</span>
              </span>
              {/* Time */}
              <span style={{
                color: "rgba(255,255,255,0.35)", fontSize: 10,
                fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
              }}>{e.ago}</span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes shipPulse {
          0%   { box-shadow: 0 0 0 0   rgba(82,183,136,0.55); }
          100% { box-shadow: 0 0 0 10px rgba(82,183,136,0); }
        }
        .ship-row:hover {
          background: rgba(255,255,255,0.04) !important;
        }
      `}</style>
    </div>
  );
}

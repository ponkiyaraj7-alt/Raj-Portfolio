"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Skill } from "@/data/content";
import RAGDemoCell from "./cells/RAGDemoCell";
import FlutterPhoneCell from "./cells/FlutterPhoneCell";
import NextShipCell from "./cells/NextShipCell";
import NeuralNetCell from "./cells/NeuralNetCell";
import TypeScriptCell from "./cells/TypeScriptCell";
import ToolChipCell from "./cells/ToolChipCell";
import type { FilterValue } from "./ForgeCommandBar";

const INITIAL_CHIP_COUNT = 10;

interface Props {
  skills: Skill[];
  filter: FilterValue;
  highlightedName?: string | null;
}

const HERO_CELL_TYPES = new Set(["rag", "phone", "next", "neural", "ts"]);

function spanFor(cell: Skill["cell"]): { col: number; row: number } {
  // Desktop 12-col grid spans — every row sums to 12 to avoid gaps
  switch (cell) {
    case "rag":    return { col: 6, row: 2 };  // Showpiece (rows 1-2, cols 1-6)
    case "phone":  return { col: 3, row: 2 };  // (rows 1-2, cols 7-9)
    case "next":   return { col: 3, row: 2 };  // (rows 1-2, cols 10-12)
    case "neural": return { col: 6, row: 1 };  // (row 3, cols 1-6)
    case "ts":     return { col: 6, row: 1 };  // (row 3, cols 7-12)
    default:       return { col: 2, row: 1 };  // chip
  }
}

export default function ForgeBento({ skills, filter, highlightedName }: Props) {
  const [showAllChips, setShowAllChips] = useState(false);
  const filtered = useMemo(() => {
    if (filter === "All") return skills;
    return skills.filter((s) => s.category === filter);
  }, [skills, filter]);

  // Always show hero cells in the same order; chips render after, in skill order.
  const heroes = filtered.filter((s) => s.cell && HERO_CELL_TYPES.has(s.cell));
  const chips  = filtered.filter((s) => !s.cell || s.cell === "chip");

  // Hero ordering — keep this layout intentional
  const heroOrder: Skill["cell"][] = ["rag", "phone", "next", "neural", "ts"];
  const orderedHeroes = heroOrder
    .map((c) => heroes.find((h) => h.cell === c))
    .filter((s): s is Skill => Boolean(s));

  const isAll = filter === "All";

  const renderHero = (s: Skill, i: number) => {
    const span = spanFor(s.cell);
    const isHi = highlightedName === s.name;
    // When filtering, drop spans so heroes flow naturally in the auto-fill grid
    const heroStyle: React.CSSProperties = isAll
      ? { gridColumn: `span ${span.col}`, gridRow: `span ${span.row}`, borderRadius: 22 }
      : { borderRadius: 22, minHeight: 340 };
    const wrap = (node: React.ReactNode) => (
      <motion.div
        key={s.name}
        layout
        animate={isHi ? { boxShadow: `0 0 0 2px ${s.color}, 0 0 40px ${s.color}66` } : { boxShadow: "0 0 0 0px transparent" }}
        transition={{ layout: { type: "spring", stiffness: 280, damping: 30 }, duration: 0.5 }}
        style={heroStyle}
      >
        {node}
      </motion.div>
    );
    switch (s.cell) {
      case "rag":    return wrap(<RAGDemoCell      skill={s} index={i} />);
      case "phone":  return wrap(<FlutterPhoneCell skill={s} index={i} />);
      case "next":   return wrap(<NextShipCell     skill={s} index={i} />);
      case "neural": return wrap(<NeuralNetCell    skill={s} index={i} />);
      case "ts":     return wrap(<TypeScriptCell   skill={s} index={i} />);
      default:       return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Hero grid — rigid 12-col when "All", flexible left-aligned grid when filtered */}
      {orderedHeroes.length > 0 && (
        <div
          className="forge-bento-heroes"
          style={
            isAll
              ? { display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "minmax(170px, auto)", gridAutoFlow: "dense", gap: 14 }
              : { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 420px))", gap: 14, justifyContent: "start" }
          }
        >
          <AnimatePresence mode="popLayout">
            {orderedHeroes.map((s, i) => renderHero(s, i))}
          </AnimatePresence>
        </div>
      )}

      {/* Chip grid — fixed-width cells, centered as a block (last partial row also centers) */}
      {chips.length > 0 && (() => {
        const visibleChips = showAllChips ? chips : chips.slice(0, INITIAL_CHIP_COUNT);
        const hiddenCount = chips.length - visibleChips.length;
        const canCollapse = showAllChips && chips.length > INITIAL_CHIP_COUNT;
        return (
          <>
            <div className="forge-bento-chips" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: 14, justifyContent: "center" }}>
              <AnimatePresence mode="popLayout">
                {visibleChips.map((s, i) => {
                  const isHi = highlightedName === s.name;
                  return (
                    <motion.div
                      key={s.name}
                      layout
                      initial={{ opacity: 0, y: 14, scale: 0.95 }}
                      animate={{
                        opacity: 1, y: 0, scale: 1,
                        boxShadow: isHi ? `0 0 0 2px ${s.color}, 0 0 40px ${s.color}66` : "0 0 0 0px transparent",
                      }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{
                        layout: { type: "spring", stiffness: 280, damping: 30 },
                        duration: 0.35,
                        delay: i >= INITIAL_CHIP_COUNT ? Math.min((i - INITIAL_CHIP_COUNT) * 0.025, 0.4) : 0,
                      }}
                      style={{ borderRadius: 18 }}
                    >
                      <ToolChipCell skill={s} index={i} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {(hiddenCount > 0 || canCollapse) && (
              <motion.div
                layout
                style={{ display: "flex", justifyContent: "center", marginTop: 18 }}
              >
                <button
                  onClick={() => setShowAllChips((v) => !v)}
                  aria-expanded={showAllChips}
                  className="forge-load-more"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "13px 22px",
                    borderRadius: 100,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "linear-gradient(135deg, rgba(82,183,136,0.12) 0%, rgba(168,85,247,0.12) 50%, rgba(97,218,251,0.12) 100%)",
                    backdropFilter: "blur(20px) saturate(140%)",
                    WebkitBackdropFilter: "blur(20px) saturate(140%)",
                    color: "#f1f5f9",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, box-shadow 0.25s ease",
                    boxShadow: "0 8px 24px -8px rgba(82,183,136,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {/* shimmer accent line */}
                  <span aria-hidden style={{
                    position: "absolute", inset: 0, borderRadius: 100, pointerEvents: "none",
                    background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                    backgroundSize: "200% 100%",
                    animation: "forge-shimmer 3.2s linear infinite",
                  }} />

                  <span style={{
                    width: 24, height: 24, borderRadius: "50%",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    background: "linear-gradient(135deg, #52b788 0%, #A855F7 100%)",
                    boxShadow: "0 0 16px rgba(168,85,247,0.4)",
                    transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                    transform: showAllChips ? "rotate(180deg)" : "rotate(0deg)",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>

                  <span style={{ position: "relative", zIndex: 1 }}>
                    {showAllChips ? "SHOW LESS" : "SHOW MORE TOOLS"}
                  </span>

                  {!showAllChips && (
                    <span style={{
                      position: "relative", zIndex: 1,
                      padding: "3px 9px",
                      borderRadius: 100,
                      background: "linear-gradient(135deg, rgba(82,183,136,0.25), rgba(168,85,247,0.25))",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#f1f5f9",
                      letterSpacing: "0.05em",
                    }}>
                      +{hiddenCount}
                    </span>
                  )}
                </button>
              </motion.div>
            )}
          </>
        );
      })()}

      <style jsx>{`
        @keyframes forge-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        :global(.forge-load-more):hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.2) !important;
          box-shadow: 0 14px 36px -8px rgba(168,85,247,0.4), inset 0 1px 0 rgba(255,255,255,0.12) !important;
        }
        :global(.forge-load-more):active {
          transform: translateY(0);
        }
        :global(.forge-load-more):focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(82,183,136,0.4), 0 14px 36px -8px rgba(168,85,247,0.4) !important;
        }
        @media (max-width: 900px) {
          .forge-bento-heroes { grid-template-columns: repeat(6, 1fr) !important; }
          .forge-bento-heroes :global(> div[style*="span 6"]) { grid-column: span 6 !important; }
          .forge-bento-heroes :global(> div[style*="span 4"]) { grid-column: span 6 !important; }
          .forge-bento-heroes :global(> div[style*="span 3"]) { grid-column: span 3 !important; }
        }
        @media (max-width: 600px) {
          .forge-bento-heroes { grid-template-columns: repeat(4, 1fr) !important; }
          .forge-bento-heroes :global(> div[style*="span 6"]) { grid-column: span 4 !important; }
          .forge-bento-heroes :global(> div[style*="span 4"]) { grid-column: span 4 !important; }
          .forge-bento-heroes :global(> div[style*="span 3"]) { grid-column: span 4 !important; }
          .forge-bento-chips { grid-template-columns: repeat(auto-fill, 150px) !important; }
        }
        @media (hover: none) {
          .forge-bento-heroes :global(*),
          .forge-bento-chips :global(*) { transform: none !important; }
        }
      `}</style>
    </div>
  );
}

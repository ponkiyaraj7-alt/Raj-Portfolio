"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SkillCategory } from "@/data/content";
import { useDensity } from "./DensityContext";

export type FilterValue = "All" | SkillCategory;

interface Props {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Record<FilterValue, number>;
  onOpenPalette: () => void;
}

const FILTERS: FilterValue[] = ["All", "AI & GenAI", "Web", "Mobile", "Infra", "DesignOps"];

const COLOR_FOR: Record<FilterValue, string> = {
  "All":         "#94a3b8",
  "AI & GenAI":  "#A855F7",
  "Web":         "#61DAFB",
  "Mobile":      "#027DFD",
  "Infra":       "#52b788",
  "DesignOps":   "#F97316",
};

export default function ForgeCommandBar({ active, onChange, counts, onOpenPalette }: Props) {
  const { density, toggle } = useDensity();
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || ""));
    }
  }, []);

  return (
    <div
      className="forge-cmdbar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "10px 12px",
        marginBottom: 18,
        borderRadius: 18,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Filter chips */}
      <div className="forge-cmdbar-filters" style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
        {FILTERS.map((f) => {
          const isActive = active === f;
          const c = COLOR_FOR[f];
          return (
            <button
              key={f}
              onClick={() => onChange(f)}
              aria-pressed={isActive}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 12px",
                borderRadius: 100,
                border: `1px solid ${isActive ? c + "55" : "rgba(255,255,255,0.08)"}`,
                background: isActive ? `${c}1a` : "rgba(255,255,255,0.025)",
                color: isActive ? c : "rgba(148,163,184,0.75)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.04em",
                fontFamily: "var(--font-mono), monospace",
                cursor: "pointer",
                transition: "all 0.2s ease",
                outline: "none",
                whiteSpace: "nowrap",
              }}
              onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 2px ${c}55`; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              <span
                style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: isActive ? c : "rgba(148,163,184,0.4)",
                  boxShadow: isActive ? `0 0 6px ${c}` : "none",
                  transition: "all 0.2s ease",
                }}
              />
              {f}
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={`${f}-${counts[f]}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    padding: "1px 6px",
                    borderRadius: 8,
                    background: isActive ? `${c}33` : "rgba(255,255,255,0.05)",
                    color: isActive ? c : "rgba(148,163,184,0.6)",
                    minWidth: 16,
                    textAlign: "center",
                  }}
                >
                  {counts[f]}
                </motion.span>
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Right: density + ⌘K */}
      <div className="forge-cmdbar-right" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <button
          onClick={toggle}
          aria-label={`Switch to ${density === "comfortable" ? "compact" : "comfortable"} density`}
          title={`Density: ${density}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 10px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.025)",
            color: "rgba(148,163,184,0.75)",
            cursor: "pointer",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(148,163,184,0.75)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden>
            {density === "comfortable" ? (
              <>
                <rect x="1" y="2" width="14" height="3" rx="1" />
                <rect x="1" y="6.5" width="14" height="3" rx="1" />
                <rect x="1" y="11" width="14" height="3" rx="1" />
              </>
            ) : (
              <>
                <rect x="1" y="2" width="14" height="2" rx="1" />
                <rect x="1" y="5" width="14" height="2" rx="1" />
                <rect x="1" y="8" width="14" height="2" rx="1" />
                <rect x="1" y="11" width="14" height="2" rx="1" />
              </>
            )}
          </svg>
          <span className="forge-density-label">{density === "comfortable" ? "COZY" : "DENSE"}</span>
        </button>

        <button
          onClick={onOpenPalette}
          aria-label="Open command palette"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 12px",
            borderRadius: 10,
            border: "1px solid rgba(82,183,136,0.25)",
            background: "rgba(82,183,136,0.08)",
            color: "#52b788",
            cursor: "pointer",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(82,183,136,0.14)"; e.currentTarget.style.borderColor = "rgba(82,183,136,0.5)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(82,183,136,0.08)"; e.currentTarget.style.borderColor = "rgba(82,183,136,0.25)"; }}
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11L14 14" strokeLinecap="round" />
          </svg>
          <span className="forge-search-label">Search tools</span>
          <span
            style={{
              padding: "1px 5px",
              borderRadius: 4,
              background: "rgba(82,183,136,0.15)",
              border: "1px solid rgba(82,183,136,0.3)",
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            {isMac ? "⌘K" : "Ctrl K"}
          </span>
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 720px) {
          .forge-cmdbar { flex-wrap: wrap; }
          :global(.forge-density-label) { display: none; }
          :global(.forge-search-label) { display: none; }
        }
        @media (max-width: 540px) {
          .forge-cmdbar-filters { font-size: 10px; }
        }
      `}</style>
    </div>
  );
}

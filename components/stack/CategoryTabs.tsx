"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/content";

type Category = "All" | Skill["category"];

interface CategoryTabsProps {
  active: Category;
  onChange: (cat: Category) => void;
  counts: Record<Category, number>;
}

const TABS: Category[] = ["All", "Web", "AI & GenAI", "Mobile", "Infra", "DesignOps"];

const TAB_COLORS: Record<Category, string> = {
  "All":        "#52b788",
  "Web":        "#61DAFB",
  "AI & GenAI": "#A855F7",
  "Mobile":     "#027DFD",
  "Infra":      "#FFCA28",
  "DesignOps":  "#F97316",
};

export default function CategoryTabs({ active, onChange, counts }: CategoryTabsProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab === active;
        const accentColor = TAB_COLORS[tab];
        return (
          <motion.button
            key={tab}
            onClick={() => onChange(tab)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: "relative",
              padding: "8px 18px",
              borderRadius: "100px",
              border: `1px solid ${isActive ? accentColor + "60" : "rgba(255,255,255,0.1)"}`,
              background: isActive
                ? `linear-gradient(135deg, ${accentColor}22, ${accentColor}0a)`
                : "rgba(255,255,255,0.04)",
              color: isActive ? accentColor : "rgba(148,163,184,0.7)",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "var(--font-mono), monospace",
              cursor: "pointer",
              outline: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.22s ease",
              boxShadow: isActive ? `0 0 16px ${accentColor}22` : "none",
              letterSpacing: "0.02em",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "100px",
                  background: `${accentColor}12`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{tab}</span>
            <span
              style={{
                position: "relative",
                zIndex: 1,
                padding: "1px 6px",
                borderRadius: "100px",
                background: isActive ? `${accentColor}30` : "rgba(255,255,255,0.08)",
                color: isActive ? accentColor : "rgba(148,163,184,0.5)",
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              {counts[tab]}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

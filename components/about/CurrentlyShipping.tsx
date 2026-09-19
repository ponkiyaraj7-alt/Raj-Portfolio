"use client";
// "Currently shipping" mini card — replaces the deleted Experience block.

import Link from "next/link";
import { sounds } from "@/lib/audio";

export default function CurrentlyShipping() {
  return (
    <div
      style={{
        position: "relative",
        background: "#f8f9fb",
        border: "1px solid rgba(15,23,42,0.06)",
        borderLeft: "4px solid #2d6a4f",
        borderRadius: "0 18px 18px 0",
        padding: "20px 24px",
        maxWidth: 540,
      }}
    >
      <div style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 11,
        color: "#94a3b8",
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        marginBottom: 10,
        display: "inline-flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ color: "#2d6a4f" }}>▸</span>
        Currently shipping
      </div>

      <div style={{
        fontSize: 17,
        lineHeight: 1.6,
        color: "#0f172a",
        fontFamily: "var(--font-display), sans-serif",
        fontWeight: 600,
        letterSpacing: "-0.015em",
      }}>
        Intelligent AI systems, autonomous agents, and workflows that convert manual processes into automated solutions.
      </div>

      <Link
        href="/quote"
        data-cursor="click"
        onMouseEnter={() => sounds.hover()}
        className="cs-cta"
        style={{
          marginTop: 16,
          display: "inline-flex", alignItems: "center", gap: 8,
          fontSize: 13,
          fontWeight: 600,
          color: "#2d6a4f",
          textDecoration: "none",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          letterSpacing: "-0.01em",
          transition: "gap 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        Available for New Projects
        <span aria-hidden style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </Link>

      <style jsx>{`
        .cs-cta:hover { gap: 12px; }
      `}</style>
    </div>
  );
}

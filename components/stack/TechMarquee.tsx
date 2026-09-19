"use client";

import { useRef, useState } from "react";
import { MARQUEE_TECH } from "@/data/content";

const ROW_A = MARQUEE_TECH.slice(0, 10);
const ROW_B = MARQUEE_TECH.slice(10);

interface PillProps {
  label: string;
}

function Pill({ label }: PillProps) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 16px",
        borderRadius: "100px",
        border: `1px solid ${hov ? "rgba(82,183,136,0.4)" : "rgba(255,255,255,0.08)"}`,
        background: hov ? "rgba(82,183,136,0.1)" : "rgba(255,255,255,0.04)",
        color: hov ? "#52b788" : "rgba(148,163,184,0.6)",
        fontSize: "11px",
        fontWeight: 600,
        fontFamily: "var(--font-mono), monospace",
        whiteSpace: "nowrap" as const,
        transition: "all 0.2s ease",
        cursor: "default",
        letterSpacing: "0.03em",
        flexShrink: 0,
      }}
    >
      <span style={{
        width: "5px", height: "5px", borderRadius: "50%",
        background: hov ? "#52b788" : "rgba(148,163,184,0.3)",
        transition: "background 0.2s ease",
        flexShrink: 0,
      }} />
      {label}
    </span>
  );
}

interface MarqueeRowProps {
  items: string[];
  direction: "left" | "right";
  speed?: number;
}

function MarqueeRow({ items, direction, speed = 35 }: MarqueeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const doubled = [...items, ...items, ...items];

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          width: "max-content",
          animation: `marquee-${direction} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((label, i) => (
          <Pill key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>
      <MarqueeRow items={ROW_A} direction="left"  speed={38} />
      <MarqueeRow items={ROW_B} direction="right" speed={45} />
    </div>
  );
}

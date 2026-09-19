"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/data/content";
import BaseCell from "./BaseCell";
import { useReducedMotion } from "../useReducedMotion";

type State = "ok" | "error" | "fixing";

export default function TypeScriptCell({ skill, index = 0, span }: { skill: Skill; index?: number; span?: { col?: number; row?: number } }) {
  const reduced = useReducedMotion();
  const cellRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<State>("ok");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!cellRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.2 }
    );
    obs.observe(cellRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    const seq = [
      { s: "ok" as State,      d: 3200 },
      { s: "error" as State,   d: 1200 },
      { s: "fixing" as State,  d: 700  },
      { s: "ok" as State,      d: 3200 },
    ];
    let i = 0;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      setState(seq[i].s);
      id = setTimeout(() => { i = (i + 1) % seq.length; tick(); }, seq[i].d);
    };
    tick();
    return () => clearTimeout(id);
  }, [visible, reduced]);

  // when hovered, force "fixing" → "ok" reaction
  useEffect(() => { if (hovered && state === "error") setState("fixing"); }, [hovered, state]);

  const value = state === "error" ? '"god-tier"' : '"expert"';
  const checkColor = state === "ok" ? "#52b788" : state === "error" ? "#ef4444" : "#fbbf24";
  const checkSymbol = state === "ok" ? "✓" : state === "error" ? "✗" : "↻";
  const checkLabel  = state === "ok" ? "OK" : state === "error" ? "TS2322" : "FIXING";

  return (
    <BaseCell
      ref={cellRef}
      color={skill.color}
      index={index}
      span={span}
      minHeight={220}
      padding="22px"
      noTilt={false}
      ariaLabel="TypeScript type checker demonstration"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", gap: 14, zIndex: 1 }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: skill.color, fontFamily: "var(--font-mono), monospace" }}>
              {skill.name}
            </span>
          </div>
          <span
            style={{
              fontSize: 9, fontWeight: 800, letterSpacing: "0.14em",
              fontFamily: "var(--font-mono), monospace",
              padding: "3px 8px",
              borderRadius: 6,
              background: `${checkColor}1c`,
              border: `1px solid ${checkColor}44`,
              color: checkColor,
              transition: "all 0.3s ease",
            }}
          >
            {checkSymbol} {checkLabel}
          </span>
        </div>

        {/* Code block */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            background: "rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "20px 18px",
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: 12,
            lineHeight: 1.7,
            color: "#e2e8f0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <code style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            <span style={{ color: "#A855F7" }}>const</span>{" "}
            <span style={{ color: "#61DAFB" }}>skill</span>
            <span style={{ color: "#94a3b8" }}>:</span>{" "}
            <span style={{ color: "#52b788" }}>Mastery</span>
            <span style={{ color: "#94a3b8" }}>{"<"}</span>
            <span style={{ color: "#fbbf24" }}>&quot;{skill.name}&quot;</span>
            <span style={{ color: "#94a3b8" }}>{">"}</span>{" "}
            <span style={{ color: "#94a3b8" }}>=</span>{" "}
            <span
              style={{
                color: state === "error" ? "#ef4444" : "#fbbf24",
                position: "relative",
                textDecoration: state === "error" ? "underline wavy #ef4444" : "none",
                textUnderlineOffset: 4,
                transition: "color 0.25s ease",
              }}
            >
              {value}
            </span>{" "}
            <span style={{ color: "rgba(148,163,184,0.5)" }}>
              // {state === "ok" ? "✓ all good" : state === "error" ? "Type error" : "auto-fixing…"}
            </span>
          </code>
        </div>

        <div style={{ fontSize: 10, color: "rgba(148,163,184,0.5)", fontFamily: "var(--font-mono), monospace", textAlign: "center" }}>
          tsc --strict — zero errors across {skill.years}
        </div>
      </div>
    </BaseCell>
  );
}

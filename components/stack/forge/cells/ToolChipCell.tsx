"use client";

import { useState } from "react";
import type { Skill } from "@/data/content";
import { SkillIcon } from "../../SkillIcons";
import BaseCell from "./BaseCell";
import { useDensity } from "../DensityContext";

interface Props {
  skill: Skill;
  index?: number;
  span?: { col?: number; row?: number };
}

function MasteryDots({ level, color }: { level: number; color: string }) {
  // 5 dots, fill = round(level/20)
  const filled = Math.max(0, Math.min(5, Math.round(level / 20)));
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: i < filled ? color : "rgba(255,255,255,0.12)",
            boxShadow: i < filled ? `0 0 6px ${color}88` : "none",
            transition: "background 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function BadgeRibbon({ kind, color }: { kind: NonNullable<Skill["badge"]>; color: string }) {
  const labels: Record<NonNullable<Skill["badge"]>, string> = {
    new: "NEW · 2026",
    core: "CORE",
    shipping: "SHIPPING",
  };
  return (
    <span
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        fontSize: 8,
        fontWeight: 800,
        letterSpacing: "0.14em",
        padding: "3px 7px",
        borderRadius: 6,
        background: `${color}1a`,
        border: `1px solid ${color}33`,
        color: color,
        fontFamily: "var(--font-mono), monospace",
        zIndex: 2,
      }}
    >
      {labels[kind]}
    </span>
  );
}

export default function ToolChipCell({ skill, index = 0, span }: Props) {
  const [hovered, setHovered] = useState(false);
  const { density } = useDensity();
  const compact = density === "compact";

  return (
    <BaseCell
      color={skill.color}
      index={index}
      span={span}
      minHeight={compact ? 130 : 168}
      padding={compact ? "14px 14px" : "18px 18px"}
      radius={18}
      noTilt={false}
      ariaLabel={`${skill.name}, ${skill.role}, used in ${skill.tag}`}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: compact ? 8 : 12,
          zIndex: 1,
        }}
      >
        {skill.badge && <BadgeRibbon kind={skill.badge} color={skill.color} />}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* Squircle icon */}
          <div
            style={{
              width: compact ? 32 : 40,
              height: compact ? 32 : 40,
              borderRadius: "30%/40%",
              background: `${skill.color}14`,
              border: `1px solid ${skill.color}26`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: compact ? 5 : 7,
              flexShrink: 0,
            }}
          >
            <SkillIcon name={skill.name} color={skill.color} />
          </div>
          {!skill.badge && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "rgba(148,163,184,0.4)",
                fontFamily: "var(--font-mono), monospace",
                paddingTop: 4,
              }}
            >
              {skill.years}
            </span>
          )}
        </div>

        <div style={{ flex: 1, minHeight: 0 }}>
          <div
            style={{
              fontSize: compact ? 13 : 15,
              fontWeight: 800,
              color: hovered ? "#f8fafc" : "#cbd5e1",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-display), sans-serif",
              lineHeight: 1.2,
              marginBottom: 3,
              transition: "color 0.2s ease",
            }}
          >
            {skill.name}
          </div>
          {!compact && (
            <div
              style={{
                fontSize: 10,
                color: "rgba(148,163,184,0.5)",
                fontFamily: "var(--font-mono), monospace",
                lineHeight: 1.4,
              }}
            >
              {skill.role}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <MasteryDots level={skill.level} color={skill.color} />
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.05em",
              fontFamily: "var(--font-mono), monospace",
              color: skill.color,
              opacity: hovered ? 0.95 : 0.45,
              transform: hovered ? "translateX(0)" : "translateX(-3px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            → {skill.tag}
          </span>
        </div>
      </div>
    </BaseCell>
  );
}

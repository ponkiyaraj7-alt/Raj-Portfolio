"use client";

import { useState } from "react";
import { ArrowRight, Bot, Zap } from "lucide-react";
import { CaseStudyProject } from "./projectData";

const TIER_COLORS: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: "rgba(37,99,235,0.08)", text: "#2563EB", border: "rgba(37,99,235,0.2)" },
  2: { bg: "rgba(22,163,74,0.08)", text: "#16A34A", border: "rgba(22,163,74,0.2)" },
  3: { bg: "rgba(107,114,128,0.08)", text: "#6B7280", border: "rgba(107,114,128,0.2)" },
};

interface ProjectCardProps {
  project: CaseStudyProject;
  onOpen: (project: CaseStudyProject) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const tierStyle = TIER_COLORS[project.tier];
  const accent = project.color;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        border: `1.5px solid ${hovered ? accent + "40" : "#E2E5E9"}`,
        borderTop: `3px solid ${hovered ? accent : "#E2E5E9"}`,
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: hovered
          ? `0 12px 40px -8px ${accent}20, 0 2px 8px rgba(17,19,24,0.06)`
          : "0 1px 3px rgba(17,19,24,0.03), 0 4px 12px rgba(17,19,24,0.04)",
        transform: hovered ? "translateY(-4px)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      aria-label={`Open case study: ${project.name}`}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    >
      {/* Background accent glow — subtle */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "160px",
          height: "160px",
          background: `radial-gradient(circle at top right, ${accent}10, transparent 70%)`,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        {/* Project number */}
        <span
          style={{
            fontSize: "10px",
            fontWeight: 800,
            fontFamily: "ui-monospace, monospace",
            color: "#8A919C",
            background: "#F1F3F5",
            border: "1px solid #E2E5E9",
            borderRadius: "5px",
            padding: "3px 8px",
            letterSpacing: "0.08em",
            flexShrink: 0,
          }}
        >
          PROJECT / {String(project.index).padStart(2, "0")}
        </span>

        {/* Tier badge */}
        <span
          style={{
            fontSize: "9.5px",
            fontWeight: 800,
            fontFamily: "ui-monospace, monospace",
            color: tierStyle.text,
            background: tierStyle.bg,
            border: `1px solid ${tierStyle.border}`,
            borderRadius: "5px",
            padding: "3px 8px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          {project.tier === 1 ? "AI System" : project.tier === 2 ? "Full Stack" : "Operational"}
        </span>
      </div>

      {/* Category chip */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {project.tier === 1 ? (
          <Bot size={11} color={accent} strokeWidth={2} />
        ) : (
          <Zap size={11} color={accent} strokeWidth={2} />
        )}
        <span
          style={{
            fontSize: "10.5px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: accent,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Title + tagline */}
      <div>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#111318",
            margin: "0 0 8px",
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            transition: "color 0.2s ease",
          }}
        >
          {project.name}
        </h3>
        <p
          style={{
            fontSize: "13.5px",
            color: "#5F6672",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {project.tagline}
        </p>
      </div>

      {/* Problem preview */}
      <div
        style={{
          background: "#F7F8FA",
          border: "1px solid #E2E5E9",
          borderLeft: `3px solid ${accent}`,
          borderRadius: "8px",
          padding: "10px 12px",
          fontSize: "12.5px",
          color: "#5F6672",
          lineHeight: 1.6,
        }}
      >
        <span
          style={{
            fontSize: "9.5px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#8A919C",
            fontFamily: "ui-monospace, monospace",
            display: "block",
            marginBottom: "4px",
          }}
        >
          PROBLEM
        </span>
        {project.problem.slice(0, 120)}…
      </div>

      {/* Tech pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {project.techStack
          .flatMap((g) => g.items)
          .slice(0, 5)
          .map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: "10.5px",
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: "5px",
                background: "#F1F3F5",
                color: "#5F6672",
                border: "1px solid #E2E5E9",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {tech}
            </span>
          ))}
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "16px",
          borderTop: "1px solid #F1F3F5",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: hovered ? accent : "#5F6672",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            transition: "color 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          EXPLORE SYSTEM
          <ArrowRight
            size={13}
            style={{
              transform: hovered ? "translateX(3px)" : "none",
              transition: "transform 0.2s ease",
            }}
          />
        </span>

        {/* Arch node count */}
        <span
          style={{
            fontSize: "10px",
            color: "#8A919C",
            fontFamily: "ui-monospace, monospace",
            fontWeight: 600,
          }}
        >
          {project.architecture.length} NODES
        </span>
      </div>
    </div>
  );
}

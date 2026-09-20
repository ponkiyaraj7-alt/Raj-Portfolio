"use client";

import React from "react";
import { EXPERIENCES } from "@/data/experience";
import { Briefcase } from "lucide-react";
import ProfessionalEvolution from "./ProfessionalEvolution";
import ExperienceItemCard from "./ExperienceItem";
import ExperienceCapabilities from "./ExperienceCapabilities";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{
        padding: "120px 24px",
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E2E5E9",
        borderBottom: "1px solid #E2E5E9",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
      aria-label="Professional Experience"
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>

        {/* ── Section Header ─────────────────────────────────────────────────── */}
        <div style={{ maxWidth: "780px", marginBottom: "56px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "999px",
              background: "#FFFFFF",
              border: "1px solid #E2E5E9",
              color: "#2563EB",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              marginBottom: "18px",
              boxShadow: "0 1px 3px rgba(17,19,24,0.02)",
            }}
          >
            <span
              style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB" }}
              aria-hidden="true"
            />
            <Briefcase size={13} aria-hidden="true" />
            SYSTEM / 04 • EXPERIENCE & PROFESSIONAL STORY
          </div>

          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#111318",
              fontFamily: "var(--font-display), sans-serif",
              margin: "0 0 16px 0",
            }}
          >
            Professional Experience
          </h2>

          <p style={{ fontSize: "16px", lineHeight: 1.65, color: "#5F6672", margin: 0 }}>
            How I developed my skills, what I actively work on, and where I am currently focused
            as an AI engineer.
          </p>
        </div>

        {/* ── Professional Evolution Strip ───────────────────────────────────── */}
        <ProfessionalEvolution />

        {/* ── Experience Cards ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {EXPERIENCES.map((exp, idx) => (
            <ExperienceItemCard key={idx} exp={exp} index={idx} />
          ))}
        </div>

        {/* ── Current Focus ─────────────────────────────────────────────────── */}
        <ExperienceCapabilities />

      </div>
    </section>
  );
}

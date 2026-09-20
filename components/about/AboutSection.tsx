"use client";

import React from "react";
import { aboutData } from "@/data/content";
import { User, ArrowRight } from "lucide-react";
import ProfileShowcase from "./ProfileShowcase";
import EngineeringPhilosophy from "./EngineeringPhilosophy";
import ThinkingFramework from "./ThinkingFramework";

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: "120px 24px",
        backgroundColor: "#F7F8FA",
        borderTop: "1px solid #E2E5E9",
        borderBottom: "1px solid #E2E5E9",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
      aria-label="About Raj Ponkiya — Engineering Ethos & Profile"
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>

        {/* ── Section Header ─────────────────────────────────────────────────── */}
        <div style={{ maxWidth: "800px", marginBottom: "56px" }}>
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
            <User size={13} aria-hidden="true" />
            SYSTEM / 09 • ENGINEERING ETHOS & PROFILE
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
            I don&apos;t start with the technology.
            <br />
            <span style={{ color: "#2563EB" }}>I start with the problem.</span>
          </h2>

          <p style={{ fontSize: "16px", lineHeight: 1.65, color: "#5F6672", margin: 0 }}>
            Modern AI is frequently deployed looking for a problem. My methodology reverses this: deconstruct the
            friction, map the process, and only then wire cognitive intelligence into the automated workflow.
          </p>
        </div>

        {/* ── Engineering Philosophy Pipeline ─────────────────────────────────── */}
        <EngineeringPhilosophy />

        {/* ── Profile Bio + Thinking Framework ────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "36px",
            alignItems: "start",
            marginBottom: "48px",
          }}
        >
          {/* Left: Bio narrative */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#111318",
                margin: 0,
                fontFamily: "var(--font-display), sans-serif",
                letterSpacing: "-0.015em",
              }}
            >
              About Raj Ponkiya
            </h3>

            {/* Introduction */}
            <p style={{ fontSize: "15px", color: "#111318", lineHeight: 1.7, margin: 0 }}>
              {aboutData.bio}
            </p>

            {/* Focus + Approach */}
            <p style={{ fontSize: "14.5px", color: "#5F6672", lineHeight: 1.7, margin: 0 }}>
              {aboutData.bioExtended}
            </p>

            {/* Interest / Human element */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E5E9",
                borderLeft: "3px solid #2563EB",
                padding: "16px",
                borderRadius: "0 10px 10px 0",
                fontSize: "13.5px",
                color: "#111318",
                lineHeight: 1.6,
                boxShadow: "0 1px 3px rgba(17,19,24,0.02)",
              }}
            >
              <strong style={{ color: "#2563EB" }}>Outside the codebase:</strong>{" "}
              &ldquo;{aboutData.beyondTheCode}&rdquo;
            </div>

            {/* Interests */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {aboutData.interests.map((interest, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E5E9",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: interest.color,
                      flexShrink: 0,
                      marginTop: "5px",
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <strong style={{ fontSize: "13px", color: "#111318", display: "block", marginBottom: "3px" }}>
                      {interest.title}
                    </strong>
                    <p style={{ fontSize: "12px", color: "#5F6672", margin: 0, lineHeight: 1.5 }}>
                      {interest.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Current direction teaser */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E5E9",
                borderRadius: "10px",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#8A919C",
                    fontFamily: "ui-monospace, monospace",
                    display: "block",
                    marginBottom: "3px",
                  }}
                >
                  CURRENT DIRECTION
                </span>
                <p style={{ fontSize: "13px", color: "#111318", margin: 0, lineHeight: 1.5 }}>
                  Agentic systems, RAG pipelines, and full-stack AI applications.
                </p>
              </div>
              <a
                href="#experience"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#2563EB",
                  textDecoration: "none",
                  flexShrink: 0,
                  fontFamily: "ui-monospace, monospace",
                }}
                aria-label="View current focus in experience section"
              >
                View <ArrowRight size={12} aria-hidden="true" />
              </a>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a
                href={aboutData.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  background: "#111318",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub Profile
              </a>

              <a
                href={aboutData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "1px solid #E2E5E9",
                  background: "#FFFFFF",
                  color: "#111318",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 1px 3px rgba(17,19,24,0.02)",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right: Thinking Framework + Profile Showcase */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <ThinkingFramework />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ProfileShowcase email={aboutData.email} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

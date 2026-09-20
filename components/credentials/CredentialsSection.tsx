"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import Certifications from "./Certifications";
import Education from "./Education";

export default function CredentialsSection() {
  return (
    <section
      id="credentials"
      style={{
        padding: "80px 24px",
        backgroundColor: "#F7F8FA",
        borderTop: "1px solid #E2E5E9",
        borderBottom: "1px solid #E2E5E9",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
      aria-label="Credentials — Education & Certifications"
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>

        {/* Section badge */}
        <div style={{ marginBottom: "40px" }}>
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
            <GraduationCap size={13} aria-hidden="true" />
            SYSTEM / 08 • CREDENTIALS & EDUCATION
          </div>

          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
              color: "#111318",
              fontFamily: "var(--font-display), sans-serif",
              margin: "0 0 10px 0",
            }}
          >
            Education & Certifications
          </h2>
          <p style={{ fontSize: "15px", color: "#5F6672", margin: 0, lineHeight: 1.6 }}>
            Academic background and professional credentials.
          </p>
        </div>

        {/* Two-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          <Education />
          <Certifications />
        </div>

      </div>
    </section>
  );
}

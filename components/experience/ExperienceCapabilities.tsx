"use client";

import React from "react";
import { CURRENT_FOCUS } from "@/data/experience";
import { ArrowRight } from "lucide-react";

export default function ExperienceCapabilities() {
  return (
    <div
      style={{
        background: "#F7F8FA",
        border: "1px solid #E2E5E9",
        borderRadius: "16px",
        padding: "32px 28px",
        marginTop: "32px",
      }}
      aria-label="Current technical focus areas"
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "24px",
          paddingBottom: "20px",
          borderBottom: "1px solid #E2E5E9",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.09em",
              color: "#8A919C",
              display: "block",
              marginBottom: "6px",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            CURRENT FOCUS
          </span>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#111318",
              margin: 0,
              fontFamily: "var(--font-display), sans-serif",
              letterSpacing: "-0.015em",
            }}
          >
            Where I am headed professionally
          </h3>
        </div>

        <a
          href="#about"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#2563EB",
            textDecoration: "none",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          Engineering approach <ArrowRight size={13} />
        </a>
      </div>

      {/* Focus areas grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
        }}
      >
        {CURRENT_FOCUS.map((area) => (
          <div
            key={area.id}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E5E9",
              borderRadius: "10px",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#CBD2D9";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(17,19,24,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E2E5E9";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#2563EB",
                display: "block",
              }}
              aria-hidden="true"
            />
            <strong
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#111318",
                lineHeight: 1.3,
              }}
            >
              {area.label}
            </strong>
            <p
              style={{
                fontSize: "11.5px",
                color: "#5F6672",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {area.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

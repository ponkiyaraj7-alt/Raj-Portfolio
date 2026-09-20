"use client";

import React from "react";
import { EDUCATION } from "@/data/experience";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const hasData =
    EDUCATION.institution !== "TODO — VERIFY" &&
    EDUCATION.program !== "TODO — VERIFY";

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E5E9",
        borderRadius: "14px",
        padding: "24px",
      }}
      aria-label="Education"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
        <GraduationCap size={16} color="#2563EB" aria-hidden="true" />
        <h3
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#111318",
            margin: 0,
            fontFamily: "var(--font-display), sans-serif",
          }}
        >
          Education
        </h3>
      </div>

      {hasData ? (
        <div
          style={{
            background: "#F7F8FA",
            border: "1px solid #E2E5E9",
            borderRadius: "10px",
            padding: "14px 16px",
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#111318", marginBottom: "2px" }}>
            {EDUCATION.institution}
          </div>
          <div style={{ fontSize: "11.5px", color: "#5F6672" }}>
            {EDUCATION.program}
            {EDUCATION.period !== "TODO — VERIFY" && ` · ${EDUCATION.period}`}
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "#F7F8FA",
            border: "1px dashed #CBD2D9",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#8A919C",
              margin: 0,
              fontFamily: "ui-monospace, monospace",
              fontStyle: "italic",
            }}
          >
            TODO — VERIFY: Education details not confirmed.
          </p>
        </div>
      )}
    </div>
  );
}

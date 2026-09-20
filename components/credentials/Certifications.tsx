"use client";

import React from "react";
import { CERTIFICATIONS } from "@/data/experience";
import type { Certification } from "@/data/experience";
import { Award } from "lucide-react";

export default function Certifications() {
  const hasData = CERTIFICATIONS.length > 0;

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E5E9",
        borderRadius: "14px",
        padding: "24px",
      }}
      aria-label="Certifications"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
        <Award size={16} color="#2563EB" aria-hidden="true" />
        <h3
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#111318",
            margin: 0,
            fontFamily: "var(--font-display), sans-serif",
          }}
        >
          Certifications
        </h3>
      </div>

      {hasData ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {CERTIFICATIONS.map((cert: Certification, idx: number) => (
            <div
              key={idx}
              style={{
                background: "#F7F8FA",
                border: "1px solid #E2E5E9",
                borderRadius: "10px",
                padding: "14px 16px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#111318", marginBottom: "2px" }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: "11.5px", color: "#5F6672" }}>
                  {cert.issuer}
                  {cert.year && ` · ${cert.year}`}
                </div>
              </div>
              <span
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: cert.status === "completed" ? "#10B981" : "#F59E0B",
                  background: cert.status === "completed" ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)",
                  border: `1px solid ${cert.status === "completed" ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}`,
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontFamily: "ui-monospace, monospace",
                  flexShrink: 0,
                }}
              >
                {cert.status === "completed" ? "COMPLETED" : "IN PROGRESS"}
              </span>
            </div>
          ))}
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
            TODO — VERIFY: No certifications confirmed.
          </p>
        </div>
      )}
    </div>
  );
}

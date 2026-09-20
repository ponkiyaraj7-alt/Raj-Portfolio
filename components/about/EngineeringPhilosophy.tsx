"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const PHILOSOPHY_STEPS = [
  { step: "01", name: "Problem", desc: "Identify operational friction & manual effort" },
  { step: "02", name: "Process", desc: "Map exact inputs, dependencies & deterministic rules" },
  { step: "03", name: "Opportunity", desc: "Isolate where cognitive intelligence creates leverage" },
  { step: "04", name: "AI / LLM", desc: "Apply targeted models for extraction & reasoning" },
  { step: "05", name: "Automation", desc: "Bind models to background queues & verified tools" },
  { step: "06", name: "System", desc: "Package into accessible software with telemetry" },
  { step: "07", name: "Outcome", desc: "Deliver measurable hours saved and zero manual re-entry" },
];

export default function EngineeringPhilosophy() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E5E9",
        borderRadius: "16px",
        padding: "36px 28px",
        boxShadow: "0 1px 3px rgba(17,19,24,0.02), 0 4px 12px rgba(17,19,24,0.03)",
        marginBottom: "40px",
      }}
      aria-label="Engineering philosophy — 7-step solution methodology"
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#8A919C",
          marginBottom: "20px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        THE 7-STEP SOLUTION METHODOLOGY
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
        }}
      >
        {PHILOSOPHY_STEPS.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#F7F8FA",
              borderRadius: "10px",
              padding: "16px 14px",
              border: "1px solid #E2E5E9",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontSize: "10.5px",
                  fontWeight: 800,
                  color: "#2563EB",
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                {item.step}
              </span>
              {idx < PHILOSOPHY_STEPS.length - 1 && (
                <ArrowRight size={11} color="#8A919C" aria-hidden="true" />
              )}
            </div>
            <strong style={{ fontSize: "13.5px", color: "#111318" }}>{item.name}</strong>
            <p style={{ fontSize: "11px", color: "#5F6672", margin: 0, lineHeight: 1.45 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

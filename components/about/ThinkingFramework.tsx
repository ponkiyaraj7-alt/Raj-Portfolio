"use client";

import React from "react";
import { THINKING_STEPS } from "@/data/experience";

export default function ThinkingFramework() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E5E9",
        borderRadius: "16px",
        padding: "32px 28px",
        boxShadow: "0 1px 3px rgba(17,19,24,0.02), 0 4px 12px rgba(17,19,24,0.03)",
        marginBottom: "40px",
      }}
      aria-label="How I Think — Personal engineering approach"
    >
      {/* Section label */}
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          color: "#8A919C",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          marginBottom: "6px",
        }}
      >
        HOW I THINK
      </div>
      <p
        style={{
          fontSize: "13px",
          color: "#5F6672",
          margin: "0 0 28px 0",
          lineHeight: 1.5,
        }}
      >
        My personal engineering approach — not a universal methodology.
      </p>

      {/* Steps — vertical connector layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {THINKING_STEPS.map((step, idx) => {
          const isLast = idx === THINKING_STEPS.length - 1;
          return (
            <div key={step.number} style={{ display: "flex", gap: "16px" }}>
              {/* Left: number + connector line */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0",
                  flexShrink: 0,
                }}
              >
                {/* Number bubble */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: idx === 0 ? "#2563EB" : "#F1F3F5",
                    border: idx === 0 ? "2px solid #2563EB" : "1px solid #E2E5E9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <span
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 800,
                      color: idx === 0 ? "#FFFFFF" : "#8A919C",
                      fontFamily: "ui-monospace, monospace",
                    }}
                  >
                    {step.number}
                  </span>
                </div>
                {/* Connector line */}
                {!isLast && (
                  <div
                    style={{
                      width: "1px",
                      flex: 1,
                      minHeight: "28px",
                      background: "linear-gradient(to bottom, #CBD2D9, #E2E5E9)",
                      margin: "4px 0",
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Right: content */}
              <div
                style={{
                  paddingBottom: isLast ? "0" : "24px",
                  paddingTop: "4px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#2563EB",
                    fontFamily: "ui-monospace, monospace",
                    marginBottom: "4px",
                  }}
                >
                  {step.action}
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#5F6672",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {step.question}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

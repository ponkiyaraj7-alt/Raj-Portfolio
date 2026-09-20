"use client";

import React from "react";
import { PROFESSIONAL_EVOLUTION } from "@/data/experience";

export default function ProfessionalEvolution() {
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
      aria-label="Professional evolution stages"
    >
      {/* Label */}
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          color: "#8A919C",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          marginBottom: "24px",
        }}
      >
        PROFESSIONAL EVOLUTION
      </div>

      {/* Stages — horizontal scroll on small screens */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        {PROFESSIONAL_EVOLUTION.map((stage, idx) => (
          <React.Fragment key={stage.stage}>
            {/* Stage Node */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                minWidth: "110px",
                flex: "0 0 auto",
              }}
            >
              {/* Circle indicator */}
              <div
                style={{
                  width: stage.active ? "38px" : "30px",
                  height: stage.active ? "38px" : "30px",
                  borderRadius: "50%",
                  background: stage.active ? "#2563EB" : "#F1F3F5",
                  border: stage.active ? "2px solid #2563EB" : "1px solid #E2E5E9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
                aria-hidden="true"
              >
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 800,
                    color: stage.active ? "#FFFFFF" : "#8A919C",
                    fontFamily: "ui-monospace, monospace",
                  }}
                >
                  {stage.stage}
                </span>
              </div>

              {/* Label */}
              <div style={{ textAlign: "center", paddingLeft: "4px", paddingRight: "4px" }}>
                <p
                  style={{
                    fontSize: "11.5px",
                    fontWeight: stage.active ? 800 : 600,
                    color: stage.active ? "#111318" : "#5F6672",
                    margin: "0 0 4px 0",
                    lineHeight: 1.3,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  }}
                >
                  {stage.label}
                </p>
                {stage.active && (
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "#2563EB",
                      background: "rgba(37,99,235,0.08)",
                      border: "1px solid rgba(37,99,235,0.2)",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      fontFamily: "ui-monospace, monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    CURRENT
                  </span>
                )}
              </div>
            </div>

            {/* Connector arrow between stages */}
            {idx < PROFESSIONAL_EVOLUTION.length - 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "6px",
                  flexShrink: 0,
                  color: "#CBD2D9",
                  fontSize: "16px",
                  margin: "0 4px",
                }}
                aria-hidden="true"
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Active stage description */}
      {PROFESSIONAL_EVOLUTION.filter((s) => s.active).map((active) => (
        <div
          key={active.stage}
          style={{
            marginTop: "20px",
            paddingTop: "18px",
            borderTop: "1px solid #E2E5E9",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#2563EB",
              flexShrink: 0,
              marginTop: "6px",
            }}
            aria-hidden="true"
          />
          <p
            style={{
              fontSize: "13.5px",
              color: "#5F6672",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "#111318" }}>{active.label}:</strong>{" "}
            {active.description}
          </p>
        </div>
      ))}
    </div>
  );
}

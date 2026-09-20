"use client";

import React, { useState } from "react";
import { CAPABILITY_MATRIX } from "@/data/capabilityMatrix";

export default function CapabilityMatrix() {
  const [activeGroup, setActiveGroup] = useState<string>(CAPABILITY_MATRIX[0].id);

  const selected = CAPABILITY_MATRIX.find((g) => g.id === activeGroup) ?? CAPABILITY_MATRIX[0];

  return (
    <div
      style={{
        background: "#F7F8FA",
        border: "1px solid #E2E5E9",
        borderRadius: "16px",
        padding: "32px 28px",
        marginTop: "40px",
      }}
      aria-label="Technical capability matrix"
    >
      {/* Header */}
      <div style={{ marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid #E2E5E9" }}>
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
          CAPABILITY MATRIX
        </span>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: "#111318",
            margin: "0 0 4px 0",
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "-0.015em",
          }}
        >
          Technical Capabilities
        </h3>
        <p style={{ fontSize: "13px", color: "#5F6672", margin: 0 }}>
          Organized by engineering purpose. No percentages.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(160px, 220px) 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left: category tabs */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          role="tablist"
          aria-label="Capability categories"
        >
          {CAPABILITY_MATRIX.map((group) => {
            const isActive = group.id === activeGroup;
            return (
              <button
                key={group.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`capability-panel-${group.id}`}
                id={`capability-tab-${group.id}`}
                onClick={() => setActiveGroup(group.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: isActive ? "#FFFFFF" : "transparent",
                  color: isActive ? "#111318" : "#5F6672",
                  fontSize: "12.5px",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                  boxShadow: isActive ? "0 1px 3px rgba(17,19,24,0.06)" : "none",
                  borderLeft: isActive ? `3px solid #2563EB` : "3px solid transparent",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: isActive ? group.color : "#CBD2D9",
                    flexShrink: 0,
                    transition: "background 0.15s ease",
                  }}
                  aria-hidden="true"
                />
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Right: selected group items */}
        <div
          id={`capability-panel-${selected.id}`}
          role="tabpanel"
          aria-labelledby={`capability-tab-${selected.id}`}
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E5E9",
            borderRadius: "12px",
            padding: "22px",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: selected.color,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <strong
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#111318",
                }}
              >
                {selected.label}
              </strong>
            </div>
            <p style={{ fontSize: "12.5px", color: "#5F6672", margin: 0, lineHeight: 1.5 }}>
              {selected.description}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {selected.items.map((item, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: "6px",
                  background: "#F7F8FA",
                  color: "#111318",
                  border: "1px solid #E2E5E9",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  letterSpacing: "0.02em",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

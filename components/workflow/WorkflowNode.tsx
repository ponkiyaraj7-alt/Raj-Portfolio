import React from "react";
import type { WorkflowStep } from "@/data/workflow";

interface WorkflowNodeProps {
  step: WorkflowStep;
  index?: number;
  isActive?: boolean;
  onSelect?: (id: string) => void;
}

export default function WorkflowNode({ step, isActive, onSelect }: WorkflowNodeProps) {
  const nodeNum = String(step.stepNumber).padStart(2, "0");

  return (
    <div
      onClick={() => onSelect?.(step.id)}
      className="workflow-node"
      style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        border: `1px solid ${isActive ? "#2563EB" : "#E2E5E9"}`,
        boxShadow: isActive
          ? "0 8px 24px -4px rgba(37, 99, 235, 0.12), 0 2px 6px rgba(17, 19, 24, 0.04)"
          : "0 1px 3px rgba(17, 19, 24, 0.02), 0 4px 12px rgba(17, 19, 24, 0.03)",
        padding: "22px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        position: "relative",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "pointer",
      }}
    >
      {/* Top Header Badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 800,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              color: isActive ? "#2563EB" : "#5F6672",
              background: isActive ? "rgba(37, 99, 235, 0.08)" : "#F1F3F5",
              padding: "3px 8px",
              borderRadius: "5px",
              letterSpacing: "0.06em",
            }}
          >
            NODE / {nodeNum}
          </span>
          <span style={{ fontSize: "10.5px", color: "#8A919C", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "ui-monospace, monospace" }}>
            {step.stage}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.06em",
              color: isActive ? "#2563EB" : "#8A919C",
            }}
          >
            {isActive ? "ACTIVE" : "READY"}
          </span>
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: isActive ? "#2563EB" : "#16A34A",
              boxShadow: isActive ? "0 0 6px rgba(37, 99, 235, 0.6)" : "none",
            }}
          />
        </div>
      </div>

      {/* Node Title & Tagline */}
      <div>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#111318",
            margin: "0 0 4px 0",
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "-0.015em",
          }}
        >
          {step.title}
        </h3>
        <p style={{ fontSize: "12.5px", color: "#5F6672", margin: 0, lineHeight: 1.45 }}>
          {step.tagline}
        </p>
      </div>

      {/* Action / Transformation description */}
      <div
        style={{
          fontSize: "12px",
          color: "#111318",
          lineHeight: 1.5,
          background: "#F7F8FA",
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid #E2E5E9",
          borderLeft: `3px solid ${isActive ? "#2563EB" : "#CBD2D9"}`,
        }}
      >
        <strong style={{ color: "#5F6672", textTransform: "uppercase", fontSize: "10.5px", letterSpacing: "0.04em", display: "block", marginBottom: "2px" }}>
          TRANSFORMATION
        </strong>
        {step.action}
      </div>

      {/* Inputs & Outputs Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "11px", paddingTop: "2px" }}>
        <div>
          <span style={{ color: "#8A919C", display: "block", fontWeight: 700, textTransform: "uppercase", fontSize: "9.5px", letterSpacing: "0.06em", marginBottom: "4px", fontFamily: "ui-monospace, monospace" }}>
            INPUT
          </span>
          <ul style={{ margin: 0, paddingLeft: "14px", color: "#5F6672", lineHeight: 1.45 }}>
            {step.inputs.map((inp, idx) => (
              <li key={idx}>{inp}</li>
            ))}
          </ul>
        </div>
        <div>
          <span style={{ color: "#8A919C", display: "block", fontWeight: 700, textTransform: "uppercase", fontSize: "9.5px", letterSpacing: "0.06em", marginBottom: "4px", fontFamily: "ui-monospace, monospace" }}>
            OUTPUT
          </span>
          <ul style={{ margin: 0, paddingLeft: "14px", color: "#5F6672", lineHeight: 1.45 }}>
            {step.outputs.map((out, idx) => (
              <li key={idx}>{out}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Technologies tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "auto", paddingTop: "6px" }}>
        {step.tech.map((t, idx) => (
          <span
            key={idx}
            style={{
              fontSize: "10.5px",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "4px",
              background: "#F1F3F5",
              color: "#5F6672",
              border: "1px solid #E2E5E9",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

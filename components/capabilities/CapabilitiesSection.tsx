"use client";

import React, { useState } from "react";
import { CAPABILITIES } from "@/data/capabilities";
import {
  Cpu,
  Bot,
  Workflow,
  Database,
  Mic,
  LayoutGrid,
  Zap,
  Layers,
  Sparkles,
} from "lucide-react";

export default function CapabilitiesSection() {
  const [selectedId, setSelectedId] = useState<string>(CAPABILITIES[0].id);

  const getIcon = (id: string) => {
    switch (id) {
      case "ai-automation":
        return <Zap size={18} />;
      case "llm-applications":
        return <Cpu size={18} />;
      case "ai-agents":
        return <Bot size={18} />;
      case "rag-systems":
        return <Database size={18} />;
      case "voice-ai":
        return <Mic size={18} />;
      case "ai-saas":
        return <LayoutGrid size={18} />;
      case "process-automation":
        return <Workflow size={18} />;
      case "fullstack-ai":
        return <Layers size={18} />;
      default:
        return <Sparkles size={18} />;
    }
  };

  return (
    <section
      id="capabilities"
      style={{
        padding: "120px 24px",
        backgroundColor: "#F7F8FA",
        borderTop: "1px solid #E2E5E9",
        borderBottom: "1px solid #E2E5E9",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
      aria-label="Capabilities & What I Build"
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ maxWidth: "780px", marginBottom: "56px" }}>
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
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB" }} />
            <Layers size={13} />
            SYSTEM / 03 • CAPABILITIES & SYSTEMS
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
            What I Build
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.65,
              color: "#5F6672",
              margin: 0,
            }}
          >
            Rather than generic technology lists, my capabilities are organized around concrete business systems.
            Every solution maps direct causation from initial business friction to measurable operational ROI.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {CAPABILITIES.map((cap) => {
            const isSelected = selectedId === cap.id;
            return (
              <div
                key={cap.id}
                onClick={() => setSelectedId(cap.id)}
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${isSelected ? "#2563EB" : "#E2E5E9"}`,
                  borderRadius: "14px",
                  padding: "26px 22px",
                  boxShadow: isSelected
                    ? "0 8px 24px -4px rgba(37, 99, 235, 0.12), 0 2px 6px rgba(17, 19, 24, 0.04)"
                    : "0 1px 3px rgba(17, 19, 24, 0.02), 0 4px 12px rgba(17, 19, 24, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        background: isSelected ? "rgba(37, 99, 235, 0.1)" : "#F1F3F5",
                        color: isSelected ? "#2563EB" : "#5F6672",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #E2E5E9",
                      }}
                    >
                      {getIcon(cap.id)}
                    </div>
                    <h3
                      style={{
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "#111318",
                        margin: 0,
                        fontFamily: "var(--font-display), sans-serif",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {cap.title}
                    </h3>
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: isSelected ? "#2563EB" : "#5F6672",
                      background: isSelected ? "rgba(37, 99, 235, 0.08)" : "#F1F3F5",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      border: "1px solid #E2E5E9",
                    }}
                  >
                    {cap.badge}
                  </span>
                </div>

                {/* Summary */}
                <p style={{ fontSize: "13.5px", color: "#5F6672", margin: 0, lineHeight: 1.5 }}>
                  {cap.summary}
                </p>

                {/* Structured Breakdown: Problem -> Tech -> AI -> Automation -> Result */}
                <div
                  style={{
                    background: "#F7F8FA",
                    borderRadius: "10px",
                    padding: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    fontSize: "12px",
                    border: "1px solid #E2E5E9",
                    borderLeft: `3px solid ${isSelected ? "#2563EB" : "#CBD2D9"}`,
                  }}
                >
                  <div>
                    <span style={{ color: "#DC2626", fontWeight: 700, textTransform: "uppercase", fontSize: "9.5px", letterSpacing: "0.06em", display: "block", fontFamily: "ui-monospace, monospace" }}>
                      Problem
                    </span>
                    <span style={{ color: "#5F6672" }}>{cap.problem}</span>
                  </div>

                  <div>
                    <span style={{ color: "#5F6672", fontWeight: 700, textTransform: "uppercase", fontSize: "9.5px", letterSpacing: "0.06em", display: "block", fontFamily: "ui-monospace, monospace" }}>
                      Technology
                    </span>
                    <span style={{ color: "#111318", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: "11px" }}>{cap.technology}</span>
                  </div>

                  <div>
                    <span style={{ color: "#2563EB", fontWeight: 700, textTransform: "uppercase", fontSize: "9.5px", letterSpacing: "0.06em", display: "block", fontFamily: "ui-monospace, monospace" }}>
                      AI Component
                    </span>
                    <span style={{ color: "#111318" }}>{cap.ai}</span>
                  </div>

                  <div>
                    <span style={{ color: "#0284c7", fontWeight: 700, textTransform: "uppercase", fontSize: "9.5px", letterSpacing: "0.06em", display: "block", fontFamily: "ui-monospace, monospace" }}>
                      Automation
                    </span>
                    <span style={{ color: "#5F6672" }}>{cap.automation}</span>
                  </div>

                  <div style={{ paddingTop: "6px", borderTop: "1px dashed #E2E5E9" }}>
                    <span style={{ color: "#16A34A", fontWeight: 700, textTransform: "uppercase", fontSize: "9.5px", letterSpacing: "0.06em", display: "block", fontFamily: "ui-monospace, monospace" }}>
                      Measurable Result
                    </span>
                    <strong style={{ color: "#111318" }}>{cap.result}</strong>
                  </div>
                </div>

                {/* Tech Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "auto" }}>
                  {cap.tags.map((tag, i) => (
                    <span
                      key={i}
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
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

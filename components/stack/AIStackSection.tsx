"use client";

import React, { useState } from "react";
import { AI_ENGINEERING_STACK } from "@/data/stack";
import CapabilityMatrix from "./CapabilityMatrix";
import {
  Cpu,
  Bot,
  Server,
  Globe,
  Database,
  Workflow,
  Download,
} from "lucide-react";

export default function AIStackSection() {
  const [selectedGroup, setSelectedGroup] = useState<string>(AI_ENGINEERING_STACK[0].category);

  const getCategoryIcon = (category: string) => {
    if (category.includes("AI & Foundation")) return <Cpu size={18} />;
    if (category.includes("Frameworks")) return <Bot size={18} />;
    if (category.includes("Backend")) return <Server size={18} />;
    if (category.includes("Frontend")) return <Globe size={18} />;
    if (category.includes("Data")) return <Database size={18} />;
    return <Workflow size={18} />;
  };

  return (
    <section
      id="stack"
      style={{
        padding: "120px 24px",
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E2E5E9",
        borderBottom: "1px solid #E2E5E9",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
      aria-label="AI Engineering Stack"
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
            marginBottom: "56px",
          }}
        >
          <div style={{ maxWidth: "780px" }}>
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
              <Cpu size={13} />
              SYSTEM / 07 • PRODUCTION AI STACK
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
              AI Engineering Stack
            </h2>

            <p style={{ fontSize: "16px", lineHeight: 1.65, color: "#5F6672", margin: 0 }}>
              Organized by engineering purpose rather than generic checkboxes. Tools selected to maximize reasoning
              depth, vector retrieval accuracy, and zero-latency user interfaces.
            </p>
          </div>

          <a
            href="/resume.pdf"
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 20px",
              borderRadius: "8px",
              border: "1px solid #E2E5E9",
              background: "#FFFFFF",
              color: "#111318",
              fontWeight: 600,
              fontSize: "13px",
              textDecoration: "none",
              boxShadow: "0 1px 3px rgba(17,19,24,0.02)",
              transition: "all 0.2s ease",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F8FA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
          >
            <Download size={14} color="#2563EB" />
            Download Resume (PDF)
          </a>
        </div>

        {/* Category Purpose Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "24px",
          }}
        >
          {AI_ENGINEERING_STACK.map((group) => {
            const isSelected = selectedGroup === group.category;
            return (
              <div
                key={group.category}
                onClick={() => setSelectedGroup(group.category)}
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
                      {getCategoryIcon(group.category)}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#111318",
                          margin: 0,
                          fontFamily: "var(--font-display), sans-serif",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {group.category}
                      </h3>
                      <span style={{ fontSize: "10px", color: isSelected ? "#2563EB" : "#8A919C", fontWeight: 700, textTransform: "uppercase", fontFamily: "ui-monospace, monospace" }}>
                        {group.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: "13px", color: "#5F6672", margin: 0, lineHeight: 1.5 }}>
                  {group.description}
                </p>

                {/* Items List */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    background: "#F7F8FA",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #E2E5E9",
                  }}
                >
                  {group.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "12px",
                        padding: "6px 0",
                        borderBottom: idx < group.items.length - 1 ? "1px solid #E2E5E9" : "none",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <strong style={{ fontSize: "13px", color: "#111318" }}>{item.name}</strong>
                          <span
                            style={{
                              fontSize: "9.5px",
                              fontWeight: 700,
                              color: "#5F6672",
                              background: "#FFFFFF",
                              border: "1px solid #E2E5E9",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              fontFamily: "ui-monospace, monospace",
                            }}
                          >
                            {item.level}
                          </span>
                        </div>
                        <p style={{ fontSize: "11.5px", color: "#5F6672", margin: "2px 0 0 0", lineHeight: 1.4 }}>
                          {item.purpose}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Capability Matrix ───────────────────────────────────────────── */}
        <CapabilityMatrix />

      </div>
    </section>
  );
}

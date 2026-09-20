"use client";

import React, { useState } from "react";
import type { ExperienceItem } from "@/data/experience";
import { MapPin, Calendar, Bot, Layers, ExternalLink, ChevronRight } from "lucide-react";

interface ExperienceItemProps {
  exp: ExperienceItem;
  index: number;
}

export default function ExperienceItemCard({ exp, index }: ExperienceItemProps) {
  const [hovered, setHovered] = useState(false);

  const treeCapabilities = exp.relatedCapabilities.map((cap) => {
    const labels: Record<string, string> = {
      "ai-automation": "AI Automation",
      "llm-applications": "LLM Applications",
      "ai-agents": "AI Agents",
      "rag-systems": "RAG Systems",
      "fullstack-ai": "Full-Stack AI",
      "process-automation": "Business Process Automation",
      "voice-ai": "Voice AI",
      "ai-saas": "AI-Powered SaaS",
    };
    return labels[cap] ?? cap;
  });

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        border: `1px solid ${hovered ? "#2563EB" : "#E2E5E9"}`,
        borderRadius: "16px",
        padding: "36px 32px",
        boxShadow: hovered
          ? "0 8px 28px -4px rgba(37, 99, 235, 0.12), 0 2px 6px rgba(17, 19, 24, 0.04)"
          : "0 1px 3px rgba(17, 19, 24, 0.02), 0 4px 12px rgba(17, 19, 24, 0.03)",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      aria-label={`Experience: ${exp.role}`}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          paddingBottom: "22px",
          borderBottom: "1px solid #E2E5E9",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Role + badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "6px",
            }}
          >
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#111318",
                margin: 0,
                fontFamily: "var(--font-display), sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {exp.role}
            </h3>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#2563EB",
                background: "rgba(37, 99, 235, 0.08)",
                padding: "3px 10px",
                borderRadius: "999px",
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                border: "1px solid rgba(37,99,235,0.2)",
              }}
            >
              ● ACTIVE
            </span>
          </div>

          {/* Focus */}
          <p style={{ fontSize: "14px", color: "#5F6672", margin: "0 0 8px 0", fontWeight: 500 }}>
            {exp.focus}
          </p>

          {/* Meta: period + location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              color: "#8A919C",
              fontSize: "12px",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <Calendar size={12} color="#2563EB" />
              {exp.period}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <MapPin size={12} color="#2563EB" />
              {exp.location}
            </span>
          </div>
        </div>

        {/* Index label */}
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#8A919C",
            fontFamily: "ui-monospace, monospace",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
          aria-hidden="true"
        >
          EXPERIENCE / {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Two-column layout: responsibilities + tree */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Left: Core domain + responsibilities */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Core domain */}
          <div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#8A919C",
                display: "block",
                marginBottom: "8px",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              CORE DOMAIN FOCUS
            </span>
            <p style={{ fontSize: "14px", color: "#111318", lineHeight: 1.65, margin: 0 }}>
              {exp.whatIWorkOn}
            </p>
          </div>

          {/* Responsibilities */}
          <div
            style={{
              background: "#F7F8FA",
              border: "1px solid #E2E5E9",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "14px",
                color: "#111318",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              <Layers size={15} color="#2563EB" />
              Key Responsibilities
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: "16px",
                color: "#5F6672",
                fontSize: "12.5px",
                lineHeight: 1.65,
                display: "flex",
                flexDirection: "column",
                gap: "7px",
              }}
            >
              {exp.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Tree view of capabilities + AI work */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Capability tree */}
          <div
            style={{
              background: "#F7F8FA",
              border: "1px solid #E2E5E9",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#8A919C",
                marginBottom: "14px",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              CAPABILITY AREAS
            </div>
            <div
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "12.5px",
                lineHeight: "1.9",
                color: "#5F6672",
              }}
              aria-label="Capability areas list"
            >
              <div style={{ color: "#111318", fontWeight: 700, marginBottom: "4px" }}>
                {exp.role}
              </div>
              {treeCapabilities.map((cap, i) => {
                const isLast = i === treeCapabilities.length - 1;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#CBD2D9", userSelect: "none" }}>
                      {isLast ? "└──" : "├──"}
                    </span>
                    <span
                      style={{
                        color: hovered ? "#2563EB" : "#5F6672",
                        transition: "color 0.2s ease",
                        fontSize: "12px",
                      }}
                    >
                      {cap}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI/Automation work */}
          <div
            style={{
              background: "#F7F8FA",
              border: "1px solid #E2E5E9",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "14px",
                color: "#111318",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              <Bot size={15} color="#2563EB" />
              AI & Automation Work
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: "16px",
                color: "#5F6672",
                fontSize: "12.5px",
                lineHeight: 1.65,
                display: "flex",
                flexDirection: "column",
                gap: "7px",
              }}
            >
              {exp.aiAutomationWork.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#8A919C",
            display: "block",
            marginBottom: "10px",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          PRODUCTION TECHNOLOGIES
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {exp.technologies.map((tech, i) => (
            <span
              key={i}
              style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "3px 9px",
                borderRadius: "4px",
                background: "#F1F3F5",
                color: "#5F6672",
                border: "1px solid #E2E5E9",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* View related systems link */}
      {exp.relatedProjects.length > 0 && (
        <div style={{ paddingTop: "4px", borderTop: "1px solid #E2E5E9" }}>
          <a
            href="#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12.5px",
              fontWeight: 700,
              color: hovered ? "#2563EB" : "#5F6672",
              textDecoration: "none",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              transition: "color 0.2s ease",
              letterSpacing: "0.04em",
            }}
          >
            <ExternalLink size={13} />
            View related systems →
          </a>
        </div>
      )}
    </div>
  );
}

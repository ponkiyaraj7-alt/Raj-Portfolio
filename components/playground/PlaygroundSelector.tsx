"use client";

import React from "react";
import { Terminal, Database, Bot, Wrench, Mic } from "lucide-react";

export type PlaygroundModuleId = "llm" | "rag" | "agent" | "tools" | "voice";

interface Module {
  id: PlaygroundModuleId;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  status: "available" | "coming-soon";
}

const MODULES: Module[] = [
  { id: "llm", label: "LLM", sublabel: "Prompt → Response", icon: Terminal, status: "available" },
  { id: "rag", label: "RAG", sublabel: "Retrieval Pipeline", icon: Database, status: "available" },
  { id: "agent", label: "Agent", sublabel: "Multi-step Reasoning", icon: Bot, status: "available" },
  { id: "tools", label: "Tool Calling", sublabel: "Function Dispatch", icon: Wrench, status: "available" },
  { id: "voice", label: "Voice AI", sublabel: "Speech Architecture", icon: Mic, status: "coming-soon" },
];

interface PlaygroundSelectorProps {
  active: PlaygroundModuleId;
  onChange: (id: PlaygroundModuleId) => void;
}

export default function PlaygroundSelector({ active, onChange }: PlaygroundSelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="AI playground modules"
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "32px",
      }}
    >
      {MODULES.map((mod) => {
        const Icon = mod.icon;
        const isActive = active === mod.id;
        const isDisabled = mod.status === "coming-soon";

        return (
          <button
            key={mod.id}
            role="tab"
            aria-selected={isActive}
            aria-label={`${mod.label} module — ${mod.sublabel}`}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(mod.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              borderRadius: "10px",
              border: `1.5px solid ${isActive ? "#2563EB" : "#E2E5E9"}`,
              background: isActive ? "rgba(37, 99, 235, 0.06)" : "#FFFFFF",
              color: isDisabled ? "#CBD2D9" : isActive ? "#2563EB" : "#5F6672",
              cursor: isDisabled ? "not-allowed" : "pointer",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: isActive
                ? "0 4px 14px rgba(37, 99, 235, 0.1), 0 1px 3px rgba(17,19,24,0.02)"
                : "0 1px 3px rgba(17,19,24,0.02)",
              opacity: isDisabled ? 0.5 : 1,
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "7px",
                background: isActive ? "rgba(37,99,235,0.1)" : "#F1F3F5",
                border: `1px solid ${isActive ? "rgba(37,99,235,0.2)" : "#E2E5E9"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={14} />
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  marginBottom: "2px",
                  fontFamily: "var(--font-display), sans-serif",
                }}
              >
                {mod.label}
                {isDisabled && (
                  <span
                    style={{
                      marginLeft: "6px",
                      fontSize: "9px",
                      fontFamily: "ui-monospace, monospace",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#CBD2D9",
                    }}
                  >
                    SOON
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: "10.5px",
                  fontFamily: "ui-monospace, monospace",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  opacity: 0.8,
                }}
              >
                {mod.sublabel}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

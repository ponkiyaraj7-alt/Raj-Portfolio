"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  TOOL_SCENARIOS,
  ToolScenario,
  ToolDefinition,
} from "@/data/playgroundData";
import { ChevronDown, ChevronUp } from "lucide-react";

type ExecStage =
  | "idle"
  | "intent"
  | "schema"
  | "call"
  | "result"
  | "llm"
  | "response"
  | "complete";

const STAGE_ORDER: ExecStage[] = [
  "intent",
  "schema",
  "call",
  "result",
  "llm",
  "response",
  "complete",
];

function SimulationBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 10px",
        borderRadius: "999px",
        background: "#F7F8FA",
        border: "1px solid #E2E5E9",
        fontSize: "10px",
        fontWeight: 700,
        fontFamily: "ui-monospace, monospace",
        letterSpacing: "0.06em",
        color: "#8A919C",
        textTransform: "uppercase" as const,
        whiteSpace: "nowrap" as const,
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#CBD2D9",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      Simulated Demo
    </span>
  );
}

function FlowNode({
  label,
  sublabel,
  content,
  color,
  state,
}: {
  label: string;
  sublabel?: string;
  content?: React.ReactNode;
  color: string;
  state: "idle" | "active" | "complete";
}) {
  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: "10px",
        border: `1.5px solid ${
          state === "active" ? color + "60" : state === "complete" ? "#E2E5E9" : "#E2E5E9"
        }`,
        background:
          state === "active"
            ? color + "08"
            : state === "complete"
            ? "#FAFAFA"
            : "#FFFFFF",
        transition: "all 0.35s ease",
        boxShadow: state === "active" ? `0 4px 14px ${color}15` : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: content ? "8px" : 0,
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background:
              state === "active" ? color : state === "complete" ? "#16A34A" : "#CBD2D9",
            boxShadow: state === "active" ? `0 0 8px ${color}60` : "none",
            animation:
              state === "active" ? "playground-pulse 1.1s ease-in-out infinite" : "none",
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontSize: "10.5px",
              fontWeight: 800,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.07em",
              textTransform: "uppercase" as const,
              color:
                state === "active" ? color : state === "complete" ? "#5F6672" : "#8A919C",
              transition: "color 0.3s ease",
            }}
          >
            {label}
          </div>
          {sublabel && (
            <div
              style={{
                fontSize: "10px",
                fontFamily: "ui-monospace, monospace",
                color: "#8A919C",
              }}
            >
              {sublabel}
            </div>
          )}
        </div>
      </div>
      {content && state !== "idle" && (
        <div
          style={{
            opacity: 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

function VerticalConnector({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3px 0",
      }}
    >
      <div
        style={{
          width: "1.5px",
          height: "18px",
          background: active ? "#2563EB" : "#E2E5E9",
          transition: "background 0.4s ease",
        }}
      />
      <div
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: active ? "#2563EB" : "#CBD2D9",
          boxShadow: active ? "0 0 6px rgba(37,99,235,0.5)" : "none",
          transition: "all 0.3s ease",
        }}
      />
      <div
        style={{
          width: "1.5px",
          height: "18px",
          background: active ? "#2563EB" : "#E2E5E9",
          transition: "background 0.4s ease",
        }}
      />
    </div>
  );
}

function ToolSchemaPanel({ tool }: { tool: ToolDefinition }) {
  return (
    <div
      style={{
        background: "#F7F8FA",
        border: "1px solid #E2E5E9",
        borderRadius: "8px",
        padding: "12px",
      }}
    >
      <code
        style={{
          fontSize: "11px",
          fontFamily: "ui-monospace, monospace",
          color: "#5F6672",
          display: "block",
          lineHeight: 1.6,
        }}
      >
        <span style={{ color: "#8b5cf6" }}>function</span>{" "}
        <span style={{ color: "#2563EB", fontWeight: 700 }}>{tool.name}</span>
        {"("}
        {tool.parameters.map((p, i) => (
          <span key={p.name}>
            {"\n  "}
            <span style={{ color: "#f59e0b" }}>{p.name}</span>
            {": "}
            <span style={{ color: "#10b981" }}>{p.type}</span>
            {p.required ? "" : "?"}
            {i < tool.parameters.length - 1 ? "," : ""}
          </span>
        ))}
        {"\n)"}{" "}
        <span style={{ color: "#8A919C" }}>{`// ${tool.description}`}</span>
      </code>
    </div>
  );
}

function HowItWorks({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div style={{ border: "1px solid #E2E5E9", borderRadius: "10px", overflow: "hidden" }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "#F7F8FA",
          border: "none",
          cursor: "pointer",
          color: "#111318",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.07em",
            textTransform: "uppercase" as const,
            color: "#5F6672",
          }}
        >
          How tool calling works
        </span>
        {open ? <ChevronUp size={14} color="#5F6672" /> : <ChevronDown size={14} color="#5F6672" />}
      </button>
      {open && (
        <div style={{ padding: "16px", background: "#FFFFFF", borderTop: "1px solid #E2E5E9" }}>
          {[
            "1. Tool definitions (name, description, parameter schema) are passed to the LLM at inference time.",
            "2. When the LLM detects a need for real-world data or action, it outputs a structured tool call instead of plain text.",
            "3. The calling application intercepts this output and executes the referenced function.",
            "4. The function result is injected back into the conversation context.",
            "5. The LLM uses the real result to generate its final natural language response.",
            "This enables LLMs to take actions, retrieve live data, run calculations, and interact with external APIs without embedding that logic in the model itself.",
          ].map((step, i) => (
            <p
              key={i}
              style={{
                fontSize: "12.5px",
                color: i === 5 ? "#8A919C" : "#5F6672",
                lineHeight: 1.6,
                margin: "0 0 6px",
                fontStyle: i === 5 ? "italic" : "normal",
              }}
            >
              {step}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ToolCallingPlayground() {
  const [selectedScenario, setSelectedScenario] = useState<ToolScenario>(TOOL_SCENARIOS[0]);
  const [currentStage, setCurrentStage] = useState<ExecStage>("idle");
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const handleRun = useCallback(() => {
    clearTimers();
    STAGE_ORDER.forEach((stage, i) => {
      const t = setTimeout(() => setCurrentStage(stage), i * 550);
      timers.current.push(t);
    });
  }, []);

  const handleReset = () => {
    clearTimers();
    setCurrentStage("idle");
  };

  useEffect(() => () => clearTimers(), []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stageIndex = STAGE_ORDER.indexOf(currentStage);
  const isComplete = currentStage === "complete";

  const getState = (stage: ExecStage): "idle" | "active" | "complete" => {
    const si = STAGE_ORDER.indexOf(stage);
    if (si < stageIndex) return "complete";
    if (si === stageIndex) return "active";
    return "idle";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div>
        <div
          style={{
            fontSize: "10.5px",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "#2563EB",
            marginBottom: "6px",
          }}
        >
          MODULE 04 · TOOL CALLING
        </div>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#111318",
            margin: "0 0 6px",
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          LLM Function Dispatch
        </h3>
        <p style={{ fontSize: "13.5px", color: "#5F6672", margin: 0, lineHeight: 1.6 }}>
          When an LLM detects it needs real-world data, it emits a structured tool call instead of
          guessing. The result is injected back into context for a grounded response.
        </p>
      </div>

      {/* Scenario selector */}
      <div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.07em",
            textTransform: "uppercase" as const,
            color: "#8A919C",
            marginBottom: "8px",
          }}
        >
          Select Scenario
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {TOOL_SCENARIOS.map((s) => {
            const isSelected = selectedScenario.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedScenario(s);
                  handleReset();
                }}
                style={{
                  padding: "9px 16px",
                  borderRadius: "8px",
                  border: `1.5px solid ${isSelected ? "#2563EB" : "#E2E5E9"}`,
                  background: isSelected ? "rgba(37,99,235,0.06)" : "#FFFFFF",
                  color: isSelected ? "#2563EB" : "#5F6672",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  fontFamily: "var(--font-display), sans-serif",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main flow + schema panel */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 280px",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {/* Left: Execution flow */}
        <div>
          {/* User input */}
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              background: "#F7F8FA",
              border: "1px solid #E2E5E9",
              marginBottom: "6px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.07em",
                textTransform: "uppercase" as const,
                color: "#8A919C",
                marginBottom: "6px",
              }}
            >
              User Input
            </div>
            <p
              style={{
                fontSize: "13.5px",
                color: "#111318",
                margin: 0,
                fontFamily: "var(--font-display), sans-serif",
              }}
            >
              &ldquo;{selectedScenario.userInput}&rdquo;
            </p>
          </div>

          <VerticalConnector active={stageIndex >= 0} />

          <FlowNode
            label="LLM"
            sublabel="Intent detection"
            color="#2563EB"
            state={getState("intent")}
            content={
              <div
                style={{
                  background: "#F7F8FA",
                  border: "1px solid #E2E5E9",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    fontFamily: "ui-monospace, monospace",
                    letterSpacing: "0.08em",
                    color: "#8A919C",
                    textTransform: "uppercase" as const,
                    marginBottom: "3px",
                  }}
                >
                  Detected Intent
                </div>
                <code
                  style={{
                    fontSize: "11.5px",
                    fontFamily: "ui-monospace, monospace",
                    color: "#2563EB",
                    fontWeight: 700,
                  }}
                >
                  {selectedScenario.detectedIntent}
                </code>
              </div>
            }
          />

          <VerticalConnector active={stageIndex >= STAGE_ORDER.indexOf("schema")} />

          <FlowNode
            label="Tool Selection"
            sublabel="Schema matching"
            color="#8b5cf6"
            state={getState("schema")}
            content={<ToolSchemaPanel tool={selectedScenario.selectedTool} />}
          />

          <VerticalConnector active={stageIndex >= STAGE_ORDER.indexOf("call")} />

          <FlowNode
            label="Tool Call"
            sublabel="Function invoked"
            color="#f59e0b"
            state={getState("call")}
            content={
              <div
                style={{
                  background: "#F7F8FA",
                  border: "1px solid #E2E5E9",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              >
                <code
                  style={{
                    fontSize: "11.5px",
                    fontFamily: "ui-monospace, monospace",
                    color: "#111318",
                    display: "block",
                  }}
                >
                  <span style={{ color: "#f59e0b", fontWeight: 700 }}>
                    {selectedScenario.selectedTool.name}
                  </span>
                  {"("}
                  {Object.entries(selectedScenario.toolParams).map(([k, v], i, arr) => (
                    <span key={k}>
                      <span style={{ color: "#8b5cf6" }}>{k}</span>
                      {"='"}
                      <span style={{ color: "#10b981" }}>{v}</span>
                      {"'"}
                      {i < arr.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  {")"}
                </code>
              </div>
            }
          />

          <VerticalConnector active={stageIndex >= STAGE_ORDER.indexOf("result")} />

          <FlowNode
            label="Tool Result"
            sublabel="Function returned"
            color="#10b981"
            state={getState("result")}
            content={
              <div
                style={{
                  background: "#F7F8FA",
                  border: "1px solid #E2E5E9",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              >
                <code
                  style={{
                    fontSize: "10.5px",
                    fontFamily: "ui-monospace, monospace",
                    color: "#5F6672",
                    display: "block",
                    lineHeight: 1.5,
                    wordBreak: "break-all" as const,
                  }}
                >
                  {selectedScenario.toolResult}
                </code>
              </div>
            }
          />

          <VerticalConnector active={stageIndex >= STAGE_ORDER.indexOf("llm")} />

          <FlowNode
            label="LLM"
            sublabel="Response generation"
            color="#2563EB"
            state={getState("llm")}
          />

          <VerticalConnector active={stageIndex >= STAGE_ORDER.indexOf("response")} />

          {/* Final response */}
          <div
            style={{
              padding: "14px 16px",
              borderRadius: "10px",
              border: `1.5px solid ${stageIndex >= STAGE_ORDER.indexOf("response") ? "#16A34A" : "#E2E5E9"}`,
              background:
                stageIndex >= STAGE_ORDER.indexOf("response")
                  ? "rgba(22,163,74,0.04)"
                  : "#FFFFFF",
              transition: "all 0.35s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom:
                  stageIndex >= STAGE_ORDER.indexOf("response") ? "10px" : "0",
              }}
            >
              <span
                style={{
                  fontSize: "10.5px",
                  fontWeight: 800,
                  fontFamily: "ui-monospace, monospace",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase" as const,
                  color:
                    stageIndex >= STAGE_ORDER.indexOf("response") ? "#16A34A" : "#8A919C",
                }}
              >
                {stageIndex >= STAGE_ORDER.indexOf("response")
                  ? "✓ Final Response"
                  : "Final Response"}
              </span>
              {stageIndex >= STAGE_ORDER.indexOf("response") && <SimulationBadge />}
            </div>
            {stageIndex >= STAGE_ORDER.indexOf("response") && (
              <p
                style={{
                  fontSize: "14px",
                  color: "#111318",
                  margin: 0,
                  lineHeight: 1.65,
                }}
              >
                {selectedScenario.finalResponse}
              </p>
            )}
          </div>
        </div>

        {/* Right: Tool definition */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E5E9",
            borderRadius: "12px",
            padding: "16px",
            position: "sticky",
            top: "24px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.07em",
              textTransform: "uppercase" as const,
              color: "#8A919C",
              marginBottom: "12px",
            }}
          >
            Tool Definition
          </div>
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#111318",
                fontFamily: "var(--font-display), sans-serif",
                marginBottom: "3px",
              }}
            >
              {selectedScenario.selectedTool.name}
            </div>
            <div
              style={{
                fontSize: "11.5px",
                color: "#5F6672",
                lineHeight: 1.5,
              }}
            >
              {selectedScenario.selectedTool.description}
            </div>
          </div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.07em",
              textTransform: "uppercase" as const,
              color: "#8A919C",
              marginBottom: "8px",
            }}
          >
            Parameters
          </div>
          {selectedScenario.selectedTool.parameters.map((p) => (
            <div
              key={p.name}
              style={{
                padding: "8px 10px",
                borderRadius: "7px",
                background: "#F7F8FA",
                border: "1px solid #E2E5E9",
                marginBottom: "6px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                <code
                  style={{
                    fontSize: "11.5px",
                    fontFamily: "ui-monospace, monospace",
                    color: "#2563EB",
                    fontWeight: 700,
                  }}
                >
                  {p.name}
                </code>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "ui-monospace, monospace",
                    color: "#10b981",
                    background: "rgba(16,185,129,0.08)",
                    padding: "1px 6px",
                    borderRadius: "3px",
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}
                >
                  {p.type}
                </span>
                {!p.required && (
                  <span
                    style={{
                      fontSize: "9.5px",
                      fontFamily: "ui-monospace, monospace",
                      color: "#8A919C",
                    }}
                  >
                    optional
                  </span>
                )}
              </div>
              <div style={{ fontSize: "11px", color: "#8A919C" }}>{p.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Run button */}
      {currentStage === "idle" && (
        <button
          onClick={prefersReduced ? () => setCurrentStage("complete") : handleRun}
          style={{
            alignSelf: "flex-start",
            padding: "11px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#2563EB",
            color: "#FFFFFF",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
            fontFamily: "var(--font-display), sans-serif",
          }}
          aria-label="Run tool calling demo"
        >
          Run Demo →
        </button>
      )}

      {isComplete && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            background: "rgba(22,163,74,0.05)",
            border: "1px solid rgba(22,163,74,0.2)",
            borderRadius: "10px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#16A34A",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.04em",
            }}
          >
            SYSTEM EXPLORED ✓
          </span>
          <button
            onClick={handleReset}
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#5F6672",
              background: "none",
              border: "1px solid #E2E5E9",
              borderRadius: "6px",
              padding: "5px 12px",
              cursor: "pointer",
              fontFamily: "var(--font-display), sans-serif",
            }}
          >
            Run Again
          </button>
        </div>
      )}

      <HowItWorks open={howItWorksOpen} onToggle={() => setHowItWorksOpen((v) => !v)} />
    </div>
  );
}

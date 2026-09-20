"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  AGENT_TASKS,
  AgentTask,
  AgentStep,
  AGENT_PHASE_COLORS,
} from "@/data/playgroundData";
import { ChevronDown, ChevronUp } from "lucide-react";

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

function StepCard({
  step,
  visible,
  isLast,
}: {
  step: AgentStep;
  visible: boolean;
  isLast: boolean;
}) {
  const color = AGENT_PHASE_COLORS[step.phase] ?? "#2563EB";

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        marginBottom: isLast ? 0 : "0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
        }}
      >
        {/* Vertical connector line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: visible ? `${color}15` : "#F1F3F5",
              border: `1.5px solid ${visible ? color + "40" : "#E2E5E9"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: visible ? color : "#CBD2D9",
                boxShadow: visible ? `0 0 8px ${color}60` : "none",
                animation:
                  visible && step.phase !== "result" && step.phase !== "respond"
                    ? "playground-pulse 1.2s ease-in-out infinite"
                    : "none",
                transition: "all 0.3s ease",
              }}
            />
          </div>
          {!isLast && (
            <div
              style={{
                width: "1.5px",
                flex: 1,
                minHeight: "24px",
                background: visible ? `${color}30` : "#E2E5E9",
                margin: "4px 0",
                transition: "background 0.4s ease",
              }}
            />
          )}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            paddingBottom: isLast ? 0 : "16px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 800,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              color: visible ? color : "#CBD2D9",
              marginBottom: "4px",
              transition: "color 0.3s ease",
            }}
          >
            {step.label}
          </div>

          <div
            style={{
              background: "#FFFFFF",
              border: `1.5px solid ${visible ? color + "25" : "#E2E5E9"}`,
              borderRadius: "9px",
              padding: "10px 12px",
              transition: "all 0.3s ease",
            }}
          >
            <p
              style={{
                fontSize: "12.5px",
                color: visible ? "#5F6672" : "#CBD2D9",
                margin: step.toolCall ? "0 0 8px" : "0",
                lineHeight: 1.55,
                transition: "color 0.3s ease",
              }}
            >
              {step.content}
            </p>

            {step.toolCall && visible && (
              <div
                style={{
                  background: "#F7F8FA",
                  border: "1px solid #E2E5E9",
                  borderRadius: "6px",
                  padding: "8px 10px",
                  marginBottom: step.toolResult ? "6px" : 0,
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    fontFamily: "ui-monospace, monospace",
                    letterSpacing: "0.08em",
                    color: "#f59e0b",
                    textTransform: "uppercase" as const,
                    marginBottom: "3px",
                  }}
                >
                  Tool Call
                </div>
                <code
                  style={{
                    fontSize: "11px",
                    fontFamily: "ui-monospace, monospace",
                    color: "#111318",
                    display: "block",
                    lineHeight: 1.4,
                  }}
                >
                  {step.toolCall}
                </code>
              </div>
            )}

            {step.toolResult && visible && (
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
                    color: "#10b981",
                    textTransform: "uppercase" as const,
                    marginBottom: "3px",
                  }}
                >
                  Tool Result
                </div>
                <code
                  style={{
                    fontSize: "10.5px",
                    fontFamily: "ui-monospace, monospace",
                    color: "#5F6672",
                    display: "block",
                    lineHeight: 1.45,
                    wordBreak: "break-all" as const,
                  }}
                >
                  {step.toolResult}
                </code>
              </div>
            )}
          </div>
        </div>
      </div>
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
          How AI agents work
        </span>
        {open ? <ChevronUp size={14} color="#5F6672" /> : <ChevronDown size={14} color="#5F6672" />}
      </button>
      {open && (
        <div style={{ padding: "16px", background: "#FFFFFF", borderTop: "1px solid #E2E5E9" }}>
          {[
            "1. The agent receives a user request and starts an observation loop.",
            "2. It reasons about what information or actions are needed to complete the task.",
            "3. It selects the appropriate tool — a function with a defined schema — and calls it with parameters.",
            "4. The tool result is returned and the agent adds it to its context.",
            "5. The agent reflects: is the task complete, or does it need more steps?",
            "6. Once confident, it generates a final response grounded in all retrieved information.",
            "In production: frameworks like LangGraph, AutoGen, or CrewAI manage the agent loop, state persistence, and tool registry.",
          ].map((step, i) => (
            <p
              key={i}
              style={{
                fontSize: "12.5px",
                color: i === 6 ? "#8A919C" : "#5F6672",
                lineHeight: 1.6,
                margin: "0 0 6px",
                fontStyle: i === 6 ? "italic" : "normal",
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

export default function AgentPlayground() {
  const [selectedTask, setSelectedTask] = useState<AgentTask>(AGENT_TASKS[0]);
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const handleRun = useCallback(() => {
    clearTimers();
    setVisibleSteps(0);
    setRunning(true);

    selectedTask.steps.forEach((_, i) => {
      const t = setTimeout(
        () => {
          setVisibleSteps(i + 1);
          if (i === selectedTask.steps.length - 1) {
            setRunning(false);
          }
        },
        (i + 1) * 500
      );
      timers.current.push(t);
    });
  }, [selectedTask]);

  const handleReset = () => {
    clearTimers();
    setVisibleSteps(0);
    setRunning(false);
  };

  useEffect(() => () => clearTimers(), []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isComplete =
    !running && visibleSteps === selectedTask.steps.length && visibleSteps > 0;

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
          MODULE 03 · AI AGENT
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
          Multi-Step Agent Reasoning
        </h3>
        <p style={{ fontSize: "13.5px", color: "#5F6672", margin: 0, lineHeight: 1.6 }}>
          An AI agent doesn&apos;t just respond — it observes, reasons, selects tools, and acts across
          multiple steps. Select a task to trace the full agent execution loop.
        </p>
      </div>

      {/* Task selection */}
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
          Select Agent Task
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {AGENT_TASKS.map((task) => {
            const isSelected = selectedTask.id === task.id;
            return (
              <button
                key={task.id}
                onClick={() => {
                  setSelectedTask(task);
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
                {task.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* User request display */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          background: "#F7F8FA",
          border: "1px solid #E2E5E9",
          borderRadius: "10px",
        }}
      >
        <span
          style={{
            fontSize: "10.5px",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
            color: "#8A919C",
            whiteSpace: "nowrap" as const,
          }}
        >
          User →
        </span>
        <span
          style={{
            fontSize: "13.5px",
            color: "#111318",
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 500,
          }}
        >
          &ldquo;{selectedTask.userRequest}&rdquo;
        </span>
      </div>

      {/* Run button */}
      {visibleSteps === 0 && (
        <button
          onClick={prefersReduced ? () => { setVisibleSteps(selectedTask.steps.length); } : handleRun}
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
            transition: "all 0.2s ease",
          }}
          aria-label="Run agent"
        >
          Run Agent →
        </button>
      )}

      {/* Execution steps */}
      {visibleSteps > 0 && (
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E5E9",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.07em",
                textTransform: "uppercase" as const,
                color: running ? "#2563EB" : isComplete ? "#16A34A" : "#8A919C",
              }}
            >
              {running ? "● Agent Executing" : isComplete ? "✓ Execution Complete" : "Agent"}
            </span>
            <SimulationBadge />
          </div>

          {selectedTask.steps.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              visible={i < visibleSteps}
              isLast={i === selectedTask.steps.length - 1}
            />
          ))}
        </div>
      )}

      {/* Complete */}
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

"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { LLM_SCENARIOS, LLM_PIPELINE_STAGES, LLMScenario } from "@/data/playgroundData";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

type Stage = "idle" | "running" | "complete";

// ─── Pipeline Node ─────────────────────────────────────────────────────────────
function PipelineNode({
  label,
  sublabel,
  state,
}: {
  label: string;
  sublabel: string;
  state: "idle" | "active" | "complete";
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "120px",
          padding: "10px 8px",
          borderRadius: "10px",
          border: `1.5px solid ${
            state === "active"
              ? "#2563EB"
              : state === "complete"
              ? "#16A34A"
              : "#E2E5E9"
          }`,
          background:
            state === "active"
              ? "rgba(37,99,235,0.07)"
              : state === "complete"
              ? "rgba(22,163,74,0.05)"
              : "#FFFFFF",
          transition: "all 0.3s ease",
          boxShadow:
            state === "active"
              ? "0 4px 14px rgba(37,99,235,0.12)"
              : state === "complete"
              ? "0 2px 8px rgba(22,163,74,0.08)"
              : "0 1px 3px rgba(17,19,24,0.03)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontWeight: 800,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.07em",
            color:
              state === "active"
                ? "#2563EB"
                : state === "complete"
                ? "#16A34A"
                : "#8A919C",
            marginBottom: "4px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "9.5px",
            color: "#8A919C",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {sublabel}
        </div>
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background:
              state === "active"
                ? "#2563EB"
                : state === "complete"
                ? "#16A34A"
                : "#CBD2D9",
            margin: "6px auto 0",
            boxShadow:
              state === "active"
                ? "0 0 8px rgba(37,99,235,0.6)"
                : "none",
            transition: "all 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

// ─── Connector ─────────────────────────────────────────────────────────────────
function Connector({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        padding: "0 2px",
        paddingBottom: "16px",
      }}
    >
      <div
        style={{
          height: "1.5px",
          width: "20px",
          background: active ? "#2563EB" : "#E2E5E9",
          transition: "background 0.3s ease",
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
          flexShrink: 0,
        }}
      />
      <div
        style={{
          height: "1.5px",
          width: "20px",
          background: active ? "#2563EB" : "#E2E5E9",
          transition: "background 0.3s ease",
        }}
      />
    </div>
  );
}

// ─── SimulationBadge ──────────────────────────────────────────────────────────
function SimulationBadge() {
  return (
    <div
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
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#CBD2D9",
          display: "inline-block",
        }}
      />
      Simulated Demonstration
    </div>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        border: "1px solid #E2E5E9",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
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
            textTransform: "uppercase",
            color: "#5F6672",
          }}
        >
          How it works
        </span>
        {open ? <ChevronUp size={14} color="#5F6672" /> : <ChevronDown size={14} color="#5F6672" />}
      </button>
      {open && (
        <div style={{ padding: "16px", background: "#FFFFFF", borderTop: "1px solid #E2E5E9" }}>
          {[
            "1. The user's prompt is tokenized — split into sub-word units the model understands.",
            "2. Each token is converted to a high-dimensional embedding vector.",
            "3. The transformer attends across all token vectors to build contextual representations.",
            "4. The output layer samples the next token probability distribution, selecting the highest-probability token.",
            "5. This repeats until a stop condition is reached, producing the response.",
            "In a real system, temperature and top-p settings control the randomness of sampling.",
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LLMPlayground() {
  const [selectedScenario, setSelectedScenario] = useState<LLMScenario>(LLM_SCENARIOS[0]);
  const [customPrompt, setCustomPrompt] = useState(LLM_SCENARIOS[0].prompt);
  const [stage, setStage] = useState<Stage>("idle");
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearTimers = () => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  };

  const handleProcess = useCallback(() => {
    clearTimers();
    setStage("running");
    setActiveStageIndex(0);
    setShowResult(false);

    LLM_PIPELINE_STAGES.forEach((_, i) => {
      const t = setTimeout(
        () => {
          setActiveStageIndex(i);
          if (i === LLM_PIPELINE_STAGES.length - 1) {
            const t2 = setTimeout(() => {
              setShowResult(true);
              setStage("complete");
            }, 400);
            timerRefs.current.push(t2);
          }
        },
        i * 350
      );
      timerRefs.current.push(t);
    });
  }, []);

  const handleReset = () => {
    clearTimers();
    setStage("idle");
    setActiveStageIndex(-1);
    setShowResult(false);
  };

  // Find best matching scenario for the current prompt
  const matchingScenario =
    LLM_SCENARIOS.find((s) => s.prompt === customPrompt) ?? selectedScenario;

  // Reduced motion: skip animation
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    return () => clearTimers();
  }, []);

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
            textTransform: "uppercase",
            color: "#2563EB",
            marginBottom: "6px",
          }}
        >
          MODULE 01 · PROMPT → LLM
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
          How an LLM Processes Your Prompt
        </h3>
        <p style={{ fontSize: "13.5px", color: "#5F6672", margin: 0, lineHeight: 1.6 }}>
          Enter a prompt and watch each stage of the LLM pipeline activate — from tokenization through
          transformer inference to the final decoded response.
        </p>
      </div>

      {/* Scenario presets */}
      <div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#8A919C",
            marginBottom: "8px",
          }}
        >
          Quick Examples
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {LLM_SCENARIOS.map((s) => (
            <button
              key={s.prompt}
              onClick={() => {
                setSelectedScenario(s);
                setCustomPrompt(s.prompt);
                handleReset();
              }}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                border: `1px solid ${customPrompt === s.prompt ? "#2563EB" : "#E2E5E9"}`,
                background: customPrompt === s.prompt ? "rgba(37,99,235,0.06)" : "#FFFFFF",
                color: customPrompt === s.prompt ? "#2563EB" : "#5F6672",
                fontSize: "11.5px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
                fontFamily: "var(--font-display), sans-serif",
              }}
            >
              {s.prompt.length > 40 ? s.prompt.slice(0, 37) + "..." : s.prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <label
          htmlFor="llm-prompt-input"
          style={{
            display: "block",
            fontSize: "10.5px",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#5F6672",
            marginBottom: "8px",
          }}
        >
          Prompt Input
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            id="llm-prompt-input"
            ref={inputRef}
            type="text"
            value={customPrompt}
            onChange={(e) => {
              setCustomPrompt(e.target.value);
              handleReset();
            }}
            placeholder="Enter a prompt..."
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1.5px solid #E2E5E9",
              background: "#F7F8FA",
              color: "#111318",
              fontSize: "13px",
              fontFamily: "ui-monospace, monospace",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
            onBlur={(e) => (e.target.style.borderColor = "#E2E5E9")}
            aria-label="Prompt input"
          />
          {stage !== "idle" ? (
            <button
              onClick={handleReset}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: "1.5px solid #E2E5E9",
                background: "#FFFFFF",
                color: "#5F6672",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-display), sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              Reset
            </button>
          ) : (
            <button
              onClick={prefersReduced ? () => { setStage("complete"); setActiveStageIndex(LLM_PIPELINE_STAGES.length - 1); setShowResult(true); } : handleProcess}
              disabled={!customPrompt.trim()}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                background: "#2563EB",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 700,
                cursor: customPrompt.trim() ? "pointer" : "not-allowed",
                opacity: customPrompt.trim() ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-display), sans-serif",
              }}
              aria-label="Process prompt"
            >
              Process <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Pipeline Visualization */}
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
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "#8A919C",
            }}
          >
            Processing Pipeline
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background:
                  stage === "complete"
                    ? "#16A34A"
                    : stage === "running"
                    ? "#2563EB"
                    : "#CBD2D9",
                boxShadow:
                  stage === "running"
                    ? "0 0 8px rgba(37,99,235,0.5)"
                    : "none",
                animation:
                  stage === "running" ? "playground-pulse 1s ease-in-out infinite" : "none",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.06em",
                color:
                  stage === "complete"
                    ? "#16A34A"
                    : stage === "running"
                    ? "#2563EB"
                    : "#8A919C",
              }}
            >
              {stage === "complete" ? "COMPLETE" : stage === "running" ? "PROCESSING" : "READY"}
            </span>
          </div>
        </div>

        {/* Nodes */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            overflowX: "auto",
            gap: "0",
            paddingBottom: "4px",
          }}
        >
          {LLM_PIPELINE_STAGES.map((s, i) => {
            const nodeState =
              activeStageIndex > i
                ? "complete"
                : activeStageIndex === i
                ? "active"
                : "idle";
            return (
              <React.Fragment key={s.id}>
                <PipelineNode label={s.label} sublabel={s.sublabel} state={nodeState} />
                {i < LLM_PIPELINE_STAGES.length - 1 && (
                  <Connector active={activeStageIndex > i} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Response Output */}
      {(showResult || (stage === "running" && !showResult)) && (
        <div
          style={{
            background: showResult ? "#FFFFFF" : "#F7F8FA",
            border: `1.5px solid ${showResult ? "#16A34A" : "#E2E5E9"}`,
            borderRadius: "12px",
            padding: "20px",
            transition: "all 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: showResult ? "#16A34A" : "#5F6672",
              }}
            >
              {showResult ? "✓ Response Generated" : "● Generating..."}
            </span>
            <SimulationBadge />
          </div>
          {showResult ? (
            <p
              style={{
                fontSize: "14px",
                color: "#111318",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {matchingScenario.response}
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#2563EB",
                    animation: `playground-bounce 0.9s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
              <span
                style={{
                  fontSize: "12px",
                  color: "#8A919C",
                  marginLeft: "8px",
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                Sampling tokens...
              </span>
            </div>
          )}
        </div>
      )}

      {/* Complete badge */}
      {stage === "complete" && (
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

      {/* How it works */}
      <HowItWorks open={howItWorksOpen} onToggle={() => setHowItWorksOpen((v) => !v)} />
    </div>
  );
}

"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  RAG_DOCUMENTS,
  RAG_QUESTIONS,
  RAG_PIPELINE_STAGES,
  RAGDocument,
  RAGQuestion,
} from "@/data/playgroundData";
import { ChevronDown, ChevronUp } from "lucide-react";

type RagStage =
  | "idle"
  | "chunking"
  | "embedding"
  | "search"
  | "context"
  | "llm"
  | "answer"
  | "complete";

const STAGE_ORDER: RagStage[] = [
  "chunking",
  "embedding",
  "search",
  "context",
  "llm",
  "answer",
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

function PipelineStep({
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
        alignItems: "center",
        gap: "10px",
        padding: "8px 12px",
        borderRadius: "8px",
        border: `1.5px solid ${
          state === "active" ? "#2563EB" : state === "complete" ? "#16A34A" : "#E2E5E9"
        }`,
        background:
          state === "active"
            ? "rgba(37,99,235,0.06)"
            : state === "complete"
            ? "rgba(22,163,74,0.04)"
            : "#FFFFFF",
        transition: "all 0.3s ease",
        marginBottom: "6px",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background:
            state === "active" ? "#2563EB" : state === "complete" ? "#16A34A" : "#CBD2D9",
          flexShrink: 0,
          boxShadow: state === "active" ? "0 0 8px rgba(37,99,235,0.5)" : "none",
          animation: state === "active" ? "playground-pulse 1s ease-in-out infinite" : "none",
          transition: "all 0.3s ease",
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "10.5px",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
            color:
              state === "active" ? "#2563EB" : state === "complete" ? "#16A34A" : "#8A919C",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "#8A919C",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {sublabel}
        </div>
      </div>
      {state === "complete" && (
        <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 700 }}>✓</span>
      )}
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
          How RAG works
        </span>
        {open ? <ChevronUp size={14} color="#5F6672" /> : <ChevronDown size={14} color="#5F6672" />}
      </button>
      {open && (
        <div style={{ padding: "16px", background: "#FFFFFF", borderTop: "1px solid #E2E5E9" }}>
          {[
            "1. Documents are split into small overlapping passages called chunks.",
            "2. Each chunk is converted into a vector embedding that encodes its meaning numerically.",
            "3. The user's query is also embedded into the same vector space.",
            "4. Vector similarity search finds the chunks closest in meaning to the query.",
            "5. The top-k relevant chunks are injected into the LLM's context window.",
            "6. The LLM generates a response grounded in the retrieved context — not just its training data.",
            "In production: real embeddings (e.g. OpenAI text-embedding-3) and a vector DB like pgvector or Pinecone replace the simulated vectors here.",
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

export default function RAGPlayground() {
  const [selectedDoc, setSelectedDoc] = useState<RAGDocument>(RAG_DOCUMENTS[0]);
  const [selectedQuestion, setSelectedQuestion] = useState<RAGQuestion>(RAG_QUESTIONS[0]);
  const [currentStage, setCurrentStage] = useState<RagStage>("idle");
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const handleSearch = useCallback(() => {
    clearTimers();
    STAGE_ORDER.forEach((stage, i) => {
      const t = setTimeout(() => {
        setCurrentStage(stage);
      }, i * 600);
      timers.current.push(t);
    });
  }, []);

  const handleReset = () => {
    clearTimers();
    setCurrentStage("idle");
  };

  useEffect(() => () => clearTimers(), []);

  const stageIndex = STAGE_ORDER.indexOf(currentStage);
  const isComplete = currentStage === "complete";

  const relevantChunks = selectedDoc.chunks.filter((c) =>
    selectedQuestion.relevantChunkIds.includes(c.id)
  );

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const runInstant = () => {
    setCurrentStage("complete");
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
          MODULE 02 · RAG PIPELINE
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
          Retrieval-Augmented Generation
        </h3>
        <p style={{ fontSize: "13.5px", color: "#5F6672", margin: 0, lineHeight: 1.6 }}>
          RAG gives an LLM access to external knowledge by retrieving relevant document chunks before
          generating a response. Select a knowledge base and a question to see the full pipeline.
        </p>
      </div>

      {/* Main two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 220px",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {/* Left: interactive area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Step 1: Select Document */}
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
              1 · Knowledge Base Documents
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
              {RAG_DOCUMENTS.map((doc) => {
                const isSelected = selectedDoc.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedDoc(doc);
                      handleReset();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "9px",
                      border: `1.5px solid ${isSelected ? "#2563EB" : "#E2E5E9"}`,
                      background: isSelected ? "rgba(37,99,235,0.05)" : "#FFFFFF",
                      cursor: "pointer",
                      textAlign: "left" as const,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span style={{ fontSize: "20px", flexShrink: 0 }}>{doc.icon}</span>
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: isSelected ? "#2563EB" : "#111318",
                          fontFamily: "var(--font-display), sans-serif",
                          lineHeight: 1.2,
                        }}
                      >
                        {doc.title}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#8A919C",
                          fontFamily: "ui-monospace, monospace",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {doc.category} · {doc.chunks.length} chunks
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Query */}
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
              2 · User Query
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {RAG_QUESTIONS.slice(0, 4).map((q) => {
                const isSelected = selectedQuestion.id === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedQuestion(q);
                      handleReset();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      border: `1.5px solid ${isSelected ? "#2563EB" : "#E2E5E9"}`,
                      background: isSelected ? "rgba(37,99,235,0.05)" : "#FFFFFF",
                      cursor: "pointer",
                      textAlign: "left" as const,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: isSelected ? "#2563EB" : "#CBD2D9",
                        flexShrink: 0,
                        transition: "background 0.2s ease",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? "#2563EB" : "#5F6672",
                        fontFamily: "var(--font-display), sans-serif",
                      }}
                    >
                      &ldquo;{q.text}&rdquo;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action button */}
          <div style={{ display: "flex", gap: "10px" }}>
            {currentStage === "idle" ? (
              <button
                onClick={prefersReduced ? runInstant : handleSearch}
                style={{
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
                aria-label="Run RAG pipeline"
              >
                Run RAG Pipeline →
              </button>
            ) : (
              <button
                onClick={handleReset}
                style={{
                  padding: "11px 24px",
                  borderRadius: "8px",
                  border: "1.5px solid #E2E5E9",
                  background: "#FFFFFF",
                  color: "#5F6672",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "var(--font-display), sans-serif",
                }}
                aria-label="Reset pipeline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Chunks Visualization */}
          {stageIndex >= 0 && (
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E5E9",
                borderRadius: "10px",
                padding: "16px",
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
                {stageIndex >= STAGE_ORDER.indexOf("embedding")
                  ? "Chunks → Simulated Vectors"
                  : "Document Chunks"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {selectedDoc.chunks.map((chunk) => {
                  const isRelevant = relevantChunks.some((r) => r.id === chunk.id);
                  const showHighlight =
                    stageIndex >= STAGE_ORDER.indexOf("search") && isRelevant;
                  const showVectors = stageIndex >= STAGE_ORDER.indexOf("embedding");

                  return (
                    <div
                      key={chunk.id}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: `1.5px solid ${showHighlight ? "#2563EB" : "#E2E5E9"}`,
                        background: showHighlight ? "rgba(37,99,235,0.04)" : "#F7F8FA",
                        transition: "all 0.4s ease",
                        boxShadow: showHighlight
                          ? "0 2px 10px rgba(37,99,235,0.1)"
                          : "none",
                      }}
                    >
                      {showHighlight && (
                        <div
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            fontFamily: "ui-monospace, monospace",
                            letterSpacing: "0.08em",
                            color: "#2563EB",
                            marginBottom: "4px",
                            textTransform: "uppercase" as const,
                          }}
                        >
                          ↑ HIGH RELEVANCE
                        </div>
                      )}
                      <p
                        style={{
                          fontSize: "11.5px",
                          color: "#5F6672",
                          margin: "0 0 6px",
                          lineHeight: 1.5,
                        }}
                      >
                        {chunk.text}
                      </p>
                      {showVectors && (
                        <code
                          style={{
                            fontSize: "10px",
                            fontFamily: "ui-monospace, monospace",
                            color: showHighlight ? "#2563EB" : "#8A919C",
                            background: "transparent",
                          }}
                        >
                          {chunk.vector}{" "}
                          <em style={{ fontStyle: "italic", color: "#CBD2D9" }}>
                            simulated
                          </em>
                        </code>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Answer */}
          {isComplete && (
            <div
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #16A34A",
                borderRadius: "10px",
                padding: "18px",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    fontFamily: "ui-monospace, monospace",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase" as const,
                    color: "#16A34A",
                  }}
                >
                  ✓ Answer Generated
                </span>
                <SimulationBadge />
              </div>
              <p
                style={{ fontSize: "14px", color: "#111318", margin: 0, lineHeight: 1.7 }}
              >
                {selectedQuestion.answer}
              </p>
            </div>
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
        </div>

        {/* Right: Pipeline tracker */}
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
            Pipeline
          </div>
          {RAG_PIPELINE_STAGES.map((stage, i) => {
            const stageState =
              stageIndex > i
                ? "complete"
                : stageIndex === i
                ? "active"
                : "idle";
            return (
              <PipelineStep
                key={stage.id}
                label={stage.label}
                sublabel={stage.sublabel}
                state={stageState}
              />
            );
          })}
        </div>
      </div>

      {/* How it works */}
      <HowItWorks open={howItWorksOpen} onToggle={() => setHowItWorksOpen((v) => !v)} />
    </div>
  );
}

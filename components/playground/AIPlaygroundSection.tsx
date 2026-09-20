"use client";

import React, { useState, lazy, Suspense } from "react";
import { Terminal } from "lucide-react";
import PlaygroundSelector, { PlaygroundModuleId } from "./PlaygroundSelector";

const LLMPlayground = lazy(() => import("./LLMPlayground"));
const RAGPlayground = lazy(() => import("./RAGPlayground"));
const AgentPlayground = lazy(() => import("./AgentPlayground"));
const ToolCallingPlayground = lazy(() => import("./ToolCallingPlayground"));

function ModuleFallback() {
  return (
    <div
      style={{
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#8A919C",
        fontFamily: "ui-monospace, monospace",
        fontSize: "12px",
        letterSpacing: "0.06em",
      }}
      aria-live="polite"
      aria-label="Loading module"
    >
      LOADING MODULE...
    </div>
  );
}

function VoiceAIComingSoon() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "10.5px",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#8A919C",
            marginBottom: "6px",
          }}
        >
          MODULE 05 · VOICE AI
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
          Voice AI Architecture
        </h3>
        <p style={{ fontSize: "13.5px", color: "#5F6672", margin: 0, lineHeight: 1.6 }}>
          A visual walkthrough of the speech processing pipeline: from audio input through
          speech-to-text, LLM reasoning, and text-to-speech output.
        </p>
      </div>

      {/* Architecture diagram — static */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E5E9",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        {[
          { icon: "🎤", label: "Voice Input", sublabel: "Raw audio stream", color: "#0ea5e9" },
          { icon: "📝", label: "Speech-to-Text", sublabel: "Whisper / STT model", color: "#8b5cf6" },
          { icon: "🧠", label: "LLM", sublabel: "Intent & reasoning", color: "#2563EB" },
          { icon: "🔊", label: "Text-to-Speech", sublabel: "TTS synthesis", color: "#10b981" },
          { icon: "💬", label: "Voice Output", sublabel: "Audio response", color: "#f59e0b" },
        ].map((node, i, arr) => (
          <React.Fragment key={node.label}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid #E2E5E9",
                background: "#F7F8FA",
              }}
            >
              <span style={{ fontSize: "22px", flexShrink: 0 }}>{node.icon}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#111318",
                    fontFamily: "var(--font-display), sans-serif",
                    marginBottom: "2px",
                  }}
                >
                  {node.label}
                </div>
                <div
                  style={{
                    fontSize: "10.5px",
                    fontFamily: "ui-monospace, monospace",
                    color: "#8A919C",
                  }}
                >
                  {node.sublabel}
                </div>
              </div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: node.color,
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
            </div>
            {i < arr.length - 1 && (
              <div
                aria-hidden="true"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20px",
                  color: "#CBD2D9",
                  fontSize: "16px",
                }}
              >
                ↓
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          padding: "16px",
          background: "#F7F8FA",
          border: "1px solid #E2E5E9",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontSize: "10.5px",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.06em",
            color: "#5F6672",
          }}
        >
          Interactive demo coming in the next phase. The architecture shown above is based on
          real voice AI systems using Whisper (STT) and a TTS synthesis pipeline.
        </span>
      </div>
    </div>
  );
}

export default function AIPlaygroundSection() {
  const [activeModule, setActiveModule] = useState<PlaygroundModuleId>("llm");

  const renderModule = () => {
    switch (activeModule) {
      case "llm":
        return (
          <Suspense fallback={<ModuleFallback />}>
            <LLMPlayground />
          </Suspense>
        );
      case "rag":
        return (
          <Suspense fallback={<ModuleFallback />}>
            <RAGPlayground />
          </Suspense>
        );
      case "agent":
        return (
          <Suspense fallback={<ModuleFallback />}>
            <AgentPlayground />
          </Suspense>
        );
      case "tools":
        return (
          <Suspense fallback={<ModuleFallback />}>
            <ToolCallingPlayground />
          </Suspense>
        );
      case "voice":
        return <VoiceAIComingSoon />;
      default:
        return null;
    }
  };

  return (
    <section
      id="playground"
      style={{
        padding: "120px 24px",
        backgroundColor: "#F7F8FA",
        color: "#111318",
        borderTop: "1px solid #E2E5E9",
        borderBottom: "1px solid #E2E5E9",
        fontFamily: "var(--font-inter), Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="AI Systems Playground"
    >
      {/* Subtle dot grid background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#D1D5DB 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <div style={{ maxWidth: "780px", marginBottom: "52px" }}>
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
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#2563EB",
              }}
            />
            <Terminal size={13} />
            SYSTEM / 06 · INTERACTIVE INTELLIGENCE LAB
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
            AI Playground
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.65,
              color: "#5F6672",
              margin: 0,
            }}
          >
            Explore how the systems behind modern AI applications actually work. Each module is an
            interactive simulation — not a live AI call, but an honest demonstration of the
            underlying architecture.
          </p>
        </div>

        {/* Module Selector */}
        <PlaygroundSelector active={activeModule} onChange={setActiveModule} />

        {/* Active Module Panel */}
        <div
          key={activeModule}
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E5E9",
            borderRadius: "18px",
            padding: "36px 32px",
            boxShadow:
              "0 1px 3px rgba(17,19,24,0.02), 0 8px 24px rgba(17,19,24,0.04)",
            animation: "playground-fadein 0.25s ease",
          }}
        >
          {renderModule()}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKFLOW_PIPELINE, WorkflowStep } from "@/data/workflow";
import {
  AlertCircle,
  Database,
  Brain,
  Search,
  Bot,
  Wrench,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STAGE_ICONS: Record<string, React.ElementType> = {
  "business-problem":    AlertCircle,
  "data-ingestion":      Database,
  "ai-llm":              Brain,
  "rag-retrieval":       Search,
  "agent-orchestration": Bot,
  "tool-calling":        Wrench,
  "automation-engine":   Zap,
  "business-result":     CheckCircle2,
};

const STAGE_ACCENT: Record<string, string> = {
  "business-problem":    "#10b981",
  "data-ingestion":      "#0ea5e9",
  "ai-llm":              "#8b5cf6",
  "rag-retrieval":       "#f59e0b",
  "agent-orchestration": "#ec4899",
  "tool-calling":        "#14b8a6",
  "automation-engine":   "#6366f1",
  "business-result":     "#10b981",
};

/* ─── Detail Panel ────────────────────────────────────────────────────────── */
function DetailPanel({ step, accent }: { step: WorkflowStep; accent: string }) {
  const Icon = STAGE_ICONS[step.id] ?? Brain;

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: `1.5px solid ${accent}30`,
        borderLeft: `4px solid ${accent}`,
        borderRadius: "18px",
        padding: "36px 32px",
        boxShadow: `0 8px 32px -4px ${accent}18, 0 2px 8px rgba(17,19,24,0.04)`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: `${accent}15`,
            border: `1.5px solid ${accent}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={22} color={accent} strokeWidth={1.8} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "10.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: accent,
              fontFamily: "ui-monospace, monospace",
              marginBottom: "6px",
            }}
          >
            NODE / {step.stepNumber} · {step.stage}
          </div>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#111318",
              margin: 0,
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              fontFamily: "var(--font-display), sans-serif",
            }}
          >
            {step.title}
          </h3>
          <p style={{ fontSize: "13px", color: "#5F6672", margin: "6px 0 0", lineHeight: 1.5 }}>
            {step.tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "14.5px",
          lineHeight: 1.7,
          color: "#5F6672",
          margin: 0,
          borderTop: "1px solid #E2E5E9",
          paddingTop: "20px",
        }}
      >
        {step.description}
      </p>

      {/* Transformation */}
      <div
        style={{
          background: "#F7F8FA",
          border: "1px solid #E2E5E9",
          borderLeft: `3px solid ${accent}`,
          borderRadius: "10px",
          padding: "14px 16px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#8A919C",
            fontFamily: "ui-monospace, monospace",
            display: "block",
            marginBottom: "6px",
          }}
        >
          TRANSFORMATION
        </span>
        <p style={{ fontSize: "13px", color: "#111318", margin: 0, lineHeight: 1.55 }}>
          {step.action}
        </p>
      </div>

      {/* I/O */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[
          { label: "INPUT", items: step.inputs, color: "#5F6672" },
          { label: "OUTPUT", items: step.outputs, color: accent },
        ].map(({ label, items, color }) => (
          <div key={label}>
            <span
              style={{
                fontSize: "9.5px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#8A919C",
                fontFamily: "ui-monospace, monospace",
                display: "block",
                marginBottom: "8px",
              }}
            >
              {label}
            </span>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
              {items.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "12.5px",
                    color,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: label === "OUTPUT" ? 600 : 400,
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: color,
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tech Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
        {step.tech.map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: "6px",
              background: `${accent}10`,
              color: accent,
              border: `1px solid ${accent}25`,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Compact Step Pill ───────────────────────────────────────────────────── */
function StepPill({
  step,
  index,
  isActive,
  isCompleted,
  onClick,
}: {
  step: WorkflowStep;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}) {
  const Icon = STAGE_ICONS[step.id] ?? Brain;
  const accent = STAGE_ACCENT[step.id];

  return (
    <div
      className="workflow-pill"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 18px",
        borderRadius: "12px",
        border: `1.5px solid ${isActive ? accent + "50" : isCompleted ? "#E2E5E9" : "#E2E5E9"}`,
        background: isActive ? `${accent}08` : "#FFFFFF",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: isActive
          ? `0 4px 16px -2px ${accent}20`
          : "0 1px 3px rgba(17,19,24,0.03)",
        position: "relative",
        opacity: !isActive && !isCompleted ? 0.55 : 1,
      }}
    >
      {/* Connector line */}
      {index < WORKFLOW_PIPELINE.length - 1 && (
        <div
          style={{
            position: "absolute",
            left: "30px",
            bottom: "-14px",
            width: "2px",
            height: "14px",
            background: isCompleted ? accent : "#E2E5E9",
            transition: "background 0.4s ease",
            zIndex: 1,
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "9px",
          background: isActive || isCompleted ? `${accent}15` : "#F1F3F5",
          border: `1px solid ${isActive || isCompleted ? accent + "30" : "#E2E5E9"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.3s ease",
        }}
      >
        <Icon
          size={15}
          color={isActive || isCompleted ? accent : "#8A919C"}
          strokeWidth={isActive ? 2.2 : 1.8}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: isActive ? "#111318" : isCompleted ? "#5F6672" : "#8A919C",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "var(--font-display), sans-serif",
          }}
        >
          {step.title}
        </div>
        <div
          style={{
            fontSize: "10.5px",
            color: isActive ? accent : "#8A919C",
            fontFamily: "ui-monospace, monospace",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {step.stage}
        </div>
      </div>

      {/* Status dot */}
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: isCompleted ? "#16A34A" : isActive ? accent : "#E2E5E9",
          boxShadow: isActive ? `0 0 8px ${accent}80` : "none",
          transition: "all 0.3s ease",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

/* ─── Progress Bar ────────────────────────────────────────────────────────── */
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      style={{
        height: "3px",
        background: "#E2E5E9",
        borderRadius: "999px",
        overflow: "hidden",
        marginBottom: "32px",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #2563EB, #8b5cf6)",
          borderRadius: "999px",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
}

/* ─── Main Diagram ────────────────────────────────────────────────────────── */
export default function WorkflowDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const activeStep = WORKFLOW_PIPELINE[activeIndex];
  const accent = STAGE_ACCENT[activeStep.id];
  const progress = activeIndex / (WORKFLOW_PIPELINE.length - 1);

  /* Mobile detection */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* GSAP ScrollTrigger pinned scroll-driven activation */
  useEffect(() => {
    if (isMobile) return; // mobile: show static grid

    const ctx = gsap.context(() => {
      const totalSteps = WORKFLOW_PIPELINE.length;
      // Each step gets 1 scroll "page" of space; we add 1 extra at the end to let the section unpin cleanly
      const scrollDistance = window.innerHeight * (totalSteps + 0.5);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: pinRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 0.6,
        onUpdate: (self) => {
          const newIndex = Math.min(
            Math.floor(self.progress * totalSteps),
            totalSteps - 1
          );
          setActiveIndex(newIndex);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  /* Mobile: simple interactive grid */
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {WORKFLOW_PIPELINE.map((step, idx) => {
          const Icon = STAGE_ICONS[step.id] ?? Brain;
          const acc = STAGE_ACCENT[step.id];
          return (
            <div
              key={step.id}
              onClick={() => setActiveIndex(activeIndex === idx ? -1 : idx)}
              style={{
                background: "#FFFFFF",
                border: `1.5px solid ${activeIndex === idx ? acc + "50" : "#E2E5E9"}`,
                borderLeft: `4px solid ${acc}`,
                borderRadius: "14px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: activeIndex === idx ? `0 4px 20px ${acc}18` : "0 1px 4px rgba(17,19,24,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: `${acc}15`, border: `1px solid ${acc}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} color={acc} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: acc, fontFamily: "ui-monospace, monospace" }}>{step.stage}</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#111318", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.015em" }}>{step.title}</div>
                </div>
              </div>
              {activeIndex === idx && (
                <p style={{ fontSize: "13.5px", color: "#5F6672", margin: 0, lineHeight: 1.65 }}>{step.description}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  /* Desktop: GSAP pinned scroll experience */
  return (
    <div ref={sectionRef} style={{ position: "relative" }}>
      {/* This is the pinned viewport that GSAP controls */}
      <div
        ref={pinRef}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "40px",
          alignItems: "start",
          minHeight: "100vh",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        {/* LEFT: Detail Panel */}
        <div style={{ position: "sticky", top: "120px" }}>
          {/* Progress */}
          <ProgressBar progress={progress} />

          {/* Step counter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                fontFamily: "ui-monospace, monospace",
                color: accent,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              STAGE {String(activeIndex + 1).padStart(2, "0")} / {WORKFLOW_PIPELINE.length.toString().padStart(2, "0")}
            </span>
            <ArrowRight size={13} color={accent} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#8A919C",
                fontFamily: "ui-monospace, monospace",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Scroll to advance
            </span>
          </div>

          <DetailPanel step={activeStep} accent={accent} />
        </div>

        {/* RIGHT: Step pills stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            position: "sticky",
            top: "120px",
            paddingBottom: "24px",
          }}
        >
          {WORKFLOW_PIPELINE.map((step, idx) => (
            <StepPill
              key={step.id}
              step={step}
              index={idx}
              isActive={idx === activeIndex}
              isCompleted={idx < activeIndex}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

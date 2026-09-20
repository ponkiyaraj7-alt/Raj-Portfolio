import React from "react";
import { Workflow, ArrowRight } from "lucide-react";

export default function WorkflowIntro() {
  return (
    <div style={{ maxWidth: "840px", margin: "0 auto 48px auto", textAlign: "center" }}>
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
        <Workflow size={13} />
        SYSTEM / 02 • SIGNATURE WORKFLOW
      </div>

      <h2
        style={{
          fontSize: "clamp(30px, 4vw, 44px)",
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          color: "#111318",
          fontFamily: "var(--font-display), sans-serif",
          margin: "0 0 16px 0",
        }}
      >
        What happens when a business problem enters my system?
      </h2>

      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.65,
          color: "#5F6672",
          margin: "0 auto",
          maxWidth: "660px",
        }}
      >
        I treat AI not as a novelty chatbot, but as an operational engine. Every engagement follows a systematic,
        reproducible pipeline that translates ambiguous real-world friction into deterministic, self-executing automation.
      </p>

      {/* Pipeline Progression Ribbon */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginTop: "26px",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#5F6672",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        <span>Problem</span>
        <ArrowRight size={11} color="#8A919C" />
        <span>Data</span>
        <ArrowRight size={11} color="#8A919C" />
        <span>AI / LLM</span>
        <ArrowRight size={11} color="#8A919C" />
        <span>Reasoning</span>
        <ArrowRight size={11} color="#8A919C" />
        <span style={{ color: "#2563EB", fontWeight: 800 }}>Agent</span>
        <ArrowRight size={11} color="#8A919C" />
        <span>Tools</span>
        <ArrowRight size={11} color="#8A919C" />
        <span>Automation</span>
        <ArrowRight size={11} color="#8A919C" />
        <span style={{ color: "#16A34A", fontWeight: 800 }}>Result</span>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import WorkflowIntro from "./WorkflowIntro";
import WorkflowDiagram from "./WorkflowDiagram";

export default function AIWorkflowSection() {
  return (
    <section
      id="system"
      style={{
        backgroundColor: "#F7F8FA",
        borderTop: "1px solid #E2E5E9",
        borderBottom: "1px solid #E2E5E9",
        fontFamily: "var(--font-inter), Inter, sans-serif",
        position: "relative",
        /* Enough natural height for GSAP to pin; the ScrollTrigger adds extra scroll space */
        paddingBottom: "80px",
      }}
      aria-label="AI System Workflow Architecture"
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "120px 24px 0" }}>
        <WorkflowIntro />
        <WorkflowDiagram />
      </div>
    </section>
  );
}

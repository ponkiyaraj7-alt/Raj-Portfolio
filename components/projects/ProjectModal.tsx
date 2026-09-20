"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitBranch,
  AlertCircle,
  Lightbulb,
  Bot,
  Zap,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { CaseStudyProject } from "./projectData";
import ProjectArchDiagram from "./ProjectArchDiagram";

interface ProjectModalProps {
  project: CaseStudyProject;
  allProjects: CaseStudyProject[];
  onClose: () => void;
  onNavigate: (project: CaseStudyProject) => void;
}

/* ── Section wrapper ──────────────────────────────────────────────────────── */
function ModalSection({
  icon: Icon,
  label,
  children,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
      style={{
        paddingTop: "36px",
        borderTop: "1px solid #E2E5E9",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <Icon size={14} color={accent ?? "#2563EB"} strokeWidth={2.2} />
        <span
          style={{
            fontSize: "10px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: accent ?? "#2563EB",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ── Tech Stack grouped display ───────────────────────────────────────────── */
function TechStackGrid({
  techStack,
  accent,
}: {
  techStack: CaseStudyProject["techStack"];
  accent: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "16px",
      }}
    >
      {techStack.map((group) => (
        <div key={group.label}>
          <div
            style={{
              fontSize: "9.5px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#8A919C",
              fontFamily: "ui-monospace, monospace",
              marginBottom: "10px",
            }}
          >
            {group.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {group.items.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "5px 10px",
                  borderRadius: "6px",
                  background: `${accent}10`,
                  color: accent,
                  border: `1px solid ${accent}25`,
                  fontFamily: "ui-monospace, monospace",
                  display: "inline-block",
                  width: "fit-content",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Modal ───────────────────────────────────────────────────────────── */
export default function ProjectModal({
  project,
  allProjects,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  const currentIdx = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIdx > 0 ? allProjects[currentIdx - 1] : null;
  const nextProject =
    currentIdx < allProjects.length - 1 ? allProjects[currentIdx + 1] : null;

  const accent = project.color;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && prevProject) onNavigate(prevProject);
      if (e.key === "ArrowRight" && nextProject) onNavigate(nextProject);
    },
    [onClose, prevProject, nextProject, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const hasLive = project.liveUrl && project.liveUrl !== "#";
  const hasGithub = project.githubUrl && project.githubUrl !== "#";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(17, 19, 24, 0.55)",
          backdropFilter: "blur(6px)",
          zIndex: 1000,
        }}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Case study: ${project.name}`}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(92vw, 900px)",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#FFFFFF",
          borderRadius: "20px",
          boxShadow:
            "0 32px 80px rgba(17,19,24,0.18), 0 0 0 1px rgba(17,19,24,0.06)",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Accent top bar */}
        <div
          style={{
            height: "3px",
            background: `linear-gradient(90deg, ${accent}, ${accent}55)`,
            borderRadius: "20px 20px 0 0",
            flexShrink: 0,
          }}
        />

        {/* Sticky header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #E2E5E9",
            padding: "16px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          {/* Prev */}
          <button
            onClick={() => prevProject && onNavigate(prevProject)}
            disabled={!prevProject}
            aria-label="Previous project"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "7px",
              border: "1px solid #E2E5E9",
              background: "transparent",
              cursor: prevProject ? "pointer" : "not-allowed",
              opacity: prevProject ? 1 : 0.35,
              fontSize: "12px",
              fontWeight: 600,
              color: "#5F6672",
              transition: "all 0.2s ease",
            }}
          >
            <ChevronLeft size={13} />
            Prev
          </button>

          {/* Title */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: accent,
                fontFamily: "ui-monospace, monospace",
                marginBottom: "2px",
              }}
            >
              PROJECT / {String(project.index).padStart(2, "0")} · {project.category}
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#111318",
                fontFamily: "var(--font-display), sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {project.name}
            </div>
          </div>

          {/* Close + Next */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => nextProject && onNavigate(nextProject)}
              disabled={!nextProject}
              aria-label="Next project"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "7px",
                border: "1px solid #E2E5E9",
                background: "transparent",
                cursor: nextProject ? "pointer" : "not-allowed",
                opacity: nextProject ? 1 : 0.35,
                fontSize: "12px",
                fontWeight: 600,
                color: "#5F6672",
                transition: "all 0.2s ease",
              }}
            >
              Next
              <ChevronRight size={13} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close case study"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid #E2E5E9",
                background: "#F7F8FA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <X size={15} color="#5F6672" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ padding: "32px 32px 48px", display: "flex", flexDirection: "column", gap: "36px" }}>

          {/* ── Hero ── */}
          <div>
            {/* Tier + badge */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  fontFamily: "ui-monospace, monospace",
                  color: accent,
                  background: `${accent}12`,
                  border: `1px solid ${accent}30`,
                  borderRadius: "5px",
                  padding: "3px 8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {project.badge}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  fontFamily: "ui-monospace, monospace",
                  color: "#8A919C",
                  background: "#F1F3F5",
                  border: "1px solid #E2E5E9",
                  borderRadius: "5px",
                  padding: "3px 8px",
                }}
              >
                ROLE: {project.role}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  fontFamily: "ui-monospace, monospace",
                  color: "#16A34A",
                  background: "rgba(22,163,74,0.08)",
                  border: "1px solid rgba(22,163,74,0.2)",
                  borderRadius: "5px",
                  padding: "3px 8px",
                }}
              >
                ● {project.status}
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 32px)",
                fontWeight: 800,
                color: "#111318",
                margin: "0 0 10px",
                fontFamily: "var(--font-display), sans-serif",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              {project.name}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#5F6672",
                margin: 0,
                lineHeight: 1.6,
                maxWidth: "640px",
              }}
            >
              {project.tagline}
            </p>
          </div>

          {/* ── Two-column layout: case study + arch ── */}
          <div
            className="modal-cols"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: "40px",
              alignItems: "start",
            }}
          >
            {/* Left: content sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

              {/* Problem */}
              <ModalSection icon={AlertCircle} label="The Problem" accent="#EF4444">
                <p style={{ fontSize: "14.5px", color: "#5F6672", lineHeight: 1.75, margin: 0 }}>
                  {project.problem}
                </p>
              </ModalSection>

              {/* Solution */}
              <ModalSection icon={Lightbulb} label="The Solution" accent={accent}>
                <p style={{ fontSize: "14.5px", color: "#5F6672", lineHeight: 1.75, margin: 0 }}>
                  {project.solution}
                </p>
              </ModalSection>

              {/* AI Components */}
              <ModalSection icon={Bot} label="AI Components" accent={accent}>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {project.aiComponents.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: "13.5px",
                        color: "#5F6672",
                        lineHeight: 1.6,
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "5px",
                          background: `${accent}15`,
                          border: `1px solid ${accent}25`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <Bot size={10} color={accent} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ModalSection>

              {/* Automation Flow */}
              <ModalSection icon={Zap} label="Automation Flow" accent={accent}>
                <div
                  style={{
                    background: "#F7F8FA",
                    border: "1px solid #E2E5E9",
                    borderLeft: `3px solid ${accent}`,
                    borderRadius: "10px",
                    padding: "16px 18px",
                  }}
                >
                  <p style={{ fontSize: "13.5px", color: "#5F6672", lineHeight: 1.75, margin: 0 }}>
                    {project.automationFlow}
                  </p>
                </div>
              </ModalSection>

              {/* Tech Stack */}
              <ModalSection icon={Layers} label="Technology Stack" accent={accent}>
                <TechStackGrid techStack={project.techStack} accent={accent} />
              </ModalSection>

              {/* Outcome */}
              <ModalSection icon={CheckCircle2} label="Outcome" accent="#16A34A">
                <div
                  style={{
                    background: "rgba(22,163,74,0.05)",
                    border: "1px solid rgba(22,163,74,0.18)",
                    borderLeft: "3px solid #16A34A",
                    borderRadius: "10px",
                    padding: "16px 18px",
                  }}
                >
                  <p style={{ fontSize: "14px", color: "#5F6672", lineHeight: 1.75, margin: 0 }}>
                    {project.outcome}
                  </p>
                </div>
              </ModalSection>

              {/* Links */}
              {(hasLive || hasGithub) && (
                <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
                  {hasLive && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "11px 22px",
                        background: accent,
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontSize: "13px",
                        fontWeight: 700,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <ExternalLink size={13} />
                      Live Demo
                    </Link>
                  )}
                  {hasGithub && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "11px 22px",
                        background: "transparent",
                        color: "#111318",
                        border: "1px solid #E2E5E9",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontSize: "13px",
                        fontWeight: 700,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <GitBranch size={13} />
                      GitHub
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Right: Architecture */}
            <div style={{ position: "sticky", top: "80px" }}>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: accent,
                  fontFamily: "ui-monospace, monospace",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: accent,
                  }}
                />
                System Architecture
              </div>
              <ProjectArchDiagram nodes={project.architecture} accent={accent} />
              <p
                style={{
                  fontSize: "11px",
                  color: "#8A919C",
                  marginTop: "14px",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Hover a node to see its role
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 680px) {
            .modal-cols {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Layers } from "lucide-react";
import dynamic from "next/dynamic";
import { CASE_STUDY_PROJECTS, CaseStudyProject } from "@/components/projects/projectData";
import ProjectCard from "@/components/projects/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

// Heavy modal loaded only when opened
const ProjectModal = dynamic(() => import("@/components/projects/ProjectModal"), {
  ssr: false,
});

/* ─── Category Filter ─────────────────────────────────────────────────────── */
const ALL_CATEGORIES = ["All", "AI & Automation", "AI SaaS", "Full-Stack AI", "Business Automation"] as const;

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openProject, setOpenProject] = useState<CaseStudyProject | null>(null);

  const filtered =
    activeCategory === "All"
      ? CASE_STUDY_PROJECTS
      : CASE_STUDY_PROJECTS.filter((p) => p.category === activeCategory);

  /* GSAP entrance animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".project-card-anim").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.06,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filtered]);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        backgroundColor: "#F7F8FA",
        borderTop: "1px solid #E2E5E9",
        borderBottom: "1px solid #E2E5E9",
        padding: "120px 0 140px",
        width: "100%",
        fontFamily: "var(--font-inter), Inter, sans-serif",
        position: "relative",
        zIndex: 2,
      }}
    >
      <span id="projects" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }} aria-hidden="true" />
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px" }}>

        {/* ── Section header ── */}
        <div style={{ marginBottom: "56px" }}>
          {/* System label */}
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
            <Layers size={12} />
            SYSTEM / 05 · PROJECT SYSTEMS & CASE STUDIES
          </div>

          <h2
            ref={headingRef}
            style={{
              fontSize: "clamp(34px, 4.5vw, 58px)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#111318",
              fontFamily: "var(--font-display), sans-serif",
              margin: "0 0 16px",
              maxWidth: "820px",
            }}
          >
            Systems I&apos;ve shipped.
            <br />
            <span style={{ color: "#5F6672" }}>Engineered for real-world outcomes.</span>
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "#5F6672",
              maxWidth: "560px",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Not just projects — case studies. Each one shows a real problem,
            the AI system I built, and what it automated.
          </p>
        </div>

        {/* ── Category filter ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          {ALL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "8px",
                  border: `1.5px solid ${isActive ? "#2563EB40" : "#E2E5E9"}`,
                  background: isActive ? "rgba(37,99,235,0.07)" : "#FFFFFF",
                  color: isActive ? "#2563EB" : "#5F6672",
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "ui-monospace, monospace",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
                {cat === "All" && (
                  <span
                    style={{
                      marginLeft: "6px",
                      fontSize: "10px",
                      color: isActive ? "#2563EB" : "#8A919C",
                    }}
                  >
                    {CASE_STUDY_PROJECTS.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Project cards grid or Project-Ready State ── */}
        {filtered.length > 0 ? (
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {filtered.map((project) => (
              <div key={project.id} className="project-card-anim">
                <ProjectCard project={project} onOpen={setOpenProject} />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              borderRadius: "16px",
              border: "1.5px dashed #D3D8E0",
              background: "#FAFBFC",
              padding: "56px 32px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(37,99,235,0.08)",
                border: "1px solid rgba(37,99,235,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563EB",
              }}
            >
              <Layers size={22} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111318",
                  margin: "0 0 6px",
                  fontFamily: "var(--font-display), sans-serif",
                }}
              >
                Production Systems In Ingestion
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#5F6672",
                  margin: 0,
                  maxWidth: "460px",
                  lineHeight: 1.6,
                }}
              >
                Architecture schemas, telemetry breakdowns, and verified production case studies are being linked. Real project deployments will appear here directly.
              </p>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 12px",
                borderRadius: "999px",
                background: "#FFFFFF",
                border: "1px solid #E2E5E9",
                fontSize: "11px",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 600,
                color: "#2563EB",
                marginTop: "6px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#10B981",
                  boxShadow: "0 0 6px #10B981",
                }}
              />
              SYSTEM SCHEMA READY · ZERO STALE DEMOS
            </div>
          </div>
        )}

        {/* ── Transition teaser → Playground ── */}
        <div
          style={{
            marginTop: "96px",
            paddingTop: "64px",
            borderTop: "1px solid #E2E5E9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#8A919C",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            REAL PROJECTS → REAL SYSTEMS → EXPERIMENTATION
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "#5F6672",
              margin: 0,
              maxWidth: "440px",
              lineHeight: 1.65,
            }}
          >
            Beyond shipped systems — explore live AI demos and interactive experiments.
          </p>
          <a
            href="#playground"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "10px 22px",
              borderRadius: "8px",
              background: "#FFFFFF",
              border: "1.5px solid #E2E5E9",
              color: "#111318",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.2s ease",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            AI Playground
            <ArrowRight size={13} />
          </a>
        </div>
      </div>

      {/* ── Case study modal ── */}
      {openProject && (
        <ProjectModal
          project={openProject}
          allProjects={CASE_STUDY_PROJECTS}
          onClose={() => setOpenProject(null)}
          onNavigate={setOpenProject}
        />
      )}
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SKILLS, type Skill, type SkillCategory } from "@/data/content";
import { SkillIcon } from "@/components/stack/SkillIcons";

type LaneId = "ai" | "web" | "mobile";

interface StackLane {
  id: LaneId;
  kicker: string;
  title: string;
  metric: string;
  proof: string;
  note: string;
  accent: string;
  secondary: string;
  tools: string[];
}

const STACK_LANES: StackLane[] = [
  {
    id: "ai",
    kicker: "AI systems",
    title: "Useful intelligence, wired into real work.",
    metric: "12+ integrations",
    proof: "Agents, RAG, voice, automation",
    note: "For products that need reasoning, retrieval, speech, and reliable task flow.",
    accent: "#1f7a5c",
    secondary: "#74c69d",
    tools: ["Generative AI", "OpenAI", "RAG", "LangGraph"],
  },
  {
    id: "web",
    kicker: "Web products",
    title: "Fast surfaces that feel designed, not assembled.",
    metric: "30+ shipped builds",
    proof: "SaaS, commerce, dashboards",
    note: "For websites and apps where polish, speed, and maintainable systems matter.",
    accent: "#2563eb",
    secondary: "#7dd3fc",
    tools: ["Next.js", "React", "TypeScript", "Node.js"],
  },
  {
    id: "mobile",
    kicker: "Android apps",
    title: "Mobile experiences with product discipline.",
    metric: "4 yrs Flutter",
    proof: "AI voice, subscriptions, Firebase",
    note: "For app ideas that need clean architecture, store-ready flows, and sharp UI.",
    accent: "#0f8f84",
    secondary: "#22d3ee",
    tools: ["Flutter", "Dart", "Firebase", "RevenueCat"],
  },
];

const CATEGORY_ORDER: SkillCategory[] = [
  "AI & GenAI",
  "Web",
  "Mobile",
  "Infra",
  "DesignOps",
];

function getSkill(name: string) {
  return SKILLS.find((skill) => skill.name === name);
}

function getLaneSkills(lane: StackLane) {
  return lane.tools.map(getSkill).filter(Boolean) as Skill[];
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M12 3v11m0 0 4-4m-4 4-4-4" />
      <path d="M5 17.5V20h14v-2.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 12h13m0 0-5-5m5 5-5 5" />
    </svg>
  );
}

function FeaturedToolButton({
  skill,
  active,
  onActivate,
}: {
  skill: Skill;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      className={active ? "featured-tool is-active" : "featured-tool"}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={active}
      style={{ "--tool-color": skill.color } as React.CSSProperties}
    >
      <span className="featured-tool-icon" aria-hidden="true">
        <SkillIcon name={skill.name} color={skill.color} />
      </span>
      <span>
        <strong>{skill.name}</strong>
        <small>{skill.role}</small>
      </span>
    </button>
  );
}

function StackLens({
  lane,
  skills,
  selectedSkill,
}: {
  lane: StackLane;
  skills: Skill[];
  selectedSkill: Skill;
}) {
  return (
    <div
      className={`stack-lens stack-lens-${lane.id}`}
      style={
        {
          "--lane-accent": lane.accent,
          "--lane-secondary": lane.secondary,
          "--selected-color": selectedSkill.color,
        } as React.CSSProperties
      }
    >
      <div className="lens-scan" aria-hidden="true" />
      <div className="lens-topline">
        <span>{lane.kicker}</span>
        <b>{lane.metric}</b>
      </div>

      <div className="lens-stage" aria-hidden="true">
        <svg className="lens-connectors" viewBox="0 0 520 360" preserveAspectRatio="none">
          <path className="connector connector-a" d="M88 252 C140 138 210 92 286 112 C362 132 384 210 442 116" />
          <path className="connector connector-b" d="M72 168 C150 228 230 246 315 202 C368 175 408 180 466 232" />
          <path className="connector connector-c" d="M142 98 C210 42 306 48 378 112 C426 154 454 175 488 178" />
        </svg>

        <div className="lens-core">
          <span className="core-ring core-ring-one" />
          <span className="core-ring core-ring-two" />
          <span className="core-mark">{selectedSkill.name.slice(0, 2).toUpperCase()}</span>
        </div>

        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className={`lens-node lens-node-${index + 1} ${skill.name === selectedSkill.name ? "is-active" : ""}`}
            style={{ "--node-color": skill.color } as React.CSSProperties}
          >
            <span>
              <SkillIcon name={skill.name} color={skill.color} />
            </span>
          </div>
        ))}

        <div className="lens-plane lens-plane-one">
          <span />
          <span />
          <span />
        </div>
        <div className="lens-plane lens-plane-two">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="lens-caption" aria-live="polite">
        <span>{selectedSkill.name}</span>
        <strong>{selectedSkill.role}</strong>
        <small>{selectedSkill.years} hands-on</small>
      </div>
    </div>
  );
}

export default function StackSection() {
  const [activeLaneId, setActiveLaneId] = useState<LaneId>("ai");
  const [activeToolName, setActiveToolName] = useState<string | null>(null);
  const [toolkitOpen, setToolkitOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const activeLane = useMemo(
    () => STACK_LANES.find((lane) => lane.id === activeLaneId) ?? STACK_LANES[0],
    [activeLaneId]
  );

  const laneSkills = useMemo(() => getLaneSkills(activeLane), [activeLane]);

  const selectedSkill = useMemo(() => {
    return (
      laneSkills.find((skill) => skill.name === activeToolName) ??
      laneSkills[0] ??
      SKILLS[0]
    );
  }, [activeToolName, laneSkills]);

  const groupedSkills = useMemo(() => {
    return CATEGORY_ORDER.map((category) => ({
      category,
      skills: SKILLS.filter((skill) => skill.category === category),
    })).filter((group) => group.skills.length > 0);
  }, []);

  const setLane = (laneId: LaneId) => {
    const nextLane = STACK_LANES.find((lane) => lane.id === laneId) ?? STACK_LANES[0];
    setActiveLaneId(nextLane.id);
    setActiveToolName(nextLane.tools[0] ?? null);
  };

  return (
    <section id="stack" className="stack-section">
      <span id="about" className="stack-anchor-alias" aria-hidden="true" />
      <div className="stack-thread" aria-hidden="true" />

      <div className="stack-inner">
        <div className="stack-intro-grid">
          <div className="stack-copy">
            <span className="section-kicker">Selected stack</span>
            <h2>A few tools. A lot of leverage.</h2>
            <p>
              I keep the visible stack tight: AI systems, web products, and Android apps
              built with tools that survive real users.
            </p>

            <div className="stack-actions">
              <a
                className="cv-download"
                href="/resume.pdf"
                download
                data-cursor="click"
              >
                <span className="cv-icon">
                  <DownloadIcon />
                </span>
                <span>
                  <strong>Download CV</strong>
                  <small>PDF • software engineer</small>
                </span>
              </a>

              <div className="stack-proof" aria-label="Core capabilities">
                <span>AI workflows</span>
                <span>Web products</span>
                <span>Android apps</span>
              </div>
            </div>
          </div>

          <div className="stack-visual-wrap">
            <StackLens lane={activeLane} skills={laneSkills} selectedSkill={selectedSkill} />
          </div>
        </div>

        <div className="lane-console">
          <div className="lane-tabs" role="tablist" aria-label="Select skill lane">
            {STACK_LANES.map((lane) => (
              <button
                key={lane.id}
                id={`stack-tab-${lane.id}`}
                type="button"
                role="tab"
                aria-selected={activeLaneId === lane.id}
                aria-controls="stack-lane-panel"
                className={activeLaneId === lane.id ? "lane-tab is-active" : "lane-tab"}
                onClick={() => setLane(lane.id)}
                style={
                  {
                    "--lane-accent": lane.accent,
                    "--lane-secondary": lane.secondary,
                  } as React.CSSProperties
                }
              >
                <span>{lane.kicker}</span>
                <strong>{lane.metric}</strong>
              </button>
            ))}
          </div>

          <div
            id="stack-lane-panel"
            className="lane-panel"
            role="tabpanel"
            aria-labelledby={`stack-tab-${activeLane.id}`}
            style={
              {
                "--lane-accent": activeLane.accent,
                "--lane-secondary": activeLane.secondary,
              } as React.CSSProperties
            }
          >
            <div className="lane-panel-copy">
              <span>{activeLane.proof}</span>
              <h3>{activeLane.title}</h3>
              <p>{activeLane.note}</p>
            </div>

            <div className="featured-tools" aria-label={`${activeLane.kicker} featured tools`}>
              {laneSkills.map((skill) => (
                <FeaturedToolButton
                  key={skill.name}
                  skill={skill}
                  active={selectedSkill.name === skill.name}
                  onActivate={() => setActiveToolName(skill.name)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={toolkitOpen ? "toolkit-shell is-open" : "toolkit-shell"}>
          <button
            type="button"
            className="toolkit-toggle"
            aria-expanded={toolkitOpen}
            aria-controls="full-toolkit"
            onClick={() => setToolkitOpen((value) => !value)}
          >
            <span>
              <strong>{toolkitOpen ? "Hide full toolkit" : "Explore full toolkit"}</strong>
              <small>{SKILLS.length} production tools, grouped by discipline</small>
            </span>
            <ArrowIcon />
          </button>

          {toolkitOpen ? (
            <motion.div
              id="full-toolkit"
              className="toolkit-grid"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {groupedSkills.map((group) => (
                <div className="toolkit-group" key={group.category}>
                  <h3>{group.category}</h3>
                  <div>
                    {group.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="toolkit-chip"
                        style={{ "--tool-color": skill.color } as React.CSSProperties}
                      >
                        <b />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : null}
        </div>
      </div>

      <style jsx global>{`
        .stack-section {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(180deg, #ffffff 0%, #f7fbf8 48%, #ffffff 100%);
          padding: 112px 24px 118px;
          color: #10231c;
          font-family: var(--font-inter), Inter, sans-serif;
        }

        .stack-anchor-alias {
          position: absolute;
          top: -92px;
          left: 0;
          width: 1px;
          height: 1px;
          pointer-events: none;
        }

        .stack-thread {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(31, 122, 92, 0.06) 1px, transparent 1px),
            linear-gradient(rgba(37, 99, 235, 0.035) 1px, transparent 1px);
          background-size: 82px 82px;
          opacity: 0.5;
          mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
        }

        .stack-inner {
          position: relative;
          z-index: 1;
          width: min(1180px, 100%);
          margin: 0 auto;
        }

        .stack-intro-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(420px, 1.08fr);
          gap: 42px;
          align-items: center;
        }

        .stack-copy {
          min-width: 0;
        }

        .stack-copy h2 {
          margin: 18px 0 0;
          max-width: 720px;
          color: #10231c;
          font-family: var(--font-display), Plus Jakarta Sans, sans-serif;
          font-size: clamp(42px, 5.4vw, 74px);
          line-height: 0.98;
          letter-spacing: 0;
        }

        .stack-copy p {
          margin: 22px 0 0;
          max-width: 610px;
          color: #5b6f65;
          font-size: 18px;
          line-height: 1.68;
        }

        .stack-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .cv-download {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          min-height: 64px;
          padding: 10px 18px 10px 10px;
          border-radius: 999px;
          border: 1px solid rgba(16, 35, 28, 0.1);
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(239, 248, 243, 0.78));
          color: #10231c;
          text-decoration: none;
          box-shadow: 0 20px 52px rgba(16, 35, 28, 0.09);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }

        .cv-download:hover,
        .cv-download:focus-visible {
          transform: translateY(-2px);
          border-color: rgba(31, 122, 92, 0.24);
          box-shadow: 0 26px 64px rgba(16, 35, 28, 0.13);
          outline: none;
        }

        .cv-icon {
          display: inline-grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: #1f7a5c;
          color: #ffffff;
        }

        .cv-icon svg,
        .toolkit-toggle svg {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .cv-download strong,
        .toolkit-toggle strong {
          display: block;
          color: #10231c;
          font-size: 14px;
          font-weight: 900;
          line-height: 1.1;
        }

        .cv-download small,
        .toolkit-toggle small {
          display: block;
          margin-top: 5px;
          color: #668076;
          font-size: 12px;
          font-weight: 800;
          line-height: 1.2;
        }

        .stack-proof {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .stack-proof span {
          display: inline-flex;
          align-items: center;
          min-height: 35px;
          border-radius: 999px;
          background: rgba(31, 122, 92, 0.08);
          color: #275a49;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 900;
        }

        .stack-visual-wrap {
          min-width: 0;
        }

        .stack-lens {
          position: relative;
          min-height: 456px;
          border-radius: 8px;
          border: 1px solid rgba(16, 35, 28, 0.1);
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.86), rgba(241, 249, 245, 0.68)),
            radial-gradient(circle at 70% 20%, color-mix(in srgb, var(--lane-secondary) 26%, transparent), transparent 42%);
          box-shadow: 0 32px 90px rgba(16, 35, 28, 0.12);
          overflow: hidden;
          backdrop-filter: blur(24px) saturate(170%);
          -webkit-backdrop-filter: blur(24px) saturate(170%);
        }

        .stack-lens:before {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 7px;
          border: 1px solid rgba(255, 255, 255, 0.76);
          pointer-events: none;
        }

        .lens-scan {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.72) 45%, transparent 62%);
          transform: translateX(-72%);
          animation: lensScan 8s ease-in-out infinite;
          opacity: 0.54;
        }

        .lens-topline {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 22px 22px 0;
        }

        .lens-topline span,
        .lane-panel-copy span {
          color: var(--lane-accent);
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0;
        }

        .lens-topline b {
          border-radius: 999px;
          background: color-mix(in srgb, var(--lane-accent) 10%, white);
          color: color-mix(in srgb, var(--lane-accent) 78%, #10231c);
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 900;
        }

        .lens-stage {
          position: relative;
          height: 318px;
          margin: 8px 18px 0;
          perspective: 940px;
        }

        .lens-connectors {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .connector {
          fill: none;
          stroke: var(--lane-accent);
          stroke-width: 1.8;
          stroke-dasharray: 7 11;
          stroke-linecap: round;
          opacity: 0.34;
          animation: connectorFlow 10s linear infinite;
        }

        .connector-b {
          stroke: var(--lane-secondary);
          opacity: 0.38;
          animation-duration: 12s;
        }

        .connector-c {
          opacity: 0.2;
          animation-duration: 14s;
        }

        .lens-core {
          position: absolute;
          left: 50%;
          top: 48%;
          width: 126px;
          height: 126px;
          transform: translate(-50%, -50%) rotateX(58deg) rotateZ(45deg);
          border-radius: 8px;
          border: 1px solid color-mix(in srgb, var(--lane-accent) 36%, white);
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.94), color-mix(in srgb, var(--lane-secondary) 18%, white));
          box-shadow:
            0 26px 44px rgba(16, 35, 28, 0.12),
            inset 0 0 0 1px rgba(255, 255, 255, 0.8);
          animation: coreFloat 6s ease-in-out infinite;
        }

        .core-ring {
          position: absolute;
          inset: 14px;
          border-radius: 8px;
          border: 1px solid color-mix(in srgb, var(--lane-accent) 28%, transparent);
        }

        .core-ring-two {
          inset: 30px;
          border-color: color-mix(in srgb, var(--selected-color) 42%, transparent);
        }

        .core-mark {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotateZ(-45deg) rotateX(-58deg);
          color: color-mix(in srgb, var(--selected-color) 75%, #10231c);
          font-family: var(--font-display), Plus Jakarta Sans, sans-serif;
          font-size: 26px;
          font-weight: 900;
        }

        .lens-node {
          position: absolute;
          display: grid;
          place-items: center;
          width: 72px;
          height: 72px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.84);
          border: 1px solid color-mix(in srgb, var(--node-color) 20%, transparent);
          box-shadow: 0 18px 42px rgba(16, 35, 28, 0.1);
          transform: translate3d(0, 0, 0);
          animation: nodeDrift 6.5s ease-in-out infinite;
        }

        .lens-node span {
          width: 34px;
          height: 34px;
        }

        .lens-node.is-active {
          background: #ffffff;
          border-color: color-mix(in srgb, var(--node-color) 46%, transparent);
          box-shadow:
            0 22px 56px rgba(16, 35, 28, 0.14),
            0 0 0 7px color-mix(in srgb, var(--node-color) 12%, transparent);
        }

        .lens-node-1 {
          left: 9%;
          top: 55%;
          animation-delay: -1.2s;
        }

        .lens-node-2 {
          left: 24%;
          top: 14%;
          animation-delay: -2.4s;
        }

        .lens-node-3 {
          right: 22%;
          top: 19%;
          animation-delay: -3.6s;
        }

        .lens-node-4 {
          right: 8%;
          top: 58%;
          animation-delay: -4.8s;
        }

        .lens-plane {
          position: absolute;
          display: grid;
          gap: 7px;
          width: 142px;
          padding: 13px;
          border-radius: 8px;
          border: 1px solid rgba(16, 35, 28, 0.08);
          background: rgba(255, 255, 255, 0.62);
          transform: rotateX(62deg) rotateZ(-18deg);
          box-shadow: 0 16px 36px rgba(16, 35, 28, 0.08);
        }

        .lens-plane span {
          height: 8px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--lane-accent) 20%, white);
        }

        .lens-plane span:nth-child(2) {
          width: 72%;
          background: color-mix(in srgb, var(--lane-secondary) 28%, white);
        }

        .lens-plane span:nth-child(3) {
          width: 48%;
        }

        .lens-plane-one {
          left: 8%;
          top: 11%;
        }

        .lens-plane-two {
          right: 6%;
          bottom: 11%;
          transform: rotateX(62deg) rotateZ(15deg);
        }

        .lens-caption {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          margin: 0 22px 22px;
          border-radius: 8px;
          border: 1px solid rgba(16, 35, 28, 0.08);
          background: rgba(255, 255, 255, 0.76);
          padding: 12px;
        }

        .lens-caption span {
          border-radius: 999px;
          background: color-mix(in srgb, var(--selected-color) 14%, white);
          color: color-mix(in srgb, var(--selected-color) 78%, #10231c);
          padding: 7px 10px;
          font-size: 12px;
          font-weight: 900;
        }

        .lens-caption strong {
          min-width: 0;
          color: #10231c;
          font-size: 14px;
          font-weight: 900;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .lens-caption small {
          color: #667a71;
          font-size: 12px;
          font-weight: 800;
        }

        .lane-console {
          margin-top: 28px;
          border-radius: 8px;
          border: 1px solid rgba(16, 35, 28, 0.08);
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 24px 70px rgba(16, 35, 28, 0.08);
          overflow: hidden;
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
        }

        .lane-tabs {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          background: rgba(16, 35, 28, 0.08);
        }

        .lane-tab {
          border: 0;
          min-height: 92px;
          background: rgba(255, 255, 255, 0.82);
          color: #10231c;
          padding: 20px;
          text-align: left;
          cursor: pointer;
          font: inherit;
          transition: background 0.22s ease, color 0.22s ease, transform 0.22s ease;
        }

        .lane-tab:hover,
        .lane-tab:focus-visible {
          background: color-mix(in srgb, var(--lane-secondary) 12%, white);
          outline: none;
        }

        .lane-tab.is-active {
          background:
            linear-gradient(145deg, color-mix(in srgb, var(--lane-accent) 12%, white), #ffffff);
        }

        .lane-tab span {
          display: block;
          color: color-mix(in srgb, var(--lane-accent) 76%, #10231c);
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0;
        }

        .lane-tab strong {
          display: block;
          margin-top: 9px;
          color: #10231c;
          font-family: var(--font-display), Plus Jakarta Sans, sans-serif;
          font-size: 24px;
          line-height: 1.05;
          font-weight: 900;
        }

        .lane-panel {
          display: grid;
          grid-template-columns: minmax(260px, 0.82fr) minmax(0, 1.18fr);
          gap: 22px;
          align-items: center;
          padding: 24px;
        }

        .lane-panel-copy h3 {
          margin: 13px 0 0;
          color: #10231c;
          font-family: var(--font-display), Plus Jakarta Sans, sans-serif;
          font-size: clamp(27px, 3vw, 42px);
          line-height: 1.03;
          letter-spacing: 0;
        }

        .lane-panel-copy p {
          margin: 14px 0 0;
          color: #5d7167;
          font-size: 15px;
          line-height: 1.64;
        }

        .featured-tools {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .featured-tool {
          display: grid;
          grid-template-columns: 46px minmax(0, 1fr);
          gap: 12px;
          align-items: center;
          min-height: 82px;
          border-radius: 8px;
          border: 1px solid rgba(16, 35, 28, 0.08);
          background: rgba(255, 255, 255, 0.72);
          color: #10231c;
          padding: 12px;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .featured-tool:hover,
        .featured-tool:focus-visible,
        .featured-tool.is-active {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--tool-color) 34%, transparent);
          background: #ffffff;
          box-shadow: 0 18px 42px rgba(16, 35, 28, 0.08);
          outline: none;
        }

        .featured-tool-icon {
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          border-radius: 8px;
          background: color-mix(in srgb, var(--tool-color) 10%, white);
        }

        .featured-tool-icon > * {
          width: 28px;
          height: 28px;
        }

        .featured-tool strong {
          display: block;
          min-width: 0;
          color: #10231c;
          font-size: 15px;
          font-weight: 900;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .featured-tool small {
          display: block;
          margin-top: 5px;
          color: #667a71;
          font-size: 12px;
          font-weight: 800;
          line-height: 1.28;
        }

        .toolkit-shell {
          margin-top: 18px;
        }

        .toolkit-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          width: 100%;
          min-height: 74px;
          border: 1px solid rgba(16, 35, 28, 0.08);
          border-radius: 8px;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.86), rgba(245, 251, 248, 0.74));
          color: #1f7a5c;
          padding: 16px 18px;
          text-align: left;
          cursor: pointer;
          box-shadow: 0 18px 52px rgba(16, 35, 28, 0.06);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .toolkit-toggle:hover,
        .toolkit-toggle:focus-visible {
          transform: translateY(-2px);
          border-color: rgba(31, 122, 92, 0.22);
          box-shadow: 0 24px 62px rgba(16, 35, 28, 0.1);
          outline: none;
        }

        .toolkit-toggle svg {
          flex: 0 0 auto;
          transition: transform 0.22s ease;
        }

        .toolkit-shell.is-open .toolkit-toggle svg {
          transform: rotate(90deg);
        }

        .toolkit-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .toolkit-group {
          border-radius: 8px;
          border: 1px solid rgba(16, 35, 28, 0.08);
          background: rgba(255, 255, 255, 0.72);
          padding: 16px;
        }

        .toolkit-group h3 {
          margin: 0 0 13px;
          color: #10231c;
          font-family: var(--font-display), Plus Jakarta Sans, sans-serif;
          font-size: 17px;
          line-height: 1.1;
          letter-spacing: 0;
        }

        .toolkit-group div {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .toolkit-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 30px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--tool-color) 9%, white);
          border: 1px solid color-mix(in srgb, var(--tool-color) 16%, transparent);
          color: #465b51;
          padding: 6px 9px;
          font-size: 12px;
          font-weight: 850;
        }

        .toolkit-chip b {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--tool-color);
        }

        @keyframes lensScan {
          0%, 18% { transform: translateX(-74%); }
          46%, 100% { transform: translateX(74%); }
        }

        @keyframes connectorFlow {
          to { stroke-dashoffset: -72; }
        }

        @keyframes coreFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -8px; }
        }

        @keyframes nodeDrift {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -7px; }
        }

        @media (max-width: 1100px) {
          .stack-intro-grid {
            grid-template-columns: 1fr;
          }

          .stack-copy {
            max-width: 760px;
          }

          .toolkit-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 820px) {
          .stack-section {
            padding: 96px 16px 104px;
          }

          .stack-copy p {
            font-size: 16px;
          }

          .stack-actions {
            align-items: stretch;
          }

          .cv-download {
            width: 100%;
            justify-content: flex-start;
          }

          .stack-proof {
            width: 100%;
          }

          .lane-tabs,
          .lane-panel {
            grid-template-columns: 1fr;
          }

          .lane-tab {
            min-height: 76px;
          }

          .featured-tools {
            grid-template-columns: 1fr;
          }

          .toolkit-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .stack-section {
            padding-inline: 14px;
          }

          .stack-copy h2 {
            font-size: 40px;
          }

          .stack-lens {
            min-height: 414px;
          }

          .lens-stage {
            height: 272px;
            margin-inline: 8px;
          }

          .lens-node {
            width: 58px;
            height: 58px;
          }

          .lens-node span {
            width: 28px;
            height: 28px;
          }

          .lens-core {
            width: 104px;
            height: 104px;
          }

          .lens-plane {
            width: 104px;
          }

          .lens-topline,
          .lens-caption {
            margin-inline: 14px;
          }

          .lens-topline {
            padding-inline: 14px;
          }

          .lens-caption {
            grid-template-columns: 1fr;
            gap: 7px;
          }

          .lens-caption strong {
            white-space: normal;
          }

          .lane-panel {
            padding: 18px;
          }

          .stack-proof span {
            flex: 1 1 auto;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lens-scan,
          .connector,
          .lens-core,
          .lens-node {
            animation: none !important;
          }

          .cv-download,
          .lane-tab,
          .featured-tool,
          .toolkit-toggle,
          .toolkit-toggle svg {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

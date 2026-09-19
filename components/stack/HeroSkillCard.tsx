"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import type { Skill } from "@/data/content";
import { SkillIcon } from "./SkillIcons";

interface HeroSkillCardProps {
  skill: Skill;
  index: number;
  onNodeReady?: (x: number, y: number) => void;
}

const RING_R = 38;
const RING_CIRC = 2 * Math.PI * RING_R;

export default function HeroSkillCard({ skill, index, onNodeReady }: HeroSkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    el.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.025)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    setHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    if (!onNodeReady || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const parent = cardRef.current.offsetParent as HTMLElement | null;
    const parentRect = parent?.getBoundingClientRect();
    if (parentRect) {
      onNodeReady(rect.left - parentRect.left + rect.width / 2, rect.top - parentRect.top + rect.height / 2);
    }
  }, [onNodeReady]);

  const ringDash = hovered ? RING_CIRC * (1 - skill.level / 100) : RING_CIRC;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, clipPath: "inset(0 100% 0 0)" }}
      animate={isInView ? { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ flex: "1 1 0", minWidth: 0 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          borderRadius: "28px",
          padding: "36px 32px",
          background: hovered
            ? `linear-gradient(140deg, ${skill.color}14 0%, rgba(255,255,255,0.035) 100%)`
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? skill.color + "40" : "rgba(255,255,255,0.07)"}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transition: "transform 0.15s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          boxShadow: hovered
            ? `0 0 0 1px ${skill.color}30, 0 30px 80px ${skill.color}18, inset 0 1px 0 rgba(255,255,255,0.07)`
            : "inset 0 1px 0 rgba(255,255,255,0.04)",
          cursor: "default",
          overflow: "hidden",
          willChange: "transform",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Inner glow bloom behind icon */}
        <div
          style={{
            position: "absolute",
            top: "-30px", left: "-30px",
            width: "200px", height: "200px",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${skill.color}${hovered ? "20" : "08"} 0%, transparent 70%)`,
            transition: "background 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Category badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{
            fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: skill.color,
            fontFamily: "var(--font-mono), monospace",
            opacity: 0.8,
          }}>
            {skill.category}
          </span>
          <span style={{
            fontSize: "10px", fontWeight: 600,
            color: "rgba(148,163,184,0.4)",
            fontFamily: "var(--font-mono), monospace",
          }}>
            {skill.years}
          </span>
        </div>

        {/* Icon + Ring SVG */}
        <div style={{ position: "relative", width: "88px", height: "88px" }}>
          {/* Ring */}
          <svg
            width="88" height="88"
            viewBox="0 0 88 88"
            style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
          >
            {/* Track */}
            <circle cx="44" cy="44" r={RING_R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
            {/* Arc */}
            <circle
              cx="44" cy="44" r={RING_R}
              fill="none"
              stroke={skill.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={RING_CIRC}
              strokeDashoffset={ringDash}
              style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)" }}
              opacity={hovered ? 1 : 0}
            />
          </svg>
          {/* Icon inside ring */}
          <div style={{
            position: "absolute",
            inset: "12px",
            borderRadius: "50%",
            background: `${skill.color}14`,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid ${skill.color}20`,
          }}>
            <div style={{ width: "32px", height: "32px" }}>
              <SkillIcon name={skill.name} color={skill.color} />
            </div>
          </div>
        </div>

        {/* Name */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: "24px", fontWeight: 900,
            color: "#f1f5f9",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            fontFamily: "var(--font-display), sans-serif",
            marginBottom: "6px",
          }}>
            {skill.name}
          </div>
          <div style={{
            fontSize: "13px",
            color: "rgba(148,163,184,0.55)",
            fontFamily: "var(--font-mono), monospace",
          }}>
            {skill.role}
          </div>
        </div>

        {/* Proficiency — only visible on hover */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}>
          <span style={{
            fontSize: "11px",
            color: "rgba(148,163,184,0.5)",
            fontFamily: "var(--font-mono), monospace",
          }}>
            Proficiency
          </span>
          <span style={{
            fontSize: "22px", fontWeight: 900,
            color: skill.color,
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "-0.04em",
          }}>
            {skill.level}%
          </span>
        </div>

        {/* Used in tag */}
        <div style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.25s ease 0.05s, transform 0.25s ease 0.05s",
          paddingTop: "4px",
          borderTop: `1px solid ${skill.color}20`,
        }}>
          <span style={{
            fontSize: "10px", fontWeight: 600,
            color: skill.color,
            fontFamily: "var(--font-mono), monospace",
            opacity: 0.75,
          }}>
            Used in → {skill.tag}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

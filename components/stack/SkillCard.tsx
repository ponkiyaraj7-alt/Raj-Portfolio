"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import type { Skill } from "@/data/content";
import { SkillIcon } from "./SkillIcons";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    el.style.transform = `perspective(700px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.03)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
    setHovered(false);
  }, []);

  const glowBorder = `${skill.color}44`;
  const glowShadow = `${skill.color}18`;

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0 round 20px)" }}
      animate={isInView ? { opacity: 1, clipPath: "inset(0 0% 0 0 round 20px)" } : {}}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        ref={innerRef}
        style={{
          position: "relative",
          borderRadius: "20px",
          padding: "22px 20px",
          background: hovered
            ? `linear-gradient(135deg, ${skill.color}10 0%, rgba(255,255,255,0.025) 100%)`
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? glowBorder : "rgba(255,255,255,0.07)"}`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: hovered
            ? `0 0 0 1px ${glowBorder}, 0 16px 48px ${glowShadow}`
            : "inset 0 1px 0 rgba(255,255,255,0.04)",
          cursor: "default",
          overflow: "hidden",
          transition: "transform 0.15s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          willChange: "transform",
        }}
      >
        {/* Top: icon + years badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{
            width: "40px", height: "40px",
            borderRadius: "10px",
            background: `${skill.color}14`,
            border: `1px solid ${skill.color}20`,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "7px",
            flexShrink: 0,
          }}>
            <SkillIcon name={skill.name} color={skill.color} />
          </div>
          <span style={{
            fontSize: "9px", fontWeight: 700,
            letterSpacing: "0.1em",
            color: "rgba(148,163,184,0.35)",
            fontFamily: "var(--font-mono), monospace",
            paddingTop: "2px",
          }}>
            {skill.years}
          </span>
        </div>

        {/* Name + role */}
        <div>
          <div style={{
            fontSize: "15px", fontWeight: 800,
            color: hovered ? "#f8fafc" : "#cbd5e1",
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-display), sans-serif",
            lineHeight: 1.2,
            marginBottom: "3px",
            transition: "color 0.2s ease",
          }}>
            {skill.name}
          </div>
          <div style={{
            fontSize: "10px",
            color: "rgba(148,163,184,0.45)",
            fontFamily: "var(--font-mono), monospace",
          }}>
            {skill.role}
          </div>
        </div>

        {/* Proficiency bar — slim, always visible */}
        <div style={{
          height: "2px", borderRadius: "100px",
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: isInView ? `${skill.level}%` : "0%" }}
            transition={{ duration: 1.0, delay: index * 0.035 + 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: "100%", borderRadius: "100px",
              background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
              boxShadow: `0 0 6px ${skill.color}55`,
            }}
          />
        </div>

        {/* Used-in — slides up on hover */}
        <div style={{
          opacity: hovered ? 0.75 : 0,
          transform: hovered ? "translateY(0)" : "translateY(5px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          fontSize: "9px", fontWeight: 600,
          color: skill.color,
          fontFamily: "var(--font-mono), monospace",
        }}>
          → {skill.tag}
        </div>
      </div>
    </motion.div>
  );
}

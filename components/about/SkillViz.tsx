"use client";

// SkillViz.tsx - Animated skill visualizations
// Terminal-style skill bars and radar chart showing technical capabilities

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "ai" | "mobile";
  color: string;
}

const skills: Skill[] = [
  { name: "React / Next.js", level: 95, category: "frontend", color: "#61dafb" },
  { name: "TypeScript", level: 92, category: "frontend", color: "#3178c6" },
  { name: "AI Integration", level: 88, category: "ai", color: "#10b981" },
  { name: "Flutter", level: 90, category: "mobile", color: "#60c8f6" },
  { name: "Node.js", level: 85, category: "backend", color: "#339933" },
  { name: "Python", level: 80, category: "backend", color: "#ffd43b" },
  { name: "Tailwind CSS", level: 94, category: "frontend", color: "#06b6d4" },
  { name: "RAG Systems", level: 82, category: "ai", color: "#8b5cf6" },
];

const categories = {
  frontend: { label: "Frontend", color: "#61dafb" },
  backend: { label: "Backend", color: "#339933" },
  ai: { label: "AI / ML", color: "#10b981" },
  mobile: { label: "Mobile", color: "#60c8f6" },
};

function SkillBar({ skill, index, isInView }: { skill: Skill; index: number; isInView: boolean }) {
  const [displayLevel, setDisplayLevel] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1500;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayLevel(Math.round(skill.level * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, index * 100);
    return () => clearTimeout(timeout);
  }, [isInView, skill.level, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: skill.color }}
          />
          <span className="text-white/80 text-sm font-mono">{skill.name}</span>
        </div>
        <span className="text-white/50 text-xs font-mono">{displayLevel}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              animation: "shimmer 2s infinite",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function RadarChart({ isInView }: { isInView: boolean }) {
  const size = 200;
  const center = size / 2;
  const radius = 70;

  // Calculate category averages
  const categoryScores = Object.entries(categories).map(([key, cat]) => {
    const catSkills = skills.filter((s) => s.category === key);
    const avg = catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length;
    return { ...cat, key, level: avg };
  });

  const angleStep = (Math.PI * 2) / categoryScores.length;

  // Generate polygon points
  const points = categoryScores.map((cat, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (cat.level / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      label: cat.label,
      level: cat.level,
      color: cat.color,
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-0">
        {/* Background grid */}
        {[20, 40, 60, 80, 100].map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        {categoryScores.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <motion.path
          d={pathD}
          fill="rgba(82, 183, 136, 0.2)"
          stroke="#52b788"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill={p.color}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
          />
        ))}
      </svg>

      {/* Labels */}
      {points.map((p, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelRadius = radius + 25;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);
        return (
          <div
            key={i}
            className="absolute text-xs font-mono whitespace-nowrap"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              color: p.color,
            }}
          >
            {p.label}
          </div>
        );
      })}
    </div>
  );
}

export default function SkillViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"terminal" | "radar">("terminal");

  return (
    <div ref={ref} className="space-y-4">
      {/* Tab switcher */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setActiveTab("terminal")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
            activeTab === "terminal"
              ? "bg-white/10 text-white"
              : "text-white/40 hover:text-white/60"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
          </svg>
          Terminal
        </button>
        <button
          onClick={() => setActiveTab("radar")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
            activeTab === "radar"
              ? "bg-white/10 text-white"
              : "text-white/40 hover:text-white/60"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          Radar
        </button>
      </div>

      {/* Content */}
      <div className="relative min-h-[280px]">
        {activeTab === "terminal" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 text-white/30 text-xs font-mono mb-4">
              <span>$</span>
              <span>npm run skills</span>
            </div>

            {/* Skill bars */}
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Terminal footer */}
            <div className="flex items-center gap-2 text-white/30 text-xs font-mono mt-4 pt-4 border-t border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>Analysis complete • 8 skills assessed</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-full"
          >
            <RadarChart isInView={isInView} />
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

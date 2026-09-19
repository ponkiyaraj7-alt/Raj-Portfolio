"use client";

// CreativeProcessPanel.tsx - "The Architect's Mind" sidebar
// A stunning visualization of the creative development workflow

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import ProcessStage from "./ProcessStage";

const STAGES = [
  {
    icon: "🎯",
    title: "DISCOVER",
    descriptor: "Research",
    detail: "Diving deep into user pain points, market gaps, and emerging tech. Every great product starts with understanding.",
    color: "#52b788",
  },
  {
    icon: "🔬",
    title: "ARCHITECT",
    descriptor: "System Design",
    detail: "Mapping data flows, choosing the right stack, planning for scale. Building the blueprint before the code.",
    color: "#A855F7",
  },
  {
    icon: "⚡",
    title: "PROTOTYPE",
    descriptor: "Build Fast",
    detail: "Vibe-coding with AI, rapid iterations, failing forward fast. Speed beats perfection in the early days.",
    color: "#F59E0B",
  },
  {
    icon: "🎨",
    title: "POLISH",
    descriptor: "Craft",
    detail: "Pixel-perfect UI, micro-interactions, performance tuning. The details make the difference.",
    color: "#EC4899",
  },
  {
    icon: "🚀",
    title: "SHIP",
    descriptor: "Deploy",
    detail: "CI/CD pipelines, monitoring, and celebrating with chai ☕. Nothing matters until it ships.",
    color: "#61DAFB",
  },
];

const METRICS = [
  { value: "12", label: "coffees", icon: "☕", color: "#8B5CF6" },
  { value: "47", label: "commits", icon: "🔥", color: "#F97316" },
  { value: "3", label: "shipping", icon: "🚀", color: "#52b788" },
  { value: "94%", label: "AI accuracy", icon: "🤖", color: "#A855F7" },
];

const QUOTES = [
  "Build fast. Ship faster.",
  "AI amplifies creativity.",
  "Code is poetry in motion.",
  "Ship. Learn. Repeat.",
  "The best code ships.",
];

// Animated connecting lines with flowing particles
function ParticleConnector({ stageIndex, isActive }: { stageIndex: number; isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduceMotion || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = 40 * dpr;
      canvas.height = 40 * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let particles: { y: number; speed: number; alpha: number }[] = [
      { y: 5, speed: 0.8, alpha: 0.8 },
      { y: 15, speed: 0.6, alpha: 0.6 },
      { y: 25, speed: 0.9, alpha: 0.4 },
    ];

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, 40, 40);

      // Draw connecting line
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(20, 40);
      ctx.strokeStyle = "rgba(82, 183, 136, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw flowing particles
      particles.forEach((p) => {
        p.y += p.speed;
        if (p.y > 40) p.y = 0;

        ctx.beginPath();
        ctx.arc(20, p.y, isActive ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(82, 183, 136, ${p.alpha * (isActive ? 1.5 : 1)})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, isActive]);

  if (reduceMotion) {
    return (
      <div className="h-10 w-10 flex items-center justify-center">
        <div className="w-px h-full bg-emerald-500/20" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="h-10 w-10 mx-auto"
      style={{ width: 20, height: 40 }}
    />
  );
}

// Heartbeat EKG animation
function HeartbeatLine() {
  const reduceMotion = useReducedMotion() ?? false;

  if (reduceMotion) {
    return (
      <div className="h-4 w-16 bg-emerald-500/20 rounded" />
    );
  }

  return (
    <svg viewBox="0 0 60 20" className="h-4 w-16" preserveAspectRatio="none">
      <motion.path
        d="M0,10 L10,10 L15,5 L20,15 L25,10 L35,10 L40,5 L45,15 L50,10 L60,10"
        fill="none"
        stroke="#52b788"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      />
    </svg>
  );
}

// Main component
export default function CreativeProcessPanel() {
  const [activeStage, setActiveStage] = useState(2); // Start at PROTOTYPE
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showQuote, setShowQuote] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setShowQuote(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
        setShowQuote(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStageClick = useCallback((index: number) => {
    setActiveStage(index);
  }, []);

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Main glass container */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(6,9,14,0.95) 100%)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `
            0 40px 80px rgba(0,0,0,0.4),
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 0 60px rgba(82,183,136,0.08) inset
          `,
        }}
      >
        {/* Gradient border */}
        <div
          className="absolute -inset-[1px] rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(82,183,136,0.4), rgba(168,85,247,0.3), rgba(97,218,251,0.2))",
            zIndex: -1,
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-5">
          {/* Header */}
          <div className="flex items-start gap-3 mb-6">
            {/* Animated brain/network icon */}
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(82,183,136,0.2), rgba(168,85,247,0.15))",
                border: "1px solid rgba(82,183,136,0.3)",
              }}
              animate={!reduceMotion ? {
                boxShadow: [
                  "0 0 0 0 rgba(82,183,136,0)",
                  "0 0 20px 4px rgba(82,183,136,0.3)",
                  "0 0 0 0 rgba(82,183,136,0)",
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">🧠</span>
            </motion.div>

            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                Mind of an Architect
              </h3>
              <p className="text-[10px] text-white/40 mt-1">
                From chaos to clarity
              </p>
            </div>
          </div>

          {/* Process Stages */}
          <div className="space-y-0">
            {STAGES.map((stage, index) => (
              <div key={stage.title}>
                <ProcessStage
                  {...stage}
                  index={index}
                  isActive={activeStage === index}
                  onClick={() => handleStageClick(index)}
                />
                {/* Connector between stages */}
                {index < STAGES.length - 1 && (
                  <ParticleConnector stageIndex={index} isActive={activeStage === index} />
                )}
              </div>
            ))}
          </div>

          {/* Current Status */}
          <motion.div
            className="mt-6 p-3 rounded-xl border border-white/10 bg-white/[0.03]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: STAGES[activeStage].color,
                    boxShadow: `0 0 8px ${STAGES[activeStage].color}`,
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs text-white/60">Currently:</span>
                <span
                  className="text-xs font-bold"
                  style={{ color: STAGES[activeStage].color }}
                >
                  {STAGES[activeStage].title}
                </span>
              </div>
              <span className="text-[10px] text-white/30">
                Phase {activeStage + 1}/5
              </span>
            </div>

            {/* Mini progress bar */}
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${STAGES[activeStage].color}, ${STAGES[(activeStage + 1) % STAGES.length].color})`,
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${((activeStage + 1) / STAGES.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>

          {/* Metrics Ticker */}
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/[0.03] border border-white/5"
                whileHover={{ scale: 1.02, borderColor: `${metric.color}30` }}
              >
                <span className="text-xs">{metric.icon}</span>
                <span className="text-[10px] font-bold" style={{ color: metric.color }}>
                  {metric.value}
                </span>
                <span className="text-[9px] text-white/40">{metric.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Inspiration Quote */}
          <motion.div
            className="mt-4 pt-4 border-t border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {showQuote && (
                <motion.p
                  key={currentQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-[11px] text-white/40 text-center italic font-mono"
                >
                  &ldquo;{QUOTES[currentQuote]}&rdquo;
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* System Status Footer */}
          <motion.div
            className="mt-4 flex items-center justify-between pt-3 border-t border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-white/40">System Online</span>
            </div>
            <HeartbeatLine />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

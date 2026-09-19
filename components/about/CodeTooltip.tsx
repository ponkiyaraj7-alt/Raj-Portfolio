"use client";

// CodeTooltip.tsx - Hover intelligence system
// Context-aware tooltips that appear when hovering over code lines

import { motion } from "framer-motion";

interface CodeTooltipProps {
  type: string;
  containerRect: DOMRect | null;
}

// Tooltip content configurations
const tooltipConfigs: Record<string, {
  title: string;
  content: React.ReactNode;
  accent: string;
}> = {
  name: {
    title: "Raj Ponkiya",
    accent: "#52b788",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">Associate AI Developer & Automation Engineer</p>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>Available for projects</span>
        </div>
      </div>
    ),
  },
  role: {
    title: "Associate AI Developer",
    accent: "#8b5cf6",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">Developing AI agents, LLM solutions, and automated workflows</p>
        <div className="flex flex-wrap gap-1">
          {["Python", "FastAPI", "LangChain", "LangGraph", "LLMs", "RAG"].map((skill) => (
            <span key={skill} className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/70">
              {skill}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  location: {
    title: "Location",
    accent: "#38bdf8",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">Based in Ahmedabad, Gujarat, India</p>
        <div className="text-xs text-white/50 font-mono">
          Ahmedabad, Gujarat, India
        </div>
      </div>
    ),
  },
  years: {
    title: "6 Years Experience",
    accent: "#f59e0b",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">Since 2019 — from first freelance project to AI-powered systems</p>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "#f59e0b" }}
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </div>
        <p className="text-xs text-white/50">Path to 10 years</p>
      </div>
    ),
  },
  focus: {
    title: "Production-Grade Systems",
    accent: "#ec4899",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">Specializing in scalable, maintainable applications</p>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• Performance optimization</li>
          <li>• Clean architecture patterns</li>
          <li>• Production monitoring & observability</li>
        </ul>
      </div>
    ),
  },
  ai: {
    title: "AI Workflows",
    accent: "#10b981",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">Integrating agentic AI into development workflows</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span className="text-xs text-white/60">Claude, GPT, Custom Agents</span>
        </div>
      </div>
    ),
  },
  rag: {
    title: "RAG Systems",
    accent: "#3b82f6",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">Retrieval-Augmented Generation for intelligent applications</p>
        <div className="text-xs text-white/50 font-mono">
          Pinecone • Weaviate • Vector DBs
        </div>
      </div>
    ),
  },
  nextjs: {
    title: "Next.js Architecture",
    accent: "#000000",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">Server Components, App Router, Edge Runtime</p>
        <div className="flex items-center gap-1">
          <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/70">v15+</span>
          <span className="text-white/40 text-xs">• App Router</span>
        </div>
      </div>
    ),
  },
  flutter: {
    title: "Flutter Mobile",
    accent: "#60c8f6",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">Cross-platform mobile development</p>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span>iOS</span>
          <span>•</span>
          <span>Android</span>
          <span>•</span>
          <span>Web</span>
        </div>
      </div>
    ),
  },
  projects: {
    title: "30+ Projects Shipped",
    accent: "#a855f7",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">From MVPs to enterprise systems</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/5 rounded p-2">
            <div className="text-white/90 font-semibold">12</div>
            <div className="text-white/50">SaaS Platforms</div>
          </div>
          <div className="bg-white/5 rounded p-2">
            <div className="text-white/90 font-semibold">8</div>
            <div className="text-white/50">Mobile Apps</div>
          </div>
        </div>
      </div>
    ),
  },
  integrations: {
    title: "12 AI Integrations",
    accent: "#06b6d4",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm">OpenAI, Anthropic, and custom model deployments</p>
        <div className="flex flex-wrap gap-1">
          {["GPT-4", "Claude", "Whisper", "Embeddings", "Fine-tuning"].map((tech) => (
            <span key={tech} className="px-1.5 py-0.5 bg-cyan-500/20 rounded text-xs text-cyan-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  philosophy: {
    title: "Build Software People Enjoy",
    accent: "#f97316",
    content: (
      <div className="space-y-2">
        <p className="text-white/80 text-sm italic">
          "The best software is not just functional, but deeply intuitive and beautifully crafted."
        </p>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span>Design</span>
          <span>+</span>
          <span>Engineering</span>
          <span>=</span>
          <span className="text-orange-400">Magic</span>
        </div>
      </div>
    ),
  },
};

export default function CodeTooltip({ type, containerRect }: CodeTooltipProps) {
  const config = tooltipConfigs[type];
  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-50 w-64 pointer-events-none"
      style={{
        right: -280,
        top: 0,
      }}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${config.accent}40`,
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 20px ${config.accent}20
          `,
        }}
      >
        {/* Accent line at top */}
        <div
          className="h-1 w-full"
          style={{ background: config.accent }}
        />

        {/* Content */}
        <div className="p-4">
          <h4
            className="font-semibold text-sm mb-2"
            style={{ color: config.accent }}
          >
            {config.title}
          </h4>
          {config.content}
        </div>

        {/* Glow effect */}
        <div
          className="absolute -inset-px rounded-xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${config.accent}20, transparent)`,
            opacity: 0.5,
          }}
        />
      </div>
    </motion.div>
  );
}

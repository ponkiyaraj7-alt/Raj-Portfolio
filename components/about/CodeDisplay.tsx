"use client";

// CodeDisplay.tsx - Static syntax-highlighted code display (performance optimized)
// Replaces TypewriterCode to eliminate typing animation lag

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Code lines that tell the developer's story
const codeLines = [
  { id: 1, content: "// Welcome to my digital workspace", type: "comment" },
  { id: 2, content: "", type: "empty" },
  { id: 3, content: "const developer = {", type: "declaration" },
  { id: 4, content: '  name: "Raj Ponkiya",', type: "property" },
  { id: 5, content: '  role: "Associate AI Developer",', type: "property" },
  { id: 6, content: '  location: "Ahmedabad, India",', type: "property" },
  { id: 7, content: "  experience: {", type: "nested" },
  { id: 8, content: '    status: "Active",', type: "property" },
  { id: 9, content: '    focus: "AI automation & LLM systems",', type: "property" },
  { id: 10, content: "  },", type: "close" },
  { id: 11, content: "  specializations: [", type: "array" },
  { id: 12, content: '    "AI Agents & Multi-Agent Workflows",', type: "string" },
  { id: 13, content: '    "LLM-Based Solutions",', type: "string" },
  { id: 14, content: '    "Workflow & Process Automation",', type: "string" },
  { id: 15, content: '    "RAG & Semantic Retrieval"', type: "string" },
  { id: 16, content: "  ],", type: "close" },
  { id: 17, content: "  stats: {", type: "nested" },
  { id: 18, content: "    aiIntegrations: 12,", type: "property" },
  { id: 19, content: '    workflowOptimization: "High",', type: "property" },
  { id: 20, content: '    philosophy: "Turn manual processes into intelligent automation"', type: "property" },
  { id: 21, content: "  }", type: "close" },
  { id: 22, content: "};", type: "close" },
  { id: 23, content: "", type: "empty" },
  { id: 24, content: "// Currently building: Autonomous AI workflows", type: "comment" },
  { id: 25, content: "// Available for: AI automation & LLM consulting", type: "comment" },
];

// Syntax highlighting colors
const syntaxColors: Record<string, string> = {
  comment: "rgba(148, 163, 184, 0.6)", // slate-400
  keyword: "rgba(139, 92, 246, 1)", // violet-500
  string: "rgba(82, 183, 136, 1)", // emerald-400
  number: "rgba(56, 189, 248, 1)", // sky-400
  property: "rgba(255, 255, 255, 0.9)", // white
  punctuation: "rgba(148, 163, 184, 0.8)", // slate-400
  declaration: "rgba(139, 92, 246, 1)", // violet
};

// Parse content and apply syntax highlighting
function parseContent(line: (typeof codeLines)[0]): React.ReactNode {
  if (line.type === "comment") {
    return <span style={{ color: syntaxColors.comment }}>{line.content}</span>;
  }
  if (line.type === "empty") {
    return <span>&nbsp;</span>;
  }

  const content = line.content;
  const tokens: React.ReactNode[] = [];
  let key = 0;
  let remaining = content;

  // Match strings first
  const stringRegex = /"([^"]*)"/g;
  let match;
  let lastIndex = 0;

  while ((match = stringRegex.exec(content)) !== null) {
    // Add text before string
    if (match.index > lastIndex) {
      const beforeText = content.slice(lastIndex, match.index);
      tokens.push(
        <span key={key++} style={{ color: syntaxColors.property }}>
          {highlightKeywords(beforeText)}
        </span>
      );
    }
    // Add the string
    tokens.push(
      <span key={key++} style={{ color: syntaxColors.string }}>
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex);
    tokens.push(
      <span key={key++} style={{ color: syntaxColors.property }}>
        {highlightKeywords(remainingText)}
      </span>
    );
  }

  return tokens.length > 0 ? tokens : content;
}

// Highlight keywords and numbers
function highlightKeywords(text: string): React.ReactNode {
  const parts = text.split(/(\d+|const|let|var|function|return|if|else)/);
  return parts.map((part, i) => {
    if (/^\d+$/.test(part)) {
      return (
        <span key={i} style={{ color: syntaxColors.number }}>
          {part}
        </span>
      );
    }
    if (["const", "let", "var", "function"].includes(part)) {
      return (
        <span key={i} style={{ color: syntaxColors.keyword }}>
          {part}
        </span>
      );
    }
    return part;
  });
}

interface CodeLineProps {
  line: (typeof codeLines)[0];
  index: number;
  isInView: boolean;
}

function CodeLine({ line, index, isInView }: CodeLineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: index * 0.03,
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex items-center gap-3 sm:gap-4 py-0.5 font-mono text-xs sm:text-sm leading-relaxed hover:bg-white/[0.02] rounded transition-colors"
      style={{
        marginLeft: -12,
        marginRight: -12,
        paddingLeft: 12,
        paddingRight: 12,
      }}
    >
      {/* Line number */}
      <span className="text-white/20 text-[10px] sm:text-xs w-4 sm:w-6 text-right select-none flex-shrink-0">
        {line.id}
      </span>

      {/* Code content with syntax highlighting */}
      <span className="flex-1 min-w-0 truncate">{parseContent(line)}</span>
    </motion.div>
  );
}

export default function CodeDisplay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <div ref={containerRef} className="relative">
      {/* File tab */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4 border-b border-white/10 pb-2 sm:pb-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 rounded-t-lg border-t border-x border-white/10 flex-shrink-0">
          <svg
            className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-white/80 text-xs sm:text-sm font-mono">about.ts</span>
          <span className="text-white/40 text-xs ml-1">×</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-white/40 hover:text-white/60 transition-colors cursor-pointer flex-shrink-0">
          <svg
            className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="text-xs sm:text-sm font-mono">skills.json</span>
        </div>
      </div>

      {/* Code content - optimized static display */}
      <div className="min-h-[280px] sm:min-h-[350px] lg:min-h-[400px]">
        {codeLines.map((line, index) => (
          <CodeLine
            key={line.id}
            line={line}
            index={index}
            isInView={isInView}
          />
        ))}

        {/* Static cursor at end */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 sm:gap-4 py-0.5"
        >
          <span className="text-white/20 text-[10px] sm:text-xs w-4 sm:w-6 text-right">
            {codeLines.length + 1}
          </span>
          <span
            className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-green-400"
            style={{ animation: "blink 1s infinite" }}
          />
        </motion.div>
      </div>

      {/* CSS for cursor blink */}
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

// TypewriterCode.tsx - Self-typing code editor with syntax highlighting
// Optimized for performance with memoization and reduced re-renders

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeTooltip from "./CodeTooltip";

// Code lines that tell the developer's story
const codeLines = [
  { id: 1, content: "// Welcome to my digital workspace", type: "comment", tooltip: null },
  { id: 2, content: "", type: "empty", tooltip: null },
  { id: 3, content: "const developer = {", type: "declaration", tooltip: null },
  { id: 4, content: '  name: "Raj Ponkiya",', type: "property", tooltip: "name" },
  { id: 5, content: '  role: "Associate AI Developer",', type: "property", tooltip: "role" },
  { id: 6, content: '  location: "Ahmedabad, India",', type: "property", tooltip: "location" },
  { id: 7, content: "  experience: {", type: "nested", tooltip: null },
  { id: 8, content: '    status: "Active",', type: "property", tooltip: "years" },
  { id: 9, content: '    focus: "AI automation & LLM systems",', type: "property", tooltip: "focus" },
  { id: 10, content: "  },", type: "close", tooltip: null },
  { id: 11, content: "  specializations: [", type: "array", tooltip: null },
  { id: 12, content: '    "AI Agents & Multi-Agent Workflows",', type: "string", tooltip: "ai" },
  { id: 13, content: '    "LLM-Based Solutions",', type: "string", tooltip: "rag" },
  { id: 14, content: '    "Workflow & Process Automation",', type: "string", tooltip: "nextjs" },
  { id: 15, content: '    "RAG & Semantic Retrieval"', type: "string", tooltip: "flutter" },
  { id: 16, content: "  ],", type: "close", tooltip: null },
  { id: 17, content: "  philosophy: {", type: "nested", tooltip: null },
  { id: 18, content: '    approach: "Understand process -> Apply AI -> Automate tools",', type: "property", tooltip: "focus" },
  { id: 19, content: '    objective: "Measurable, reliable execution",', type: "property", tooltip: "projects" },
  { id: 20, content: '    core: "Turn repetitive manual work into automated workflows"', type: "property", tooltip: "philosophy" },
  { id: 21, content: "  }", type: "close", tooltip: null },
  { id: 22, content: "};", type: "close", tooltip: null },
  { id: 23, content: "", type: "empty", tooltip: null },
  { id: 24, content: "// Currently building: Practical AI & agentic systems", type: "comment", tooltip: null },
  { id: 25, content: "// Available for: AI automation & intelligent workflow engineering", type: "comment", tooltip: null },
];

// Syntax highlighting colors
const syntaxColors: Record<string, string> = {
  comment: "rgba(148, 163, 184, 0.6)",    // slate-400
  keyword: "rgba(139, 92, 246, 1)",      // violet-500
  string: "rgba(82, 183, 136, 1)",       // emerald-400
  number: "rgba(56, 189, 248, 1)",      // sky-400
  property: "rgba(255, 255, 255, 0.9)",  // white
  punctuation: "rgba(148, 163, 184, 0.8)", // slate-400
  declaration: "rgba(139, 92, 246, 1)",  // violet
};

interface LineProps {
  line: typeof codeLines[0];
  isActive: boolean;
  isComplete: boolean;
  displayedContent: string;
  onHover: (tooltip: string | null, rect: DOMRect | null) => void;
}

// Memoized CodeLine to prevent unnecessary re-renders
const CodeLine = memo(function CodeLine({ line, isActive, isComplete, displayedContent, onHover }: LineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (line.tooltip && lineRef.current) {
      onHover(line.tooltip, lineRef.current.getBoundingClientRect());
    }
  }, [line.tooltip, onHover]);

  const handleMouseLeave = useCallback(() => {
    onHover(null, null);
  }, [onHover]);

  // Parse and color the code - memoized
  const coloredContent = useRef<React.ReactNode>(null);
  
  useEffect(() => {
    if (!isComplete && !isActive) return;
    
    if (line.type === "comment") {
      coloredContent.current = <span style={{ color: syntaxColors.comment }}>{displayedContent}</span>;
      return;
    }
    if (line.type === "empty") {
      coloredContent.current = <span>&nbsp;</span>;
      return;
    }

    // Simple syntax highlighting
    const content = displayedContent;
    const tokens: React.ReactNode[] = [];
    let key = 0;
    let remaining = content;

    // Match strings
    const stringMatch = remaining.match(/^([^"]*"[^"]*")/);
    if (stringMatch) {
      const before = stringMatch[1].split('"')[0];
      const strVal = '"' + stringMatch[1].split('"')[1] + '"';
      if (before) {
        tokens.push(<span key={key++} style={{ color: syntaxColors.property }}>{before}</span>);
      }
      tokens.push(<span key={key++} style={{ color: syntaxColors.string }}>{strVal}</span>);
      remaining = remaining.slice(stringMatch[0].length);
    }

    // Match numbers
    const numMatch = remaining.match(/(\d+)/);
    if (numMatch) {
      const parts = remaining.split(numMatch[0]);
      if (parts[0]) {
        tokens.push(<span key={key++} style={{ color: syntaxColors.property }}>{parts[0]}</span>);
      }
      tokens.push(<span key={key++} style={{ color: syntaxColors.number }}>{numMatch[0]}</span>);
      if (parts[1]) {
        tokens.push(<span key={key++} style={{ color: syntaxColors.punctuation }}>{parts[1]}</span>);
      }
    } else if (remaining && tokens.length === 0) {
      // Keywords
      if (remaining.includes("const")) {
        const parts = remaining.split("const");
        if (parts[0]) tokens.push(<span key={key++} style={{ color: syntaxColors.property }}>{parts[0]}</span>);
        tokens.push(<span key={key++} style={{ color: syntaxColors.keyword }}>const</span>);
        if (parts[1]) tokens.push(<span key={key++} style={{ color: syntaxColors.property }}>{parts[1]}</span>);
      } else {
        tokens.push(<span key={key++} style={{ color: syntaxColors.property }}>{remaining}</span>);
      }
    }

    coloredContent.current = tokens.length > 0 ? tokens : <span style={{ color: syntaxColors.property }}>{content}</span>;
  }, [displayedContent, isActive, isComplete, line.type]);

  // Only re-render when content actually changes
  const shouldShow = isComplete || isActive;

  return (
    <div
      ref={lineRef}
      className="flex items-center gap-3 sm:gap-4 py-0.5 font-mono text-xs sm:text-sm leading-relaxed"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: line.tooltip ? "help" : "default",
        background: line.tooltip ? "rgba(255,255,255,0.02)" : "transparent",
        marginLeft: -12,
        marginRight: -12,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 4,
        transition: "background 0.15s ease",
        willChange: isActive ? "contents" : "auto",
      }}
    >
      {/* Line number */}
      <span className="text-white/20 text-[10px] sm:text-xs w-4 sm:w-6 text-right select-none flex-shrink-0">
        {line.id}
      </span>

      {/* Code content */}
      <span className="flex-1 min-w-0 truncate">
        {shouldShow ? coloredContent.current : null}
      </span>

      {/* Cursor for active line - only animate when active */}
      {isActive && (
        <span
          className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-green-400 ml-0.5 flex-shrink-0"
          style={{ animation: "blink 0.53s infinite alternate" }}
        />
      )}
    </div>
  );
});

interface TypewriterCodeProps {
  onTypingComplete?: () => void;
}

// Memoized TypewriterCode to prevent parent re-renders from affecting it
export default function TypewriterCode({ onTypingComplete }: TypewriterCodeProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [lineContents, setLineContents] = useState<string[]>(() => new Array(codeLines.length).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<{ type: string; rect: DOMRect } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect - optimized with single timeout
  useEffect(() => {
    if (currentLine >= codeLines.length) {
      if (!isComplete) {
        setIsComplete(true);
        onTypingComplete?.();
      }
      return;
    }

    const line = codeLines[currentLine];
    const fullContent = line.content;

    if (currentChar >= fullContent.length) {
      // Line complete, move to next after delay
      timeoutRef.current = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, line.type === "empty" ? 80 : 150);
      return;
    }

    // Type next character - consistent timing for better performance
    timeoutRef.current = setTimeout(() => {
      setLineContents(prev => {
        if (prev[currentLine].length === currentChar + 1) return prev; // No change needed
        const newContents = [...prev];
        newContents[currentLine] = fullContent.slice(0, currentChar + 1);
        return newContents;
      });
      setCurrentChar(prev => prev + 1);
    }, 45); // Consistent timing for smoother performance

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentLine, currentChar, onTypingComplete, isComplete]);

  // Stable callback for tooltip hover
  const handleTooltipHover = useCallback((tooltip: string | null, rect: DOMRect | null) => {
    if (tooltip && rect) {
      setActiveTooltip({ type: tooltip, rect });
    } else {
      setActiveTooltip(null);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* File tab - responsive sizing */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4 border-b border-white/10 pb-2 sm:pb-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 rounded-t-lg border-t border-x border-white/10 flex-shrink-0">
          <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-white/80 text-xs sm:text-sm font-mono">about.ts</span>
          <span className="text-white/40 text-xs ml-1">×</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-white/40 hover:text-white/60 transition-colors cursor-pointer flex-shrink-0">
          <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-xs sm:text-sm font-mono">skills.json</span>
        </div>
      </div>

      {/* Code content - optimized min-height for mobile */}
      <div className="min-h-[280px] sm:min-h-[350px] lg:min-h-[400px]">
        {codeLines.map((line, index) => (
          <CodeLine
            key={line.id}
            line={line}
            isActive={index === currentLine && !isComplete}
            isComplete={index < currentLine || isComplete}
            displayedContent={lineContents[index]}
            onHover={handleTooltipHover}
          />
        ))}

        {/* Final cursor - CSS animation instead of framer motion for performance */}
        {isComplete && (
          <div className="flex items-center gap-3 sm:gap-4 py-0.5">
            <span className="text-white/20 text-[10px] sm:text-xs w-4 sm:w-6 text-right">{codeLines.length + 1}</span>
            <span
              className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-green-400"
              style={{ animation: "blink 0.53s infinite alternate" }}
            />
          </div>
        )}
      </div>

      {/* CSS for cursor blink */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Tooltip */}
      <AnimatePresence>
        {activeTooltip && (
          <CodeTooltip
            type={activeTooltip.type}
            containerRect={containerRef.current?.getBoundingClientRect() || null}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

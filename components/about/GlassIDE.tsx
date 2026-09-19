"use client";

// GlassIDE.tsx - Root container with aurora/glass effects
// Creates a futuristic floating IDE with animated gradients and glassmorphism

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlassIDEProps {
  children: React.ReactNode;
}

export default function GlassIDE({ children }: GlassIDEProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full" style={{ perspective: "1000px" }}>
      {/* Aurora Background */}
      <div className="absolute -inset-40 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(82, 183, 136, 0.15), transparent),
              radial-gradient(ellipse 60% 40% at 80% 50%, rgba(56, 189, 248, 0.1), transparent),
              radial-gradient(ellipse 50% 60% at 20% 80%, rgba(139, 92, 246, 0.1), transparent)
            `,
            animation: "auroraShift 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Main Glass Container - Static, no tilt */}
      <motion.div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Animated Border Gradient */}
        <div
          className="absolute -inset-[1px] rounded-2xl z-0"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(82, 183, 136, 0.3), rgba(56, 189, 248, 0.3), rgba(139, 92, 246, 0.3), transparent)",
            animation: "borderRotate 8s linear infinite",
          }}
        />

        {/* Glass Background */}
        <div
          className="relative z-10 rounded-2xl overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(6, 9, 14, 0.95) 100%)
            `,
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: `
              0 40px 80px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.05) inset,
              0 0 100px rgba(82, 183, 136, 0.05) inset
            `,
          }}
        >
          {/* Scanline Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)",
              opacity: 0.5,
            }}
          />

          {/* Glow Effect on Hover */}
          {isHovered && (
            <motion.div
              className="absolute z-0 pointer-events-none"
              style={{
                width: 300,
                height: 300,
                background: "radial-gradient(circle, rgba(82, 183, 136, 0.15) 0%, transparent 70%)",
                left: mousePosition.x - 150,
                top: mousePosition.y - 150,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Content */}
          <div className="relative z-30 p-6 md:p-8">
            {/* Header Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="h-4 w-px bg-white/10 mx-2" />
                <span className="text-white/60 text-sm font-mono">dev.ide</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-white/40 text-xs font-mono">Available for Q2 2026</span>
              </div>
            </div>

            {/* Main Content Area */}
            {children}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes auroraShift {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(2%, 2%) rotate(120deg);
          }
          66% {
            transform: translate(-2%, 1%) rotate(240deg);
          }
        }

        @keyframes borderRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

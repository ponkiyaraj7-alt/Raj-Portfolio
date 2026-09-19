"use client";

// ProcessStage.tsx - Individual creative stage card with animations
// Part of the Creative Process sidebar

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ProcessStageProps {
  icon: string;
  title: string;
  descriptor: string;
  detail: string;
  color: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export default function ProcessStage({
  icon,
  title,
  descriptor,
  detail,
  color,
  index,
  isActive,
  onClick,
}: ProcessStageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    setIsHovered(false);
  };

  // Icon micro-animations based on stage
  const getIconAnimation = () => {
    if (reduceMotion) return {};
    switch (title) {
      case "DISCOVER":
        return { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] };
      case "ARCHITECT":
        return { rotate: [0, 180, 360] };
      case "PROTOTYPE":
        return { x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0] };
      case "POLISH":
        return { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] };
      case "SHIP":
        return { y: [0, -3, 0], scale: [1, 1.1, 1] };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* Card container */}
      <div
        className={`
          relative p-3 rounded-xl border transition-all duration-300
          ${isActive || isHovered ? "bg-white/[0.08]" : "bg-white/[0.02]"}
        `}
        style={{
          borderColor: isActive || isHovered ? `${color}50` : "rgba(255,255,255,0.08)",
          boxShadow: isActive
            ? `0 0 20px ${color}30, inset 0 1px 0 ${color}20`
            : isHovered
              ? `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
              : "none",
        }}
      >
        {/* Rainbow shimmer border on hover */}
        {(isActive || isHovered) && !reduceMotion && (
          <motion.div
            className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, ${color}00, ${color}60, ${color}00)`,
                backgroundSize: "200% 100%",
                animation: "shimmer 2s linear infinite",
              }}
            />
          </motion.div>
        )}

        {/* Content */}
        <div className="relative z-10 flex items-start gap-3">
          {/* Animated icon */}
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}10)`,
              border: `1px solid ${color}40`,
            }}
            animate={isHovered || isActive ? getIconAnimation() : {}}
            transition={{ duration: 0.5, repeat: isHovered || isActive ? Infinity : 0, repeatType: "loop" }}
          >
            {icon}
          </motion.div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color }}
              >
                {title}
              </span>
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                />
              )}
            </div>
            <span className="text-[10px] text-white/40 block mt-0.5">
              {descriptor}
            </span>

            {/* Expanded detail on hover/active */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isHovered || isActive ? "auto" : 0,
                opacity: isHovered || isActive ? 1 : 0,
              }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-[10px] text-white/50 mt-2 leading-relaxed">
                {detail}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}

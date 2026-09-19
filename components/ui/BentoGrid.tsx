"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/content";
import { useState, useRef } from "react";

interface BentoGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function BentoGrid({ projects, onProjectClick }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {projects.map((project, idx) => {
        // Asymmetric: first and last cards span full width
        const isWide = idx === 0 || idx === projects.length - 1;
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
            className={cn(isWide && "md:col-span-2")}
          >
            <TiltCard project={project} isWide={isWide} onClick={() => onProjectClick(project)} />
          </motion.div>
        );
      })}
    </div>
  );
}

function TiltCard({
  project,
  isWide,
  onClick,
}: {
  project: Project;
  isWide: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer group"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative rounded-3xl overflow-hidden border border-gray-200/50",
          "bg-white/60 backdrop-blur-2xl",
          "shadow-[0_8px_40px_rgba(0,0,0,0.06)]",
          "hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]",
          "transition-shadow duration-500",
          isWide ? "min-h-[340px]" : "min-h-[300px]"
        )}
      >
        {/* Color accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: project.color }}
        />

        {/* Image preview area */}
        <div
          className={cn(
            "relative overflow-hidden",
            isWide ? "h-52" : "h-40"
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
            style={{ backgroundImage: `url(${project.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-[#86868b] mt-1">{project.type}</p>
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
              style={{
                background: `${project.color}15`,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={project.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-[#424245] leading-relaxed mt-3 line-clamp-2">
            {project.tagline}
          </p>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-[#f5f5f7] text-[#6e6e73]"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#f5f5f7] text-[#6e6e73]">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

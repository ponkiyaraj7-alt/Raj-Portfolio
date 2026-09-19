"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/content";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="rounded-3xl bg-white/60 backdrop-blur-2xl border border-gray-200/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer hover:shadow-[0_16px_60px_rgba(0,0,0,0.1)] transition-shadow duration-500"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
              {project.name}
            </h3>
            <p className="text-sm text-[#86868b] mt-1">{project.type}</p>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${project.color}15` }}
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
        <p className="text-sm text-[#424245] mt-3 line-clamp-2">
          {project.tagline}
        </p>
      </div>
    </motion.div>
  );
}

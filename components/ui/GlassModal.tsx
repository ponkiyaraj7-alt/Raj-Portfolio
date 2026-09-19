"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import type { Project } from "@/data/content";

interface GlassModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GlassModal({ project, isOpen, onClose }: GlassModalProps) {
  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white/80 backdrop-blur-3xl border border-white/50 shadow-[0_25px_100px_rgba(0,0,0,0.15)]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xl border border-gray-200/50 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            {/* Hero image */}
            <div className="relative h-56 md:h-72 overflow-hidden rounded-t-3xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
              <div className="absolute bottom-6 left-8 right-8">
                <span
                  className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-3"
                  style={{ background: project.color }}
                >
                  {project.type}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">
                  {project.name}
                </h2>
                <p className="text-[#424245] mt-1">{project.tagline}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Description */}
              <p className="text-lg text-[#424245] leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Case Study */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#86868b] mb-4">
                  Case Study
                </h3>
                {project.caseStudy.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-[#424245] leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#86868b] mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm font-medium rounded-xl bg-[#f5f5f7] text-[#1d1d1f] border border-gray-200/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200/50">
                {project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-blue-200/50 active:scale-95"
                    style={{ background: project.color }}
                  >
                    Visit Live Site
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>
                )}
                {project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1d1d1f] text-white text-sm font-semibold transition-all hover:bg-[#424245] active:scale-95"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    View Source
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/content";

interface HorizontalScrollProps {
  projects: Project[];
}

export default function HorizontalScroll({ projects }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-40%"]);

  return (
    <div ref={containerRef} className="relative overflow-hidden py-12">
      <motion.div
        style={{ x }}
        className="flex gap-6 w-max"
      >
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="w-[340px] md:w-[400px] flex-shrink-0 group"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-2xl border border-gray-200/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_60px_rgba(0,0,0,0.1)] transition-shadow duration-500">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: project.color }}
                  />
                  <span className="text-xs font-medium text-[#86868b] uppercase tracking-wider">
                    {project.type}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[#1d1d1f] tracking-tight">
                  {project.name}
                </h4>
                <p className="text-sm text-[#424245] mt-2 line-clamp-2">
                  {project.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

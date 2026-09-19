"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
}

export default function TextReveal({ text, className = "" }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.4] tracking-tight bg-gradient-to-br from-[#1d1d1f] via-[#424245] to-[#86868b] bg-clip-text text-transparent">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <span className="inline-block mr-[0.25em] relative">
      <motion.span
        style={{ opacity, y }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

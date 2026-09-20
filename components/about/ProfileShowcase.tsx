"use client";

// ProfileShowcase.tsx - Light AI Engineering 9:16 portrait card with CTAs and production stats

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface ProfileShowcaseProps {
  email: string;
}

const STATS = [
  { value: 30, suffix: "+", label: "Projects shipped" },
  { value: 12, suffix: "", label: "AI integrations" },
  { value: 6, suffix: "yr", label: "In production" },
];

function MagneticButton({
  children,
  variant = "primary",
  onClick,
  href,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion() ?? false;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.15;
    const distY = (e.clientY - centerY) * 0.15;
    setPosition({ x: distX, y: distY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    variant === "primary"
      ? "bg-[#2563EB] text-white shadow-sm hover:bg-[#1D4ED8]"
      : "bg-[#FFFFFF] text-[#111318] border border-[#E2E5E9] hover:bg-[#F7F8FA]";

  const ButtonContent = (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative px-5 py-2.5 rounded-lg font-semibold text-xs tracking-wider transition-all duration-200 uppercase font-mono ${baseStyles}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {ButtonContent}
      </a>
    );
  }

  return ButtonContent;
}

export default function ProfileShowcase({ email }: ProfileShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduceMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduceMotion]);

  // Parallax offset for the image
  const parallaxX = reduceMotion ? 0 : (mousePosition.x - 0.5) * 8;
  const parallaxY = reduceMotion ? 0 : (mousePosition.y - 0.5) * 8;

  return (
    <div ref={containerRef} className="relative w-full max-w-sm mx-auto lg:mx-0">
      {/* Main glass card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Glass container */}
        <div className="relative z-10 rounded-2xl overflow-hidden bg-white border border-[#E2E5E9] shadow-[0_1px_3px_rgba(17,19,24,0.02),0_4px_16px_rgba(17,19,24,0.04)]">
          {/* Image container - 9:16 ratio */}
          <div className="relative aspect-[9/14] overflow-hidden bg-[#F7F8FA]">
            {/* Main image with parallax */}
            <motion.div
              className="relative w-full h-full"
              animate={{ x: parallaxX, y: parallaxY }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              <Image
                src="/profile.webp"
                alt="Raj Ponkiya - Associate AI Developer"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </motion.div>

            {/* Bottom gradient overlay for smooth transition */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/60 to-transparent" />

            {/* Online indicator */}
            <motion.div
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#E2E5E9] shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
              </span>
              <span className="text-[10.5px] text-[#111318] font-bold font-mono uppercase tracking-wider">
                ● OPEN
              </span>
            </motion.div>
          </div>

          {/* Content section */}
          <div className="relative z-20 p-5 space-y-4 bg-white">
            {/* Name and title */}
            <div className="text-center">
              <h3 className="text-lg font-extrabold text-[#111318] tracking-tight">
                Raj Ponkiya
              </h3>
              <p className="text-xs font-semibold text-[#5F6672] font-mono uppercase tracking-wider mt-0.5">
                Associate AI Developer
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <MagneticButton variant="primary" href="#work">
                View Work →
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                href="/resume.pdf"
              >
                Resume
              </MagneticButton>
            </div>

            {/* Stats pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-1.5 pt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="px-2.5 py-1 rounded-md bg-[#F1F3F5] border border-[#E2E5E9] text-[10.5px] text-[#5F6672] font-mono"
                >
                  <span className="text-[#2563EB] font-bold">
                    {stat.value}
                    {stat.suffix}
                  </span>{" "}
                  <span>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

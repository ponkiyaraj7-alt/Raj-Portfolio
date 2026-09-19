"use client";

// ProfileShowcase.tsx - Glassmorphic 9:16 portrait with CTAs and stats
// Instagram story ratio showcase with magnetic buttons and ambient effects

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

// Magnetic button that follows cursor slightly
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
      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
      : "bg-white/10 text-white border border-white/20 hover:bg-white/15";

  const ButtonContent = (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${baseStyles}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
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

// Ambient floating particles
function AmbientParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
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
  const parallaxX = reduceMotion ? 0 : (mousePosition.x - 0.5) * 10;
  const parallaxY = reduceMotion ? 0 : (mousePosition.y - 0.5) * 10;

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
        {/* Animated gradient border */}
        <div
          className="absolute -inset-[2px] rounded-3xl z-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(82, 183, 136, 0.5), rgba(56, 189, 248, 0.5), rgba(139, 92, 246, 0.5), rgba(82, 183, 136, 0.5))",
            backgroundSize: "300% 300%",
            animation: "gradientShift 8s ease infinite",
          }}
        />

        {/* Glass container */}
        <div className="relative z-10 rounded-3xl overflow-hidden bg-slate-900/90 backdrop-blur-xl border border-white/10">
          {/* Ambient particles */}
          <AmbientParticles />

          {/* Image container - 9:16 ratio */}
          <div className="relative aspect-[9/16] overflow-hidden">
            {/* Glow behind image */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(82, 183, 136, 0.3), transparent 50%)`,
              }}
            />

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

            {/* Bottom gradient overlay for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

            {/* Online indicator */}
            <motion.div
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-white/80 font-medium">
                Available for Work
              </span>
            </motion.div>
          </div>

          {/* Content section */}
          <div className="relative z-20 p-6 space-y-5">
            {/* Name and title */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">
                Raj Ponkiya
              </h3>
              <p className="text-sm text-white/60">
                Associate AI Developer
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <MagneticButton variant="primary" href="#work">
                View My Work
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                href="/resume.pdf"
              >
                Download CV
              </MagneticButton>
            </div>

            {/* Stats pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 pt-2"
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
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70"
                >
                  <span className="text-emerald-400 font-semibold">
                    {stat.value}
                    {stat.suffix}
                  </span>{" "}
                  <span className="text-white/50">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative glow */}
        <div
          className="absolute -inset-4 -z-10 blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(82, 183, 136, 0.4), transparent 50%)",
          }}
        />
      </motion.div>

      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}

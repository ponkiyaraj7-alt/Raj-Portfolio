"use client";

// EvasiveButton.tsx - The "Escape Artist" button that runs from the cursor
// A playful, mischievous button that gamifies the "No" response

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface EvasiveButtonProps {
  onCatch: () => void;
}

const TAUNTS = [
  "Too slow! ⚡",
  "Catch me if you can! 🏃",
  "My developer taught me self-defense 🥋",
  "You don't really mean that... do you? 🥺",
  "I'm too valuable to lose! 💎",
  "Your cursor needs more training! 🎯",
  "Almost! But not quite 😉",
  "I'm quicker than a Flutter hot reload! 🔥",
  "Try harder! My CI/CD pipeline did 🚀",
  "Missed me by a pixel! 🎨",
];

const MOBILE_TAUNTS = [
  "I'm too fast for thumbs! 🦘",
  "Tiny screen, tiny chance! 📱",
  "Try landscape mode! 🔄",
  "My responsive design evades you! 💨",
];

export default function EvasiveButton({ onCatch }: EvasiveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [taunt, setTaunt] = useState("No");
  const [isGlitching, setIsGlitching] = useState(false);
  const [caught, setCaught] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const moveButton = useCallback(
    (mouseX: number, mouseY: number) => {
      if (!buttonRef.current || !containerRef.current || reduceMotion) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const distX = mouseX - buttonCenterX;
      const distY = mouseY - buttonCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Only run if cursor is within 150px
      if (distance < 150 && distance > 0) {
        // Calculate escape vector (away from cursor)
        const escapeX = -(distX / distance) * 80;
        const escapeY = -(distY / distance) * 80;

        // Clamp to container bounds
        const maxX = containerRect.width - buttonRect.width - 20;
        const maxY = containerRect.height - buttonRect.height - 20;

        setPosition((prev) => ({
          x: Math.max(-maxX / 2, Math.min(maxX / 2, prev.x + escapeX * 0.3)),
          y: Math.max(-maxY / 3, Math.min(maxY / 3, prev.y + escapeY * 0.3)),
        }));

        // Random taunt
        if (Math.random() < 0.3) {
          const taunts = isMobile ? MOBILE_TAUNTS : TAUNTS;
          setTaunt(taunts[Math.floor(Math.random() * taunts.length)]);
        }
      }
    },
    [reduceMotion, isMobile]
  );

  useEffect(() => {
    if (reduceMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      moveButton(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [moveButton, reduceMotion, isMobile]);

  const handleClick = () => {
    if (caught) return;
    setCaught(true);

    // Glitch effect before revealing
    setIsGlitching(true);
    setTaunt("SYSTEM COMPROMISED");

    setTimeout(() => {
      setTaunt("Error 418: I'm a teapot ☕");
    }, 800);

    setTimeout(() => {
      setIsGlitching(false);
      onCatch();
    }, 2000);
  };

  const handleMobileAttempt = () => {
    // On mobile, teleport the button
    setPosition({
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 60,
    });
    setTaunt(MOBILE_TAUNTS[Math.floor(Math.random() * MOBILE_TAUNTS.length)]);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-48 h-16 flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        <motion.button
          ref={buttonRef}
          key={isGlitching ? "glitch" : "normal"}
          onClick={isMobile ? handleMobileAttempt : handleClick}
          onMouseEnter={() => {
            if (!isMobile && !caught) {
              setTaunt(TAUNTS[Math.floor(Math.random() * TAUNTS.length)]);
            }
          }}
          className={`
            relative px-6 py-3 rounded-xl font-medium text-sm
            bg-white/10 text-white border border-white/20
            hover:bg-white/15 transition-colors
            ${isGlitching ? "animate-glitch" : ""}
          `}
          animate={{
            x: position.x,
            y: position.y,
            rotate: isGlitching ? [0, -2, 2, -2, 0] : 0,
            scale: isGlitching ? [1, 1.02, 0.98, 1.02, 1] : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          whileHover={!isMobile && !reduceMotion ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glitch overlay */}
          {isGlitching && (
            <>
              <span className="absolute inset-0 bg-red-500/20 rounded-xl animate-pulse" />
              <span
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)",
                }}
              />
            </>
          )}

          <span className="relative z-10 flex items-center gap-2">
            {taunt}
            {!caught && !isMobile && (
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                🏃
              </motion.span>
            )}
          </span>
        </motion.button>
      </AnimatePresence>

      <style jsx>{`
        @keyframes glitch {
          0%,
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
          20% {
            clip-path: inset(20% 0 60% 0);
            transform: translate(-2px, 2px);
          }
          40% {
            clip-path: inset(40% 0 40% 0);
            transform: translate(2px, -2px);
          }
          60% {
            clip-path: inset(60% 0 20% 0);
            transform: translate(-2px, -2px);
          }
          80% {
            clip-path: inset(80% 0 5% 0);
            transform: translate(2px, 2px);
          }
        }

        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
      `}</style>
    </div>
  );
}

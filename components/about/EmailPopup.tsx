"use client";

// EmailPopup.tsx - Success popup with email, copy functionality, and auto-dismiss
// Appears when user clicks Yes or catches the No button

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmailPopupProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  variant?: "success" | "caught";
}

export default function EmailPopup({
  email,
  isOpen,
  onClose,
  variant = "success",
}: EmailPopupProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6);

  // Reset and start timer when opened
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(6);
      setCopied(false);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft, onClose]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [email]);

  // Play sound effect
  useEffect(() => {
    if (!isOpen) return;

    // Create a subtle success sound using Web Audio API
    const audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    const playSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a pleasant chime
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.exponentialRampToValueAtTime(
        659.25,
        audioContext.currentTime + 0.1
      ); // E5

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    };

    // Only play if user has interacted with the page
    if (audioContext.state === "running") {
      playSound();
    } else {
      // Wait for user interaction
      const handleInteraction = () => {
        playSound();
        document.removeEventListener("click", handleInteraction);
      };
      document.addEventListener("click", handleInteraction, { once: true });
    }

    return () => {
      audioContext.close();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ pointerEvents: "none" }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            style={{ pointerEvents: "auto" }}
            onClick={onClose}
          />

          {/* Popup card */}
          <motion.div
            className="relative z-10 w-full max-w-md bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 overflow-hidden"
            style={{ pointerEvents: "auto" }}
          >
            {/* Success confetti burst effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background:
                      i % 3 === 0
                        ? "#52b788"
                        : i % 3 === 1
                          ? "#38bdf8"
                          : "#8b5cf6",
                    left: "50%",
                    top: "30%",
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (i % 2 === 0 ? 1 : -1) * (50 + Math.random() * 100),
                    y: -50 - Math.random() * 100,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center"
              >
                <span className="text-3xl">
                  {variant === "success" ? "✅" : "🏆"}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold text-white mb-2"
              >
                {variant === "success"
                  ? "Thanks for reaching out!"
                  : "Persistence Badge: Unstoppable!"}
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/60 text-sm mb-6"
              >
                {variant === "success"
                  ? "I've copied my email to your clipboard. Let's build something amazing!"
                  : "You caught me! I guess you really want to work together 😉"}
              </motion.p>

              {/* Email display */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <button
                  onClick={copyToClipboard}
                  className="w-full py-4 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <span className="text-emerald-400 font-mono text-lg font-semibold">
                    {email}
                  </span>
                  <motion.span
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                    animate={copied ? { scale: [1, 1.2, 1] } : {}}
                  >
                    {copied ? "✓" : "📋"}
                  </motion.span>
                </button>

                {/* Copy feedback */}
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-emerald-400 font-medium"
                    >
                      Copied to clipboard!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Timer indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center justify-center gap-2"
              >
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                </div>
                <span className="text-xs text-white/40 font-mono">
                  {timeLeft}s
                </span>
              </motion.div>

              <p className="mt-2 text-xs text-white/30">
                This will close automatically
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

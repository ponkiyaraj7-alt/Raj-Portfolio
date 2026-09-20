"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/data/content";
import BaseCell from "./BaseCell";
import { useReducedMotion } from "../useReducedMotion";

const MESSAGES = [
  { who: "Alex",  text: "How's the launch?",        time: "2:14" },
  { who: "Sam",   text: "Voice memos shipping now", time: "2:15" },
  { who: "You",   text: "Transcribing live now",     time: "2:16" },
];

export default function FlutterPhoneCell({ skill, index = 0, span }: { skill: Skill; index?: number; span?: { col?: number; row?: number } }) {
  const reduced = useReducedMotion();
  const cellRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(reduced ? MESSAGES.length : 0);

  useEffect(() => {
    if (!cellRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.2 }
    );
    obs.observe(cellRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    let i = 0;
    setShown(0);
    const id = setInterval(() => {
      i = (i + 1) % (MESSAGES.length + 2);
      setShown(Math.min(i, MESSAGES.length));
    }, 1500);
    return () => clearInterval(id);
  }, [visible, reduced]);

  return (
    <BaseCell
      ref={cellRef}
      color={skill.color}
      index={index}
      span={span}
      minHeight={360}
      padding="22px"
      noTilt={false}
      ariaLabel="Demonstration: Flutter mobile app UI"
    >
      <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", gap: 14, zIndex: 1 }}>
        {/* Header — centered */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: skill.color, fontFamily: "var(--font-mono), monospace" }}>
              {skill.name} · SYSTEM TELEMETRY
            </span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(148,163,184,0.45)", fontFamily: "var(--font-mono), monospace" }}>
            iOS · ANDROID
          </span>
        </div>

        {/* Phone frame */}
        <div
          style={{
            margin: "0 auto",
            width: 168,
            flex: 1,
            minHeight: 0,
            borderRadius: 28,
            background: "linear-gradient(180deg, #1a1f26 0%, #0d1117 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 60px -20px ${skill.color}33, 0 0 0 6px rgba(0,0,0,0.4)`,
            padding: "12px 10px 14px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {/* Notch */}
          <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 50, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.6)" }} />

          {/* Status row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 4px 0", fontFamily: "var(--font-mono), monospace", fontSize: 8, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>
            <span>9:41</span>
            <div style={{ display: "flex", gap: 2 }}>
              <span style={{ width: 12, height: 6, borderRadius: 1, border: "1px solid rgba(255,255,255,0.6)", padding: 1 }}>
                <span style={{ display: "block", width: "70%", height: "100%", background: skill.color, borderRadius: 0.5 }} />
              </span>
            </div>
          </div>

          {/* App title */}
          <div style={{ padding: "8px 4px 4px", fontFamily: "var(--font-display), sans-serif", fontSize: 13, fontWeight: 900, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            CloudPulse
          </div>

          {/* Messages */}
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
            {MESSAGES.map((m, i) => {
              const isYou = m.who === "You";
              const visible = i < shown;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isYou ? "flex-end" : "flex-start",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "5px 9px",
                      borderRadius: 10,
                      background: isYou ? skill.color : "rgba(255,255,255,0.07)",
                      color: isYou ? "white" : "#e2e8f0",
                      fontSize: 9,
                      fontWeight: 600,
                      lineHeight: 1.3,
                      fontFamily: "var(--font-display), sans-serif",
                    }}
                  >
                    {m.text}
                  </div>
                  <span style={{ fontSize: 7, color: "rgba(148,163,184,0.4)", marginTop: 2, fontFamily: "var(--font-mono), monospace" }}>
                    {m.who} · {m.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Voice waveform mock */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: skill.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 12px ${skill.color}88` }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "white" }} />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 1.5, height: 18 }}>
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    flex: 1,
                    background: skill.color,
                    borderRadius: 1,
                    opacity: 0.4 + (Math.sin(i * 0.7) + 1) * 0.3,
                    height: `${30 + Math.abs(Math.sin(i * 0.5)) * 60}%`,
                    animation: reduced ? undefined : `wave-${i % 5} ${1.4 + (i % 3) * 0.2}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave-0 { 0%,100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
        @keyframes wave-1 { 0%,100% { transform: scaleY(0.5); } 50% { transform: scaleY(0.9); } }
        @keyframes wave-2 { 0%,100% { transform: scaleY(0.7); } 50% { transform: scaleY(0.4); } }
        @keyframes wave-3 { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(0.85); } }
        @keyframes wave-4 { 0%,100% { transform: scaleY(0.6); } 50% { transform: scaleY(1); } }
      `}</style>
    </BaseCell>
  );
}

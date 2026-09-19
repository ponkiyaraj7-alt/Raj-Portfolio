"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/data/content";
import BaseCell from "./BaseCell";
import { useReducedMotion } from "../useReducedMotion";

interface Doc { name: string; score: number; preview: string; }
interface Frame { query: string; docs: Doc[]; answer: string; }

const FRAMES: Frame[] = [
  {
    query: "What payment provider does Commerce Hub use?",
    docs: [
      { name: "billing.ts",          score: 0.92, preview: "import Stripe from 'stripe';" },
      { name: "STRIPE_SETUP.mdx",    score: 0.87, preview: "## Configuring webhooks" },
      { name: "commerce.config.ts",   score: 0.81, preview: "stripe: { mode: 'payment' }" },
    ],
    answer: "Stripe — integrated via the Checkout API with webhook-driven entitlements.",
  },
  {
    query: "How does CloudPulse stream metrics in real-time?",
    docs: [
      { name: "telemetry/stream.ts", score: 0.94, preview: "const stream = await wsClient.connect..." },
      { name: "pulse.config.ts",     score: 0.86, preview: "monitoring: { interval: '200ms' }" },
      { name: "stream_pipeline.md",  score: 0.79, preview: "WS → 200ms chunks → Influx/UI" },
    ],
    answer: "WebSockets stream telemetry metrics at 200ms intervals, processed live, then rendered in real-time charts.",
  },
  {
    query: "What vector store powers ContentStudio's search?",
    docs: [
      { name: "vector/store.ts",        score: 0.91, preview: "import { Pinecone } from '@pinecone-database/..." },
      { name: "embeddings.ts",          score: 0.88, preview: "openai.embeddings.create({ model: 'text-embedding-3-large' })" },
      { name: "pgvector_fallback.sql",  score: 0.74, preview: "CREATE INDEX ... USING ivfflat" },
    ],
    answer: "Pinecone (primary) with pgvector as a self-hosted fallback for cost-sensitive tenants.",
  },
  {
    query: "Where does AI Platform deploy?",
    docs: [
      { name: "vercel.json",     score: 0.93, preview: "{ \"framework\": \"nextjs\" }" },
      { name: "edge-config.ts",  score: 0.84, preview: "export const runtime = 'edge';" },
      { name: "DEPLOY.md",       score: 0.76, preview: "Auto-deploys on push to main" },
    ],
    answer: "Vercel, on the Edge runtime — auto-deployed from main.",
  },
];

export default function RAGDemoCell({ skill, index = 0, span }: { skill: Skill; index?: number; span?: { col?: number; row?: number } }) {
  const reduced = useReducedMotion();
  const cellRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [frameIdx, setFrameIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "retrieving" | "answering" | "rest">("typing");
  const [typedQuery, setTypedQuery] = useState("");
  const [revealedDocs, setRevealedDocs] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState("");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Visibility — pause when offscreen
  useEffect(() => {
    if (!cellRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.15 }
    );
    obs.observe(cellRef.current);
    return () => obs.disconnect();
  }, []);

  // Reduced motion → static "answered" frame
  useEffect(() => {
    if (!reduced) return;
    const f = FRAMES[0];
    setTypedQuery(f.query);
    setRevealedDocs(f.docs.length);
    setTypedAnswer(f.answer);
    setPhase("rest");
  }, [reduced]);

  // Loop driver
  useEffect(() => {
    if (reduced || !visible || paused) return;
    const f = FRAMES[frameIdx];
    const clear = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
    clear();

    // Phase 1: type query (~28ms/char, jittered)
    setPhase("typing");
    setTypedQuery("");
    setRevealedDocs(0);
    setTypedAnswer("");
    let qi = 0;
    const typeQuery = () => {
      if (qi <= f.query.length) {
        setTypedQuery(f.query.slice(0, qi));
        qi += 1;
        timersRef.current.push(setTimeout(typeQuery, 22 + Math.random() * 28));
      } else {
        timersRef.current.push(setTimeout(retrieve, 320));
      }
    };

    // Phase 2: reveal docs one-by-one
    const retrieve = () => {
      setPhase("retrieving");
      let di = 0;
      const tick = () => {
        di += 1;
        setRevealedDocs(di);
        if (di < f.docs.length) timersRef.current.push(setTimeout(tick, 280));
        else timersRef.current.push(setTimeout(answer, 380));
      };
      tick();
    };

    // Phase 3: stream answer (variable token speeds)
    const answer = () => {
      setPhase("answering");
      let ai = 0;
      const tick = () => {
        if (ai <= f.answer.length) {
          setTypedAnswer(f.answer.slice(0, ai));
          // jitter — sometimes mid-word pauses to feel like tokens
          const isSpace = f.answer[ai] === " ";
          ai += 1;
          timersRef.current.push(setTimeout(tick, isSpace ? 60 + Math.random() * 60 : 22 + Math.random() * 28));
        } else {
          setPhase("rest");
          timersRef.current.push(setTimeout(() => {
            setFrameIdx((i) => (i + 1) % FRAMES.length);
          }, 2400));
        }
      };
      tick();
    };

    typeQuery();

    return clear;
  }, [frameIdx, visible, paused, reduced]);

  const f = FRAMES[frameIdx];

  return (
    <BaseCell
      ref={cellRef}
      color={skill.color}
      index={index}
      span={span}
      minHeight={360}
      padding="0"
      noTilt={false}
      ariaLabel="Demonstration: retrieval-augmented generation pipeline"
    >
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", padding: 22, gap: 14, zIndex: 1 }}
      >
        {/* Header strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: skill.color, fontFamily: "var(--font-mono), monospace" }}>
              {skill.name} · LIVE
            </span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(148,163,184,0.45)", fontFamily: "var(--font-mono), monospace" }}>
            RAG PIPELINE
          </span>
        </div>

        {/* Query bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 10,
            background: "rgba(0,0,0,0.35)",
            border: `1px solid ${skill.color}26`,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            color: "#e2e8f0",
            minHeight: 36,
          }}
        >
          <span style={{ color: skill.color, fontWeight: 700 }}>›</span>
          <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {typedQuery}
            {phase === "typing" && (
              <span style={{ display: "inline-block", width: 7, height: 13, marginLeft: 2, background: skill.color, verticalAlign: "middle", animation: "rag-blink 1s steps(2) infinite" }} />
            )}
          </span>
        </div>

        {/* Retrieved docs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minHeight: 0 }}>
          {f.docs.map((doc, i) => {
            const shown = revealedDocs > i;
            return (
              <div
                key={`${frameIdx}-${doc.name}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: shown ? `${skill.color}0d` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${shown ? skill.color + "22" : "rgba(255,255,255,0.05)"}`,
                  opacity: shown ? 1 : 0.35,
                  transform: shown ? "translateX(0)" : "translateX(8px)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10,
                }}
              >
                <span style={{ color: skill.color, fontWeight: 800, minWidth: 28 }}>
                  #{String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ color: "#e2e8f0", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {doc.name}
                </span>
                <span style={{ color: skill.color, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                  {shown ? doc.score.toFixed(2) : "···"}
                </span>
                <div
                  style={{
                    width: 36,
                    height: 3,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.07)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: shown ? `${doc.score * 100}%` : "0%",
                      height: "100%",
                      background: skill.color,
                      transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                      boxShadow: `0 0 6px ${skill.color}88`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Answer */}
        <div
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            background: `linear-gradient(135deg, ${skill.color}14 0%, rgba(255,255,255,0.02) 100%)`,
            border: `1px solid ${skill.color}33`,
            minHeight: 56,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: 8, left: 12, fontSize: 8, fontWeight: 800, letterSpacing: "0.18em", color: skill.color, fontFamily: "var(--font-mono), monospace" }}>
            ANSWER
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 12,
              lineHeight: 1.55,
              color: "#f1f5f9",
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.005em",
            }}
          >
            {typedAnswer}
            {phase === "answering" && (
              <span style={{ display: "inline-block", width: 6, height: 12, marginLeft: 2, background: skill.color, verticalAlign: "middle", animation: "rag-blink 1s steps(2) infinite" }} />
            )}
          </div>
        </div>

        {/* Frame indicator */}
        <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
          {FRAMES.map((_, i) => (
            <span
              key={i}
              style={{
                width: i === frameIdx ? 16 : 4,
                height: 4,
                borderRadius: 2,
                background: i === frameIdx ? skill.color : "rgba(255,255,255,0.1)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes rag-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </BaseCell>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Skill } from "@/data/content";
import { SkillIcon } from "../SkillIcons";

interface Props {
  open: boolean;
  onClose: () => void;
  skills: Skill[];
  onPick: (skill: Skill) => void;
}

function fuzzyScore(query: string, target: string): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return 1000 - (t.indexOf(q) * 2);
  // letter-sequence fuzzy
  let qi = 0, ti = 0, score = 0, gap = 0;
  while (qi < q.length && ti < t.length) {
    if (q[qi] === t[ti]) { score += 10 - Math.min(gap, 8); qi += 1; gap = 0; }
    else { gap += 1; }
    ti += 1;
  }
  if (qi < q.length) return 0;
  return score;
}

export default function CommandPalette({ open, onClose, skills, onPick }: Props) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const results = useMemo(() => {
    if (!q.trim()) return skills.slice(0, 30);
    return skills
      .map((s) => {
        const haystack = `${s.name} ${s.role} ${s.tag} ${s.category} ${(s.projects ?? []).join(" ")}`;
        return { s, score: fuzzyScore(q, haystack) + fuzzyScore(q, s.name) * 2 };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 30)
      .map((r) => r.s);
  }, [q, skills]);

  useEffect(() => { setActive(0); }, [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      const pick = results[active];
      if (pick) { onPick(pick); onClose(); }
    }
  };

  // keep active item in view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "12vh 16px 16px",
          }}
        >
          <motion.div
            initial={{ y: -16, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search tools"
            style={{
              width: "100%",
              maxWidth: 580,
              borderRadius: 18,
              background: "rgba(15,20,25,0.92)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
              overflow: "hidden",
              backdropFilter: "blur(24px) saturate(150%)",
              WebkitBackdropFilter: "blur(24px) saturate(150%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="rgba(148,163,184,0.7)" strokeWidth="1.5" aria-hidden>
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11L14 14" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Search 33 tools, projects, frameworks…"
                aria-label="Search"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#f1f5f9",
                  fontSize: 14,
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              />
              <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 5, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(148,163,184,0.6)", fontFamily: "var(--font-mono), monospace" }}>
                ESC
              </span>
            </div>

            <div ref={listRef} style={{ maxHeight: 400, overflowY: "auto", padding: 8 }}>
              {results.length === 0 ? (
                <div style={{ padding: 28, textAlign: "center", fontSize: 12, color: "rgba(148,163,184,0.55)", fontFamily: "var(--font-mono), monospace" }}>
                  no matches — try “rag”, “flutter”, or “stripe”
                </div>
              ) : (
                results.map((s, i) => (
                  <button
                    key={s.name}
                    data-idx={i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => { onPick(s); onClose(); }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid transparent",
                      background: active === i ? `${s.color}14` : "transparent",
                      borderColor: active === i ? `${s.color}33` : "transparent",
                      color: "#e2e8f0",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.12s ease, border-color 0.12s ease",
                      outline: "none",
                    }}
                  >
                    <span style={{ width: 28, height: 28, borderRadius: "30%/40%", background: `${s.color}1a`, border: `1px solid ${s.color}33`, padding: 5, flexShrink: 0 }}>
                      <SkillIcon name={s.name} color={s.color} />
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#f1f5f9", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.01em" }}>
                        {s.name}
                      </span>
                      <span style={{ display: "block", fontSize: 10, color: "rgba(148,163,184,0.55)", fontFamily: "var(--font-mono), monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {s.role} · {s.category}
                      </span>
                    </span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: s.color, padding: "2px 6px", borderRadius: 5, background: `${s.color}1a`, fontFamily: "var(--font-mono), monospace", flexShrink: 0 }}>
                      {s.tag}
                    </span>
                    {active === i && (
                      <span style={{ fontSize: 9, color: "rgba(148,163,184,0.5)", fontFamily: "var(--font-mono), monospace", flexShrink: 0 }}>
                        ↵
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
            <div style={{ padding: "8px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(148,163,184,0.5)", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.05em" }}>
              <span>↑↓ navigate</span>
              <span>↵ jump</span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

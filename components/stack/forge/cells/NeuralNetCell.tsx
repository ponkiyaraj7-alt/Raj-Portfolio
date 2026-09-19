"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/data/content";
import BaseCell from "./BaseCell";
import { useReducedMotion } from "../useReducedMotion";

interface Particle { edgeIdx: number; t: number; speed: number; }

export default function NeuralNetCell({ skill, index = 0, span }: { skill: Skill; index?: number; span?: { col?: number; row?: number } }) {
  const reduced = useReducedMotion();
  const cellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!cellRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.15 }
    );
    obs.observe(cellRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    const canvas = canvasRef.current;
    const host = cellRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = 0;
    const THROTTLE = 33;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = host.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Build a 3 → 5 → 5 → 2 net
    const layers = [3, 5, 5, 2];
    const computeNodes = (w: number, h: number) => {
      const padX = 28;
      const padY = 30;
      const usableW = w - padX * 2;
      const usableH = h - padY * 2;
      const nodes: { x: number; y: number; layer: number }[] = [];
      layers.forEach((count, li) => {
        const x = padX + (usableW * li) / (layers.length - 1);
        for (let i = 0; i < count; i++) {
          const y = padY + (usableH * (i + 0.5)) / count;
          nodes.push({ x, y, layer: li });
        }
      });
      return nodes;
    };

    let nodes = computeNodes(canvas.width / dpr, canvas.height / dpr);
    const edges: [number, number][] = [];
    nodes.forEach((a, ai) => {
      nodes.forEach((b, bi) => {
        if (b.layer === a.layer + 1) edges.push([ai, bi]);
      });
    });

    const particles: Particle[] = [];
    for (let i = 0; i < 14; i++) {
      particles.push({ edgeIdx: Math.floor(Math.random() * edges.length), t: Math.random(), speed: 0.0006 + Math.random() * 0.0008 });
    }

    const hex = (h: string, a: number) => {
      const r = parseInt(h.slice(1, 3), 16);
      const g = parseInt(h.slice(3, 5), 16);
      const b = parseInt(h.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    const draw = (t: number) => {
      if (t - last < THROTTLE) { raf = requestAnimationFrame(draw); return; }
      const dt = t - last;
      last = t;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // refresh nodes if size changed
      if (Math.abs(nodes[nodes.length - 1].x - (w - 28)) > 4) {
        nodes = computeNodes(w, h);
      }

      ctx.clearRect(0, 0, w, h);

      // edges
      edges.forEach(([ai, bi]) => {
        const a = nodes[ai];
        const b = nodes[bi];
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, hex(skill.color, 0.18));
        grad.addColorStop(1, hex(skill.color, 0.04));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // particles
      particles.forEach((p) => {
        p.t += p.speed * dt;
        if (p.t > 1) {
          p.t = 0;
          // jump to a forward edge starting from where this one ended
          const [, prevB] = edges[p.edgeIdx];
          const candidates = edges.filter(([a]) => a === prevB);
          if (candidates.length) {
            p.edgeIdx = edges.indexOf(candidates[Math.floor(Math.random() * candidates.length)]);
          } else {
            // restart from input layer
            const inputs = edges.filter(([a]) => nodes[a].layer === 0);
            p.edgeIdx = edges.indexOf(inputs[Math.floor(Math.random() * inputs.length)]);
          }
        }
        const [ai, bi] = edges[p.edgeIdx];
        const a = nodes[ai];
        const b = nodes[bi];
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
        grad.addColorStop(0, hex(skill.color, 0.95));
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = hex(skill.color, 0.85);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, 7, 0, Math.PI * 2);
        ctx.strokeStyle = hex(skill.color, 0.25);
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [visible, reduced, skill.color]);

  return (
    <BaseCell
      ref={cellRef}
      color={skill.color}
      index={index}
      span={span}
      minHeight={220}
      padding="20px"
      noTilt={true}
      ariaLabel="Demonstration: neural network token flow"
    >
      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", gap: 10, zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: skill.color, fontFamily: "var(--font-mono), monospace" }}>
              {skill.name}
            </span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(148,163,184,0.45)", fontFamily: "var(--font-mono), monospace" }}>
            GPT · CLAUDE · GEMINI
          </span>
        </div>
        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
          <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} aria-hidden />
        </div>
        <div style={{ fontSize: 10, color: "rgba(148,163,184,0.55)", fontFamily: "var(--font-mono), monospace", textAlign: "center" }}>
          token_flow → forward_pass → completion
        </div>
      </div>
    </BaseCell>
  );
}

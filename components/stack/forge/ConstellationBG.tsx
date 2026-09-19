"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

// Seeded random — deterministic so SSR/CSR match.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLORS = ["#52b788", "#A855F7", "#61DAFB", "#027DFD", "#10A37F", "#F97316"];
const NODE_COUNT = 16;
const LINK_DIST = 280;

interface Node { x: number; y: number; baseX: number; baseY: number; color: string; r: number; }

export default function ConstellationBG() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0 }
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !visible) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0, H = 0;
    const rng = mulberry32(20260509);

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Build nodes (deterministic positions in 0..1, scaled at draw time)
    const seed: { fx: number; fy: number; color: string; r: number }[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      seed.push({
        fx: rng(),
        fy: rng(),
        color: COLORS[Math.floor(rng() * COLORS.length)],
        r: 1.6 + rng() * 1.4,
      });
    }
    let nodes: Node[] = seed.map((s) => ({
      baseX: s.fx * W, baseY: s.fy * H,
      x: s.fx * W,     y: s.fy * H,
      color: s.color,  r: s.r,
    }));

    const ro = new ResizeObserver(() => {
      resize();
      nodes = seed.map((s) => ({
        baseX: s.fx * W, baseY: s.fy * H,
        x: s.fx * W,     y: s.fy * H,
        color: s.color,  r: s.r,
      }));
    });
    ro.observe(wrap);

    let raf = 0;
    let last = 0;
    const THROTTLE = 33;

    const onMouse = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = null; };
    wrap.addEventListener("mousemove", onMouse);
    wrap.addEventListener("mouseleave", onLeave);

    const hex = (h: string, a: number) => {
      const r = parseInt(h.slice(1, 3), 16);
      const g = parseInt(h.slice(3, 5), 16);
      const b = parseInt(h.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    const draw = (t: number) => {
      if (t - last < THROTTLE) { raf = requestAnimationFrame(draw); return; }
      last = t;

      ctx.clearRect(0, 0, W, H);

      // Drift each node a tiny bit toward mouse (spring-ish)
      nodes.forEach((n) => {
        const m = mouseRef.current;
        if (m && !reduced) {
          const dx = m.x - n.baseX;
          const dy = m.y - n.baseY;
          const d = Math.hypot(dx, dy);
          const pull = d < 280 ? (1 - d / 280) * 14 : 0;
          const tx = n.baseX + (dx / (d || 1)) * pull;
          const ty = n.baseY + (dy / (d || 1)) * pull;
          n.x += (tx - n.x) * 0.06;
          n.y += (ty - n.y) * 0.06;
        } else {
          n.x += (n.baseX - n.x) * 0.04;
          n.y += (n.baseY - n.y) * 0.04;
        }
      });

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK_DIST) continue;
          const alpha = (1 - d / LINK_DIST) * 0.18;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, hex(a.color, alpha));
          grad.addColorStop(1, hex(b.color, alpha));
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = hex(n.color, 0.55);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.4, 0, Math.PI * 2);
        ctx.strokeStyle = hex(n.color, 0.12);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      // Single static frame
      const drawStatic = () => {
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > LINK_DIST) continue;
            const alpha = (1 - d / LINK_DIST) * 0.14;
            ctx.strokeStyle = hex(a.color, alpha);
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        nodes.forEach((n) => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = hex(n.color, 0.5);
          ctx.fill();
        });
      };
      drawStatic();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMouse);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [visible, reduced]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "auto",
        opacity: 0.55,
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
    </div>
  );
}

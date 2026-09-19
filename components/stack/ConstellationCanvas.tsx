"use client";

import { useRef, useEffect } from "react";

interface Node {
  x: number;
  y: number;
  color: string;
}

interface ConstellationCanvasProps {
  nodes: Node[];
  width: number;
  height: number;
}

interface Particle {
  edge: number;
  t: number;
  speed: number;
}

export default function ConstellationCanvas({ nodes, width, height }: ConstellationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || nodes.length < 2) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        edges.push([i, j]);
      }
    }

    if (particlesRef.current.length === 0) {
      edges.forEach((_, ei) => {
        for (let k = 0; k < 2; k++) {
          particlesRef.current.push({
            edge: ei,
            t: Math.random(),
            speed: 0.0004 + Math.random() * 0.0003,
          });
        }
      });
    }

    const THROTTLE_MS = 33;

    const draw = (timestamp: number) => {
      if (timestamp - lastFrameRef.current < THROTTLE_MS) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameRef.current = timestamp;

      ctx.clearRect(0, 0, width, height);

      edges.forEach(([ai, bi]) => {
        const a = nodes[ai];
        const b = nodes[bi];

        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, hexAlpha(a.color, 0.18));
        grad.addColorStop(0.5, hexAlpha(a.color, 0.08));
        grad.addColorStop(1, hexAlpha(b.color, 0.18));

        ctx.setLineDash([4, 10]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      particlesRef.current.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;

        const [ai, bi] = edges[p.edge];
        const a = nodes[ai];
        const b = nodes[bi];
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 5);
        gradient.addColorStop(0, hexAlpha(a.color, 0.9));
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [nodes, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

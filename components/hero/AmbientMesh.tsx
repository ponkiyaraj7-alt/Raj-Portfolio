"use client";
// Layer 0 — Ambient WebGL gradient mesh.
// Slow simplex-noise driven 4-stop gradient. Pauses on tab hide. Off on reduced motion.
// Total runtime cost: ~2-4ms/frame on mid-tier laptop, runs at 30fps cap.

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const VERT = /* glsl */ `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uColorD;

// 2D simplex noise (Ashima)
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

void main() {
  vec2 uv = vUv;
  // Aspect-correct sample coords
  vec2 p = uv;
  p.x *= uResolution.x / max(uResolution.y, 1.0);

  float t = uTime * 0.06;

  float n1 = snoise(p * 1.4 + vec2(t, t * 0.7));
  float n2 = snoise(p * 2.1 + vec2(-t * 0.8, t * 0.5));
  float n3 = snoise(p * 0.9 + vec2(t * 0.4, -t));

  // 4-color smooth mix
  vec3 col = mix(uColorA, uColorB, smoothstep(-0.6, 0.6, n1));
  col = mix(col, uColorC, smoothstep(-0.6, 0.6, n2) * 0.55);
  col = mix(col, uColorD, smoothstep(-0.6, 0.6, n3) * 0.35);

  // Subtle vignette to focus center
  float d = distance(uv, vec2(0.5));
  col *= smoothstep(1.05, 0.30, d) * 0.6 + 0.55;

  // Slight top-down darken (premium feel)
  col *= mix(1.0, 0.78, smoothstep(0.0, 1.0, uv.y));

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function AmbientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Low-end detection — bail on weak hardware to protect frame rate
    const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile || cores < 4) {
      // Static fallback: paint once with a CSS-equivalent gradient
      canvas.style.background = "radial-gradient(ellipse at 50% 0%, #0f1f2c 0%, #0a1118 55%, #06090e 100%)";
      return;
    }

    let cancelled = false;
    let raf = 0;
    let lastFrame = 0;
    const MIN_FRAME_MS = 1000 / 30; // 30fps cap

    let renderer: import("ogl").Renderer | null = null;
    let program: import("ogl").Program | null = null;
    let mesh: import("ogl").Mesh | null = null;

    let cleanupResize: (() => void) | null = null;
    let cleanupVisibility: (() => void) | null = null;

    let isRunning = true;

    (async () => {
      const { Renderer, Program, Mesh, Triangle } = await import("ogl");
      if (cancelled) return;

      renderer = new Renderer({ canvas, dpr: Math.min(window.devicePixelRatio, 1.5), alpha: false });
      const gl = renderer.gl;
      gl.clearColor(0.04, 0.06, 0.09, 1);

      const geometry = new Triangle(gl);

      program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [canvas.clientWidth, canvas.clientHeight] },
          uColorA: { value: [0.04, 0.07, 0.10] }, // deep slate
          uColorB: { value: [0.05, 0.13, 0.16] }, // deep teal
          uColorC: { value: [0.06, 0.20, 0.18] }, // forest hint
          uColorD: { value: [0.07, 0.15, 0.22] }, // ocean blue
        },
      });

      mesh = new Mesh(gl, { geometry, program });

      const onResize = () => {
        if (!renderer || !program) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h);
        program.uniforms.uResolution.value = [w, h];
      };
      onResize();
      window.addEventListener("resize", onResize);
      cleanupResize = () => window.removeEventListener("resize", onResize);

      const onVisibility = () => { isRunning = document.visibilityState === "visible"; };
      document.addEventListener("visibilitychange", onVisibility);
      cleanupVisibility = () => document.removeEventListener("visibilitychange", onVisibility);

      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        if (!isRunning) { raf = requestAnimationFrame(tick); return; }
        if (now - lastFrame >= MIN_FRAME_MS && renderer && program && mesh) {
          program.uniforms.uTime.value = (now - start) * 0.001;
          renderer.render({ scene: mesh });
          lastFrame = now;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cleanupResize?.();
      cleanupVisibility?.();
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        // Static fallback if WebGL never initializes
        background: "radial-gradient(ellipse at 50% 0%, #0f1f2c 0%, #0a1118 55%, #06090e 100%)",
      }}
    />
  );
}

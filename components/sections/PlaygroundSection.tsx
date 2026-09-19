"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── 1. Gravity Garden ────────────────────────────────────────────────────────

type Seed = { x: number; y: number; vy: number; active: boolean; id: string };

type Leaf = { x: number; y: number; scale: number; color: string };

type Branch = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    currentX: number;
    currentY: number;
    angle: number;
    targetLength: number;
    length: number;
    width: number;
    generation: number;
    finished: boolean;
    children: Branch[];
    leaf?: Leaf;
};

type Plant = {
    id: string;
    root: Branch;
    alpha: number;
};

function GravityGarden() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const seeds = useRef<Seed[]>([]);
    const plants = useRef<Plant[]>([]);
    const frameRef = useRef<number>(0);

    // Initialize observer
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Handle Resize
    useEffect(() => {
        const resize = () => {
            if (canvasRef.current && containerRef.current) {
                canvasRef.current.width = containerRef.current.clientWidth;
                canvasRef.current.height = containerRef.current.clientHeight;
            }
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const createBranch = (x: number, y: number, angle: number, gen: number): Branch => {
        const targetLength = gen === 0 ? 30 + Math.random() * 40 : 15 + Math.random() * 30;
        return {
            startX: x, startY: y,
            currentX: x, currentY: y,
            endX: 0, endY: 0, // Calculated dynamically
            angle, targetLength, length: 0,
            width: Math.max(1, 4 - gen),
            generation: gen,
            finished: false,
            children: []
        };
    };

    const addSeed = (x: number, y: number) => {
        seeds.current.push({ x, y, vy: 0, active: true, id: Math.random().toString() });
    };

    useEffect(() => {
        if (!isVisible || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const leafColors = ["#2d6a4f", "#52b788", "#95d5b2", "#b7e4c7"];

        const drawBranch = (b: Branch, alpha: number) => {
            ctx.beginPath();
            ctx.moveTo(b.startX, b.startY);
            ctx.lineTo(b.currentX, b.currentY);
            ctx.strokeStyle = `rgba(45, 106, 79, ${alpha})`;
            ctx.lineWidth = b.width;
            ctx.lineCap = "round";
            ctx.stroke();

            if (b.leaf) {
                const grad = ctx.createRadialGradient(b.leaf.x, b.leaf.y, 0, b.leaf.x, b.leaf.y, 6 * b.leaf.scale);
                grad.addColorStop(0, "#d8f3dc");
                grad.addColorStop(1, b.leaf.color);
                ctx.beginPath();
                ctx.arc(b.leaf.x, b.leaf.y, 6 * b.leaf.scale, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.globalAlpha = alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            b.children.forEach(child => drawBranch(child, alpha));
        };

        const updateBranch = (b: Branch) => {
            if (!b.finished) {
                b.length += 2;
                if (b.length >= b.targetLength) {
                    b.length = b.targetLength;
                    b.finished = true;
                    // Spawning children or leaf
                    if (b.generation < 3 && Math.random() > 0.2) {
                        const numChildren = Math.floor(Math.random() * 3) + 1; // 1 to 3
                        for (let i = 0; i < numChildren; i++) {
                            const offset = (Math.random() * 1.2 - 0.6); // -0.6 to 0.6 rads (~ ±35 deg)
                            b.children.push(createBranch(b.currentX, b.currentY, b.angle + offset, b.generation + 1));
                        }
                    } else {
                        b.leaf = {
                            x: b.currentX, y: b.currentY, scale: 0,
                            color: leafColors[Math.floor(Math.random() * leafColors.length)]
                        };
                    }
                }
                b.currentX = b.startX + Math.cos(b.angle) * b.length;
                b.currentY = b.startY + Math.sin(b.angle) * b.length;
            } else {
                if (b.leaf && b.leaf.scale < 1) b.leaf.scale += 0.05;
                b.children.forEach(updateBranch);
            }
        };

        const loop = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            // Draw soil
            ctx.beginPath();
            ctx.moveTo(0, ctx.canvas.height - 10);
            ctx.lineTo(ctx.canvas.width, ctx.canvas.height - 10);
            ctx.strokeStyle = "rgba(0,0,0,0.05)";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Update & Draw Seeds
            seeds.current.forEach(s => {
                if (!s.active) return;
                s.vy += 0.3; // Gravity
                s.y += s.vy;
                
                ctx.beginPath();
                ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = "#2d6a4f";
                ctx.fill();

                if (s.y >= ctx.canvas.height - 10) {
                    s.y = ctx.canvas.height - 10;
                    s.active = false;
                    plants.current.push({
                        id: s.id,
                        alpha: 1,
                        root: createBranch(s.x, s.y, -Math.PI / 2 + (Math.random() * 0.4 - 0.2), 0)
                    });
                }
            });
            seeds.current = seeds.current.filter(s => s.active);

            // Update & Draw Plants
            if (plants.current.length > 15) {
                plants.current[0].alpha -= 0.02;
                if (plants.current[0].alpha <= 0) {
                    plants.current.shift();
                }
            }

            plants.current.forEach(p => {
                updateBranch(p.root);
                drawBranch(p.root, p.alpha);
            });

            frameRef.current = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(frameRef.current);
    }, [isVisible]);

    const handleInteract = (clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        addSeed(clientX - rect.left, clientY - rect.top);
    };

    return (
        <div 
            ref={containerRef} 
            style={{ width: "100%", height: "320px", position: "relative", cursor: "pointer" }}
            onClick={(e) => handleInteract(e.clientX, e.clientY)}
            onTouchStart={(e) => {
                e.preventDefault();
                handleInteract(e.touches[0].clientX, e.touches[0].clientY);
            }}
        >
            <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
        </div>
    );
}

// ─── 2. Particle Painter ──────────────────────────────────────────────────────

type Particle = {
    x: number; y: number;
    vx: number; vy: number;
    life: number; maxLife: number;
    size: number; r: number; g: number; b: number;
};

function ParticlePainter() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const particles = useRef<Particle[]>([]);
    const lastMouse = useRef<{x: number, y: number, time: number} | null>(null);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const resize = () => {
            if (canvasRef.current && containerRef.current) {
                canvasRef.current.width = containerRef.current.clientWidth;
                canvasRef.current.height = containerRef.current.clientHeight;
            }
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const emitParticles = (mx: number, my: number, speed: number) => {
        // Speed interpolation: 0-2 -> green, > 10 -> gold
        let r, g, b;
        const s = Math.min(speed, 10) / 10;
        // Green: #52b788 (82, 183, 136)
        // Gold: #b68d40 (182, 141, 64)
        r = 82 + (182 - 82) * s;
        g = 183 + (141 - 183) * s;
        b = 136 + (64 - 136) * s;

        const count = Math.min(Math.floor(speed) + 2, 5);
        for (let i = 0; i < count; i++) {
            particles.current.push({
                x: mx, y: my,
                vx: (Math.random() - 0.5) * (speed * 0.4 + 1),
                vy: (Math.random() - 0.5) * (speed * 0.4 + 1),
                maxLife: 40 + Math.random() * 30,
                life: 40 + Math.random() * 30,
                size: 2 + Math.random() * 4 + s * 3,
                r, g, b
            });
        }

        if (particles.current.length > 300) {
            particles.current.splice(0, particles.current.length - 300);
        }
    };

    useEffect(() => {
        if (!isVisible || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        // Start with a clean slate
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const loop = () => {
            // Fade out existing trails slightly
            ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            ctx.globalCompositeOperation = "source-over";

            particles.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life--;
                p.size = Math.max(0.1, p.size * 0.96);

                const alpha = p.life / p.maxLife;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`;
                ctx.fill();
            });

            particles.current = particles.current.filter(p => p.life > 0);
            frameRef.current = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(frameRef.current);
    }, [isVisible]);

    const handlePointerMove = (clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mx = clientX - rect.left;
        const my = clientY - rect.top;
        const now = performance.now();

        if (lastMouse.current) {
            const dx = mx - lastMouse.current.x;
            const dy = my - lastMouse.current.y;
            const dt = Math.max(1, now - lastMouse.current.time);
            const speed = Math.sqrt(dx * dx + dy * dy) / dt * 10;
            emitParticles(mx, my, speed);
        }
        
        lastMouse.current = { x: mx, y: my, time: now };
    };

    return (
        <div 
            ref={containerRef} 
            style={{ width: "100%", height: "320px", position: "relative", cursor: "crosshair" }}
            onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
            onTouchMove={(e) => {
                e.preventDefault();
                handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onMouseLeave={() => { lastMouse.current = null; }}
            onTouchEnd={() => { lastMouse.current = null; }}
        >
            <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%", borderRadius: "20px 20px 0 0" }} />
        </div>
    );
}

// ─── 3. Magnetic Typography ───────────────────────────────────────────────────

function MagneticTypography() {
    const containerRef = useRef<HTMLDivElement>(null);
    const word = "CREATE";
    const letters = word.split("");
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    
    const handleMove = (clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: clientX - rect.left, y: clientY - rect.top });
    };

    const handleLeave = () => {
        setMousePos({ x: -1000, y: -1000 });
    };

    return (
        <div 
            ref={containerRef}
            style={{ 
                width: "100%", height: "320px", position: "relative", 
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", backgroundColor: "#fcfcfc"
            }}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
            onMouseLeave={handleLeave}
            onTouchEnd={handleLeave}
        >
            <div style={{ display: "flex", gap: "2px" }}>
                {letters.map((char, i) => {
                    return (
                        <MagneticLetter 
                            key={i} 
                            char={char} 
                            containerMouseX={mousePos.x} 
                            containerMouseY={mousePos.y} 
                            containerRef={containerRef}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function MagneticLetter({ char, containerMouseX, containerMouseY, containerRef }: { char: string, containerMouseX: number, containerMouseY: number, containerRef: React.RefObject<HTMLDivElement | null> }) {
    const letterRef = useRef<HTMLSpanElement>(null);
    const [transform, setTransform] = useState({ x: 0, y: 0, color: "#1d1d1f" });
    const frameRef = useRef<number>(0);
    const currentTx = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!letterRef.current || !containerRef.current) return;
        
        // Target calculation
        let targetX = 0;
        let targetY = 0;
        let color = "#1d1d1f";

        if (containerMouseX !== -1000) {
            // Get center of letter relative to container
            const lRect = letterRef.current.getBoundingClientRect();
            const cRect = containerRef.current.getBoundingClientRect();
            const centerX = (lRect.left - cRect.left) + lRect.width / 2;
            const centerY = (lRect.top - cRect.top) + lRect.height / 2;

            const dx = containerMouseX - centerX;
            const dy = containerMouseY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const influenceRadius = 120;
            if (dist < influenceRadius) {
                const force = (influenceRadius - dist) / influenceRadius; // 0 to 1
                targetX = dx * force * 0.4;
                targetY = dy * force * 0.4;
                // Interpolate color to #2d6a4f based on force
                color = `rgba(${29 - force * (29 - 45)}, ${29 + force * (106 - 29)}, ${31 + force * (79 - 31)}, 1)`;
            }
        }

        // Spring interpolation loop
        const animate = () => {
            currentTx.current.x += (targetX - currentTx.current.x) * 0.15;
            currentTx.current.y += (targetY - currentTx.current.y) * 0.15;
            
            setTransform({ x: currentTx.current.x, y: currentTx.current.y, color });
            
            // Only continue loop if still moving significantly
            if (Math.abs(targetX - currentTx.current.x) > 0.1 || Math.abs(targetY - currentTx.current.y) > 0.1) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };
        
        frameRef.current = requestAnimationFrame(animate);
        return () => { if(frameRef.current) cancelAnimationFrame(frameRef.current) };
    }, [containerMouseX, containerMouseY, containerRef]);

    return (
        <span 
            ref={letterRef}
            style={{
                display: "inline-block",
                fontSize: "clamp(48px, 6vw, 72px)",
                fontWeight: 800,
                color: transform.color,
                fontFamily: "var(--font-display), sans-serif",
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
                willChange: "transform",
                pointerEvents: "none",
                userSelect: "none"
            }}
        >
            {char}
        </span>
    );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function PlaygroundSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        
        if (headingRef.current) {
            gsap.fromTo(headingRef.current.children,
               { y: 30, opacity: 0 },
               { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } }
            );
        }

        if (cardsRef.current) {
            const cards = cardsRef.current.children;
            gsap.fromTo(cards,
               { y: 60, opacity: 0 },
               { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: cardsRef.current, start: "top 80%" } }
            );
        }
    }, []);

    const cardStyle: React.CSSProperties = {
        background: "#fff",
        borderRadius: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03), 0 8px 32px rgba(0,0,0,0.05)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "400px"
    };

    const labelStyle: React.CSSProperties = {
        padding: "20px 24px",
        borderTop: "1px solid rgba(0,0,0,0.04)",
        backgroundColor: "#ffffff",
        flexGrow: 1
    };

    return (
        <section
            id="playground"
            ref={sectionRef}
            style={{
                backgroundColor: "#f7f7f8",
                padding: "160px 0",
                width: "100%",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
                
                <div ref={headingRef} style={{ maxWidth: "800px", marginBottom: "64px" }}>
                    <div style={{
                        fontSize: "12px", fontWeight: 600, textTransform: "uppercase",
                        letterSpacing: "0.2em", color: "#86868b", marginBottom: "24px"
                    }}>
                        — Interactive Design
                    </div>
                    
                    <h2 
                        style={{
                            fontSize: "clamp(34px, 4.2vw, 58px)", fontWeight: 800,
                            lineHeight: 1.06, letterSpacing: "-0.04em", color: "#0f172a",
                            fontFamily: "var(--font-display), sans-serif", margin: "0 0 24px 0"
                        }}
                    >
                        Because good software<br />should feel alive.
                    </h2>

                    <p style={{
                        fontSize: "20px", lineHeight: 1.6, color: "#6e6e73", margin: 0, maxWidth: "600px"
                    }}>
                        Tap, hover, and play. These aren't demos — they're proof
                        that digital experiences can feel as alive as nature.
                    </p>
                </div>

                <div 
                    ref={cardsRef}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "24px",
                        width: "100%"
                    }}
                >
                    {/* Gravity Garden */}
                    <div style={cardStyle}>
                        <GravityGarden />
                        <div style={labelStyle}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0, fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>
                                Gravity Garden
                            </h3>
                            <p style={{ fontSize: "14px", color: "#86868b", marginTop: "4px", margin: "4px 0 0 0" }}>
                                Click to plant. Watch it grow.
                            </p>
                        </div>
                    </div>

                    {/* Particle Painter */}
                    <div style={cardStyle}>
                        <ParticlePainter />
                        <div style={labelStyle}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0, fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>
                                Particle Painter
                            </h3>
                            <p style={{ fontSize: "14px", color: "#86868b", marginTop: "4px", margin: "4px 0 0 0" }}>
                                Move your cursor. Speed changes color.
                            </p>
                        </div>
                    </div>

                    {/* Magnetic Typography */}
                    <div style={cardStyle}>
                        <MagneticTypography />
                        <div style={labelStyle}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0, fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>
                                Magnetic Type
                            </h3>
                            <p style={{ fontSize: "14px", color: "#86868b", marginTop: "4px", margin: "4px 0 0 0" }}>
                                Hover over the letters. They follow you.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

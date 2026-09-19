"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allProjects, Project } from "@/data/content";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

function CategoryIcon({ type, color }: { type: string, color: string }) {
    const t = type.toLowerCase();
    const iconStyle = { color };
    
    // AI App
    if (t.includes("ai") || t.includes("voice")) {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                <path d="M12 2v20M17 5v14M22 10v4M7 5v14M2 10v4"/>
            </svg>
        );
    }
    // E-commerce
    if (t.includes("commerce") || t.includes("store")) {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
        );
    }
    // SaaS / Platform
    if (t.includes("saas") || t.includes("platform") || t.includes("generation")) {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        );
    }
    
    // Default Web
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
    );
}

const AppsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#86868b" }}>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
);

const GlobeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#86868b" }}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
);

const SectionBgSvg = () => (
    <div style={{ position: "absolute", top: "50px", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "800px", zIndex: 0, pointerEvents: "none", opacity: 0.05, display: "flex", justifyContent: "center" }}>
        <svg viewBox="0 0 800 300" width="800" height="300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 150 C 100 50, 300 250, 500 150 S 700 300, 900 100" stroke="#2d6a4f" strokeWidth="2" />
            <path d="M-50 200 C 150 100, 250 300, 450 200 S 650 350, 850 150" stroke="#2d6a4f" strokeWidth="1" />
            <path d="M100 0 C 200 150, 400 50, 600 200 S 800 0, 900 200" stroke="#2d6a4f" strokeWidth="1" />
            <circle cx="150" cy="115" r="4" fill="#2d6a4f" />
            <circle cx="280" cy="195" r="6" fill="#2d6a4f" />
            <circle cx="430" cy="215" r="4" fill="#2d6a4f" />
            <circle cx="500" cy="150" r="5" fill="#2d6a4f" />
            <circle cx="680" cy="215" r="7" fill="#2d6a4f" />
            <circle cx="220" cy="118" r="3" fill="#2d6a4f" />
            <circle cx="560" cy="180" r="3" fill="#2d6a4f" />
            <line x1="150" y1="115" x2="280" y2="195" stroke="#2d6a4f" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="280" y1="195" x2="430" y2="215" stroke="#2d6a4f" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="430" y1="215" x2="500" y2="150" stroke="#2d6a4f" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="500" y1="150" x2="680" y2="215" stroke="#2d6a4f" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="220" y1="118" x2="560" y2="180" stroke="#2d6a4f" strokeWidth="0.5" strokeDasharray="2 6" />
        </svg>
    </div>
);

function Accordion({ title, content }: { title: string, content: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!contentRef.current || !iconRef.current) return;
        
        if (isOpen) {
            gsap.to(contentRef.current, { height: "auto", duration: 0.4, ease: "power2.out", opacity: 1, marginTop: "16px" });
            gsap.to(iconRef.current, { rotation: 180, duration: 0.3, ease: "power2.inOut" });
        } else {
            gsap.to(contentRef.current, { height: 0, duration: 0.3, ease: "power2.inOut", opacity: 0, marginTop: 0 });
            gsap.to(iconRef.current, { rotation: 0, duration: 0.3, ease: "power2.inOut" });
        }
    }, [isOpen]);

    return (
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%",
                    background: "none", border: "none", padding: "8px 0", cursor: "pointer",
                    fontFamily: "var(--font-display), sans-serif", fontSize: "14px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em"
                }}
            >
                {title}
                <svg ref={iconRef} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <div ref={contentRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
                <div style={{ backgroundColor: "#f7f7f8", borderRadius: "8px", padding: "16px" }}>
                    <p style={{ 
                        margin: 0, fontSize: "14px", lineHeight: 1.75, color: "#475569", 
                        fontFamily: "var(--font-inter), Inter, sans-serif", whiteSpace: "pre-wrap"
                    }}>
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}

function PhoneFrame({ src, accentColor, alt }: { src: string, accentColor: string, alt: string }) {
    const frameRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!frameRef.current || window.innerWidth <= 768) return;
        const frame = frameRef.current;
        const rect = frame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        
        gsap.to(frame, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1200 });
    };

    const handleMouseLeave = () => {
        if (!frameRef.current) return;
        gsap.to(frameRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" });
    };

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: "320px", margin: "0 auto", perspective: "1200px" }}>
            <div className="accent-glow" style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: "300px", height: "300px", borderRadius: "50%",
                background: accentColor, opacity: 0.1, filter: "blur(60px)", pointerEvents: "none", zIndex: 0
            }} />

            <div 
                ref={frameRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    position: "relative", zIndex: 1, width: "100%", aspectRatio: "428/926",
                    backgroundColor: "#1d1d1f", borderRadius: "40px", padding: "12px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)", border: "1px solid rgba(255,255,255,0.1)",
                    transformStyle: "preserve-3d"
                }}
            >
                <div style={{
                    width: "100%", height: "100%", backgroundColor: "#000",
                    borderRadius: "32px", overflow: "hidden", position: "relative",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
                }}>
                    <div style={{
                        position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)",
                        width: "120px", height: "32px", backgroundColor: "#000",
                        borderRadius: "16px", zIndex: 10
                    }} />
                    
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                      <Image src={src} alt={alt} fill sizes="320px" style={{ objectFit: "cover", filter: "blur(40px)", opacity: 0.5 }} />
                    </div>
                    
                    <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: "120px", height: "120px", position: "relative", borderRadius: "28px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.4)" }}>
                            <Image src={src} alt={alt} fill sizes="120px" style={{ objectFit: "cover" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AppProjectBlock({ project, index }: { project: Project, index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="app-project-block" style={{ width: "100%", margin: "0 auto 80px", position: "relative" }}>
            <div className="app-container" style={{
                display: "flex", width: "100%", gap: "60px", alignItems: "center"
            }}>
                <div className="app-mockup" style={{ flex: "0 0 340px", width: "340px", display: "flex", justifyContent: "center" }}>
                    <PhoneFrame src={project.imageUrl} accentColor={project.color} alt={project.name} />
                </div>
                <div className="app-text" style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "16px" }}>
                             <div style={{
                                fontSize: "32px", color: "rgba(0,0,0,0.08)",
                                fontWeight: 600, fontFamily: "var(--font-mono), monospace",
                                letterSpacing: "-0.04em"
                             }}>
                                {(index + 1).toString().padStart(2, '0')}
                             </div>
                             <div style={{
                                display: "flex", alignItems: "center", gap: "8px",
                                fontSize: "12px", fontWeight: 600, fontFamily: "var(--font-mono), monospace",
                                color: project.color, backgroundColor: `${project.color}15`, 
                                padding: "6px 14px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.5px"
                            }}>
                                <div style={{ width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <CategoryIcon type={project.type} color={project.color} />
                                </div>
                                {project.type}
                            </div>
                        </div>

                        <h3 style={{
                            fontSize: "clamp(36px, 4vw, 58px)", fontWeight: 800, margin: "0 0 12px 0",
                            fontFamily: "var(--font-display), sans-serif",
                            letterSpacing: "-0.04em", color: "#0f172a", lineHeight: 1.06
                        }}>
                            {project.name}
                        </h3>
                        
                        <p style={{
                            fontSize: "20px", color: project.color, margin: "0 0 40px 0",
                            fontWeight: 500, fontFamily: "var(--font-inter), Inter, sans-serif", lineHeight: 1.5
                        }}>
                            {project.tagline}
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
                            {project.stack.map((tech: string) => (
                                <span key={tech} style={{
                                    fontSize: "13px", padding: "7px 14px", borderRadius: "100px",
                                    backgroundColor: "#f5f5f7", color: "#6e6e73",
                                    border: "1px solid rgba(0,0,0,0.05)", fontWeight: 500, fontFamily: "var(--font-inter), Inter, sans-serif"
                                }}>
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <Accordion title="About this project" content={project.caseStudy} />

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "40px" }} className="project-actions">
                            {project.liveUrl && project.liveUrl !== "#" && (
                                <Link href={project.liveUrl} target="_blank" style={{
                                    padding: "14px 32px", backgroundColor: "#1d1d1f", color: "#fff",
                                    borderRadius: "12px", textDecoration: "none", fontWeight: 600, fontSize: "16px",
                                    transition: "all 0.2s ease", display: "inline-block", textAlign: "center"
                                }} className="btn-primary">
                                    Live App →
                                </Link>
                            )}
                            {project.githubUrl && project.githubUrl !== "#" && (
                                <Link href={project.githubUrl} target="_blank" style={{
                                    padding: "14px 32px", backgroundColor: "transparent", color: "#1d1d1f",
                                    border: "1px solid rgba(0,0,0,0.12)", borderRadius: "12px", textDecoration: "none", 
                                    fontWeight: 600, fontSize: "16px", transition: "all 0.2s ease", display: "inline-block", textAlign: "center"
                                }} className="btn-outline">
                                    GitHub
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WebsiteCard({ project }: { project: Project }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [iframeState, setIframeState] = useState<"loading" | "loaded" | "failed">("loading");
    const [expanded, setExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [iframeScale, setIframeScale] = useState(0.31);
    
    const visibleCount = 3;
    const visibleStack = expanded ? project.stack : project.stack.slice(0, visibleCount);
    const hiddenCount = project.stack.length - visibleCount;
    
    const cleanUrl = project.liveUrl && project.liveUrl !== "#" 
        ? project.liveUrl.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0] 
        : `${project.name.toLowerCase().replace(/\s+/g, '')}.com`;

    const hasLiveUrl = project.liveUrl && project.liveUrl !== "#";

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                setIframeScale(containerWidth / 1440);
            }
        };
        
        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { rootMargin: "200px 0px", threshold: 0 }
        );

        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || iframeState === "loaded" || !hasLiveUrl) return;
        
        const timeout = setTimeout(() => {
            if (iframeState === "loading") {
                setIframeState("failed");
            }
        }, 8000);
        return () => clearTimeout(timeout);
    }, [isVisible, iframeState, hasLiveUrl]);

    const useIframe = hasLiveUrl && isVisible && iframeState !== "failed" && project.useIframe !== false;

    return (
        <div ref={cardRef} className="website-card" style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            border: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
            ...( { 
                '--hover-color': `${project.color}12`,
                '--accent-color': project.color,
                '--accent-glow': `${project.color}15`
            } as React.CSSProperties )
        }}>
            <div style={{ height: "3px", width: "100%", background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
            
            <div className="browser-chrome-bar" style={{ height: "28px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", padding: "0 12px", position: "relative", borderBottom: "2px solid transparent", transition: "border-color 0.4s ease" }}>
                <div className="browser-chrome-dots" style={{ display: "flex", gap: "6px", opacity: 0.7, transition: "opacity 0.4s ease" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#FF5F57" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#FEBC2E" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#28C840" }} />
                </div>
                <div className="browser-chrome-url" style={{
                    position: "absolute", left: "50%", transform: "translateX(-50%)",
                    fontSize: "10px", color: "#999", fontFamily: "JetBrains Mono, SF Mono, monospace",
                    transition: "color 0.4s ease"
                }}>
                    {cleanUrl}
                </div>
            </div>

            <div ref={containerRef} className="iframe-container" style={{
                width: "100%",
                height: `${900 * iframeScale}px`,
                position: "relative",
                overflow: "hidden",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                backgroundColor: "#f5f5f5"
            }}>
                <div className="iframe-overlay" style={{
                    position: "absolute", inset: 0, zIndex: 3, cursor: "pointer",
                    transition: "opacity 0.3s ease",
                    backgroundColor: "transparent"
                }} />
                
                <div className="preview-content" style={{ position: "absolute", inset: 0 }}>
                    {isVisible && iframeState === "loading" && project.useIframe !== false && hasLiveUrl && (
                        <div style={{
                            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                            background: "linear-gradient(135deg, #f5f5f5 0%, #ececec 100%)", zIndex: 1
                        }}>
                            <div style={{
                                width: "24px", height: "24px", border: "2px solid rgba(0,0,0,0.08)",
                                borderTopColor: "#86868b", borderRadius: "50%", animation: "spin 0.8s linear infinite"
                            }} />
                        </div>
                    )}
                    
                    {useIframe && (
                        <iframe
                            src={project.liveUrl}
                            title={`${project.name} preview`}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin"
                            onLoad={() => setIframeState("loaded")}
                            onError={() => setIframeState("failed")}
                            className="live-iframe"
                            style={{
                                width: "1440px", height: "900px", border: "none",
                                transform: `scale(${iframeScale})`,
                                transformOrigin: "top left",
                                pointerEvents: "none", display: "block"
                            }}
                        />
                    )}
                    
                    {!useIframe && (
                        <Image src={project.imageUrl} alt={project.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", objectPosition: "top left" }} />
                    )}
                </div>
            </div>

            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h4 style={{ margin: "0 0 4px 0", fontSize: "20px", fontWeight: 700, color: "#0f172a", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.03em" }}>
                    {project.name}
                </h4>
                <p style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: 500, color: project.color, fontFamily: "var(--font-inter), Inter, sans-serif", lineHeight: 1.6 }}>
                    {project.tagline}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px", alignItems: "center" }}>
                    {visibleStack.map((tech, i) => (
                        <span key={tech} style={{
                            fontSize: "12px", padding: "6px 14px", borderRadius: "100px",
                            backgroundColor: "rgba(0,0,0,0.04)", color: "#424245", 
                            fontWeight: 500, fontFamily: "var(--font-inter), Inter, sans-serif",
                            transition: "all 0.3s ease",
                            animation: expanded && i >= visibleCount ? `fadeSlideIn 0.3s ease ${(i - visibleCount) * 0.05}s both` : "none"
                        }}>{tech}</span>
                    ))}
                    {hiddenCount > 0 && (
                        <button onClick={() => setExpanded(!expanded)} style={{
                            padding: "6px 14px", borderRadius: "100px",
                            background: expanded ? "rgba(45,106,79,0.1)" : "rgba(0,0,0,0.04)",
                            fontSize: "12px", fontWeight: 600, color: expanded ? "#2d6a4f" : "#86868b",
                            border: "none", cursor: "pointer",
                            fontFamily: "var(--font-inter), Inter, sans-serif", transition: "all 0.3s ease"
                        }}>
                            {expanded ? "Show less" : `+${hiddenCount}`}
                        </button>
                    )}
                </div>

                <div style={{ flexGrow: 1 }} />
                
                <Accordion title="About this project" content={project.caseStudy} />

                <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
                    {hasLiveUrl && (
                        <Link href={project.liveUrl} target="_blank" style={{
                            flex: 1, padding: "10px 0", backgroundColor: "#1d1d1f", color: "#fff",
                            borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "14px",
                            textAlign: "center", transition: "all 0.2s ease"
                        }} className="btn-primary with-shine">
                            Live Site →
                        </Link>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                        <Link href={project.githubUrl} target="_blank" style={{
                            flex: 1, padding: "10px 0", backgroundColor: "transparent", color: "#1d1d1f",
                            border: "1px solid rgba(0,0,0,0.12)", borderRadius: "8px", textDecoration: "none", 
                            fontWeight: 600, fontSize: "14px", textAlign: "center", transition: "all 0.2s ease"
                        }} className="btn-outline">
                            GitHub
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function WorkSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    const appsList = allProjects.filter(p => p.type.toLowerCase().includes("app"));
    const websitesList = allProjects.filter(p => !p.type.toLowerCase().includes("app"));

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (headingRef.current) {
                gsap.fromTo(headingRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
                );
            }

            // Headers
            gsap.utils.toArray<HTMLElement>('.section-anchor').forEach((el) => {
                gsap.fromTo(el, 
                    { x: -20, opacity: 0 }, 
                    { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } }
                );
            });

            // Apps List
            gsap.utils.toArray<HTMLElement>('.app-project-block').forEach((el) => {
                gsap.fromTo(el, 
                    { y: 60, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } }
                );
            });
            
            // Websites List (staggered)
            const websiteGrid = document.querySelector('.website-grid');
            if (websiteGrid) {
                ScrollTrigger.create({
                    trigger: websiteGrid,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    animation: gsap.fromTo('.website-card', 
                        { y: 40, opacity: 0 }, 
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
                    )
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="work"
            ref={sectionRef}
            style={{
                backgroundColor: "#ffffff",
                padding: "160px 0",
                width: "100%",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                position: "relative",
                zIndex: 2,
            }}
        >
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
                <SectionBgSvg />
                
                <div style={{ position: "relative", zIndex: 1, marginBottom: "80px" }}>
                    <div style={{
                        fontSize: "12px", fontWeight: 600, textTransform: "uppercase",
                        letterSpacing: "0.2em", color: "#6e6e73", marginBottom: "24px"
                    }}>
                        Selected Work
                    </div>
                    
                    <h2 
                        ref={headingRef}
                        className="hover-moss-text"
                        style={{
                            fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 800,
                            lineHeight: 1.05, letterSpacing: "-0.04em", color: "#0f172a",
                            fontFamily: "var(--font-display), sans-serif", margin: 0,
                            maxWidth: "800px"
                        }}
                    >
                        Proof of work.<br />
                        <span style={{ color: "#86868b" }}>Engineered for the real world.</span>
                    </h2>
                </div>

                {/* Apps Section */}
                <div id="apps" style={{ marginBottom: "120px" }}>
                    <div className="section-anchor" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "60px" }}>
                        <AppsIcon />
                        <span className="label" style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#86868b" }}>— APPS</span>
                        <div style={{ flexGrow: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.06)" }} />
                    </div>

                    <div className="work-list">
                        {appsList.map((project, i) => (
                            <AppProjectBlock key={project.id} project={project} index={i} />
                        ))}
                    </div>
                </div>

                {/* Websites Section */}
                <div id="websites">
                    <div className="section-anchor" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "60px" }}>
                        <GlobeIcon />
                        <span className="label" style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#86868b" }}>— WEBSITES</span>
                        <div style={{ flexGrow: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.06)" }} />
                    </div>

                    <div className="website-grid">
                        {websitesList.map((project) => (
                            <WebsiteCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .btn-primary:hover {
                    background-color: #424245 !important;
                    transform: scale(0.97);
                }
                .btn-primary:active {
                    transform: scale(0.95);
                }
                .btn-outline:hover {
                    background-color: rgba(0,0,0,0.03) !important;
                }
                
                .website-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }

                .iframe-container {
                    container-type: inline-size;
                }

                .website-card {
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.03), 0 8px 32px rgba(0,0,0,0.05);
                }
                
                .website-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05), 0 20px 60px rgba(0,0,0,0.1), 0 0 20px var(--hover-color, transparent);
                }
                
                .website-card:hover .iframe-overlay {
                    opacity: 0 !important;
                }
                
                .website-card:hover .live-iframe {
                    pointer-events: auto !important;
                }

                @media (max-width: 1024px) {
                    .website-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 900px) {
                    .app-container {
                        flex-direction: column !important;
                        gap: 50px !important;
                    }
                    .app-mockup {
                        width: 100% !important;
                        max-width: 320px !important;
                        flex: 1 1 auto !important;
                    }
                    .accent-glow {
                        display: none !important;
                    }
                    .project-actions {
                        flex-direction: column !important;
                        width: 100%;
                    }
                    .btn-primary, .btn-outline {
                        width: 100%;
                        text-align: center;
                    }
                }

                @media (max-width: 640px) {
                    .website-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}} />
        </section>
    );
}

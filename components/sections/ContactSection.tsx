"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "@/data/content";
import Link from "next/link";
import { Send, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || !contentRef.current) return;
        
        // Ensure animations trigger cleanly once per scroll down
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        // 1. Label
        timeline.fromTo(".contact-label", 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        // 2. Heading
        if (headingRef.current) {
            timeline.fromTo(headingRef.current,
                { scale: 0.95, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            );
        }

        // 3. Subtitle
        timeline.fromTo(".contact-subtitle",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.6"
        );

        // 4. Service Cards - Staggered
        timeline.fromTo(".service-card",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
            "-=0.4"
        );

        // 5. Primary CTA Button
        timeline.fromTo(".primary-cta",
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
            "-=0.2"
        );

        // 6. Secondary Buttons & Rest
        timeline.fromTo(".secondary-fade",
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
            "-=0.2"
        );
        
        return () => {
            timeline.kill();
        };
    }, []);

    const serviceCardStyle = {
        background: "#ffffff",
        border: "1px solid #E2E5E9",
        borderRadius: "14px",
        padding: "26px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        flex: "1 1 280px",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "default",
        boxShadow: "0 1px 3px rgba(17,19,24,0.02), 0 4px 12px rgba(17,19,24,0.03)"
    } as React.CSSProperties;

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{
                backgroundColor: "#F7F8FA",
                borderTop: "1px solid #E2E5E9",
                padding: "140px 0 0",
                width: "100%",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                position: "relative"
            }}
        >
            <div ref={contentRef} style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                
                <div className="contact-label" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "5px 14px",
                    borderRadius: "999px",
                    background: "#FFFFFF",
                    border: "1px solid #E2E5E9",
                    color: "#2563EB",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    marginBottom: "20px",
                    boxShadow: "0 1px 3px rgba(17,19,24,0.02)",
                }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB" }} />
                    <Send size={13} />
                    SYSTEM / 10 • INITIATE ENGAGEMENT
                </div>

                <h2 
                    ref={headingRef}
                    style={{
                        fontSize: "clamp(36px, 5.5vw, 68px)", fontWeight: 800,
                        lineHeight: 1.08, letterSpacing: "-0.035em", margin: "0 0 20px 0",
                        fontFamily: "var(--font-display), sans-serif",
                        color: "#111318",
                    }}
                >
                    Let&apos;s build<br/>something intelligent.
                </h2>

                <p className="contact-subtitle" style={{
                    fontSize: "16px", lineHeight: 1.65, color: "#5F6672",
                    margin: "0 0 56px 0", maxWidth: "560px", fontWeight: 400,
                    fontFamily: "var(--font-inter), Inter, sans-serif"
                }}>
                    I build AI-powered systems that turn repetitive business processes into intelligent, automated workflows. Tell me about your workflow challenges — let&apos;s explore practical solutions.
                </p>

                {/* Service Cards */}
                <div style={{ display: "flex", gap: "20px", width: "100%", flexWrap: "wrap", justifyContent: "center", marginBottom: "56px" }}>
                    {/* Card 1 */}
                    <div className="service-card" style={serviceCardStyle}>
                        <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "rgba(37,99,235,0.08)", border: "1px solid #E2E5E9" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                                <rect x="9" y="9" width="6" height="6" />
                                <line x1="9" y1="1" x2="9" y2="4" />
                                <line x1="15" y1="1" x2="15" y2="4" />
                                <line x1="9" y1="20" x2="9" y2="23" />
                                <line x1="15" y1="20" x2="15" y2="23" />
                                <line x1="20" y1="9" x2="23" y2="9" />
                                <line x1="20" y1="14" x2="23" y2="14" />
                                <line x1="1" y1="9" x2="4" y2="9" />
                                <line x1="1" y1="14" x2="4" y2="14" />
                            </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111318", margin: "0 0 4px 0", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.015em" }}>AI Automation</h3>
                            <p style={{ fontSize: "12.5px", color: "#5F6672", margin: "0" }}>Process & Workflow Orchestration</p>
                        </div>
                        <div style={{ textAlign: "left", marginTop: "auto", paddingTop: "6px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: "#2563EB", fontFamily: "ui-monospace, monospace", textTransform: "uppercase", letterSpacing: "0.04em" }}>Repeatable & Connected</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="service-card" style={serviceCardStyle}>
                        <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "rgba(37,99,235,0.08)", border: "1px solid #E2E5E9" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5v14M22 10v4M7 5v14M2 10v4"/>
                            </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111318", margin: "0 0 4px 0", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.015em" }}>LLMs & Agents</h3>
                            <p style={{ fontSize: "12.5px", color: "#5F6672", margin: "0" }}>RAG, Reasoning & Tool Use</p>
                        </div>
                        <div style={{ textAlign: "left", marginTop: "auto", paddingTop: "6px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: "#2563EB", fontFamily: "ui-monospace, monospace", textTransform: "uppercase", letterSpacing: "0.04em" }}>Intelligent Task Execution</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="service-card" style={serviceCardStyle}>
                        <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "rgba(37,99,235,0.08)", border: "1px solid #E2E5E9" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                            </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111318", margin: "0 0 4px 0", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.015em" }}>Full-Stack AI</h3>
                            <p style={{ fontSize: "12.5px", color: "#5F6672", margin: "0" }}>End-to-End SaaS & Products</p>
                        </div>
                        <div style={{ textAlign: "left", marginTop: "auto", paddingTop: "6px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: "#2563EB", fontFamily: "ui-monospace, monospace", textTransform: "uppercase", letterSpacing: "0.04em" }}>Python + Next.js Systems</span>
                        </div>
                    </div>
                </div>

                {/* Primary CTA */}
                <div className="primary-cta" style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "28px" }}>
                    <Link 
                        href="/quote"
                        className="cta-primary banner-cta"
                        style={{
                            display: "flex", justifyContent: "center", alignItems: "center", gap: "10px",
                            width: "min(440px, 100%)", height: "54px", 
                            backgroundColor: "#2563EB", color: "#ffffff",
                            fontSize: "15px", fontWeight: 700, borderRadius: "10px", textDecoration: "none",
                            boxShadow: "0 1px 3px rgba(37,99,235,0.25), 0 4px 16px rgba(37,99,235,0.2)",
                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                        }}
                    >
                        Request System Architecture Quote
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Secondary Row */}
                <div className="secondary-fade" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", width: "100%", marginBottom: "36px" }}>
                    <a 
                        href={aboutData.githubUrl || "https://github.com/ponkiyaraj7-alt"} 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: "11px 24px", border: "1px solid #E2E5E9", backgroundColor: "#FFFFFF", color: "#111318",
                            borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "13px",
                            display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s",
                            fontFamily: "ui-monospace, monospace",
                            boxShadow: "0 1px 3px rgba(17,19,24,0.02)"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#F7F8FA"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
                    >
                        GitHub Profile
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </a>
                    <a 
                        href={aboutData.linkedinUrl || "https://www.linkedin.com/in/raj-ponkiya/"} 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: "11px 24px", border: "1px solid #E2E5E9", backgroundColor: "#FFFFFF", color: "#111318",
                            borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "13px",
                            display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s",
                            fontFamily: "ui-monospace, monospace",
                            boxShadow: "0 1px 3px rgba(17,19,24,0.02)"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#F7F8FA"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
                    >
                        LinkedIn
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </a>
                </div>

                <div className="secondary-fade" style={{ marginBottom: "64px" }}>
                    <a 
                        href="mailto:ponkiyaraj7@gmail.com"
                        className="email-link-light"
                        style={{
                            color: "#5F6672",
                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                            fontSize: "13px",
                            textDecoration: "none",
                            transition: "color 0.2s ease",
                            background: "#FFFFFF",
                            border: "1px solid #E2E5E9",
                            padding: "6px 14px",
                            borderRadius: "6px",
                            boxShadow: "0 1px 2px rgba(17,19,24,0.02)"
                        }}
                    >
                        ponkiyaraj7@gmail.com
                    </a>
                </div>
            </div>

            {/* Light Precision Footer Bar */}
            <div style={{
                width: "100%", backgroundColor: "#FFFFFF", borderTop: "1px solid #E2E5E9",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "22px 36px", fontSize: "12px", color: "#5F6672", fontWeight: 500,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }} className="footer-layout">
                <div>© {new Date().getFullYear()} {aboutData.name}. Production AI Systems.</div>
                
                <div style={{ display: "flex", gap: "20px" }}>
                    <a href={aboutData.githubUrl || "https://github.com/ponkiyaraj7-alt"} target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                    <a href={aboutData.linkedinUrl || "https://www.linkedin.com/in/raj-ponkiya/"} target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                    </a>
                </div>

                <div>Engineered with Next.js & TypeScript</div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .service-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 24px -4px rgba(37,99,235,0.12), 0 2px 6px rgba(17,19,24,0.04);
                    border-color: #2563EB !important;
                }
                .banner-cta:hover {
                    background-color: #1D4ED8 !important;
                    transform: translateY(-2px);
                }
                .email-link-light:hover {
                    color: #2563EB !important;
                    border-color: #2563EB !important;
                }
                .social-icon {
                    color: #5F6672;
                    transition: color 0.2s ease, transform 0.2s ease;
                }
                .social-icon:hover {
                    color: #2563EB;
                    transform: translateY(-2px);
                }
                @media (max-width: 600px) {
                    .footer-layout {
                        flex-direction: column;
                        gap: 16px;
                        text-align: center;
                        padding: 24px 20px !important;
                    }
                    .service-card {
                        flex: 1 1 100% !important;
                    }
                }
            `}} />
        </section>
    );
}

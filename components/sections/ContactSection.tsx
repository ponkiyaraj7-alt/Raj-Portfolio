"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "@/data/content";
import Link from "next/link";

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
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        flex: "1 1 300px",
        transition: "all 0.3s ease",
        cursor: "default"
    } as React.CSSProperties;

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{
                backgroundColor: "#fafafa",
                padding: "160px 0 0",
                width: "100%",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                position: "relative"
            }}
        >
            <div ref={contentRef} style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                
                <div className="contact-label" style={{
                    fontSize: "12px", fontWeight: 600, textTransform: "uppercase",
                    letterSpacing: "0.2em", color: "#86868b", marginBottom: "24px"
                }}>
                    — Let's Build Together
                </div>

                <h2 
                    ref={headingRef}
                    className="closing-heading"
                    style={{
                        fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 800,
                        lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 24px 0",
                        fontFamily: "var(--font-display), sans-serif",
                        display: "inline-block",
                        background: "linear-gradient(135deg, #1d1d1f 0%, #2d6a4f 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        transition: "background-position 0.6s ease"
                    }}
                >
                    Let's turn your<br/>idea into reality.
                </h2>

                <p className="contact-subtitle" style={{
                    fontSize: "18px", lineHeight: 1.75, color: "#6e6e73",
                    margin: "0 0 64px 0", maxWidth: "560px", fontWeight: 400,
                    fontFamily: "var(--font-inter), Inter, sans-serif"
                }}>
                    I craft apps, websites, and AI-powered systems that deliver real business results. Tell me about your project — no commitment, just a conversation.
                </p>

                {/* Service Cards */}
                <div style={{ display: "flex", gap: "24px", width: "100%", flexWrap: "wrap", justifyContent: "center", marginBottom: "64px" }}>
                    {/* Card 1 */}
                    <div className="service-card" style={serviceCardStyle}>
                        <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(45,106,79,0.08)" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                <line x1="12" y1="18" x2="12.01" y2="18" />
                            </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>Mobile App</h3>
                            <p style={{ fontSize: "13px", color: "#86868b", margin: "0" }}>iOS & Android</p>
                        </div>
                        <div style={{ textAlign: "left", marginTop: "auto", paddingTop: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: 600, color: "#2d6a4f" }}>Affordable & Custom</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="service-card" style={serviceCardStyle}>
                        <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(45,106,79,0.08)" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>Website</h3>
                            <p style={{ fontSize: "13px", color: "#86868b", margin: "0" }}>Web Platform or E-Commerce</p>
                        </div>
                        <div style={{ textAlign: "left", marginTop: "auto", paddingTop: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: 600, color: "#2d6a4f" }}>Tailored to Your Needs</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="service-card" style={serviceCardStyle}>
                        <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(45,106,79,0.08)" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>AI Workflow</h3>
                            <p style={{ fontSize: "13px", color: "#86868b", margin: "0" }}>Automation & Intelligence</p>
                        </div>
                        <div style={{ textAlign: "left", marginTop: "auto", paddingTop: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: 600, color: "#2d6a4f" }}>Smart & Cost-Effective</span>
                        </div>
                    </div>
                </div>

                {/* Primary CTA */}
                <div className="primary-cta" style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "32px" }}>
                    <Link 
                        href="/quote"
                        className="cta-primary banner-cta"
                        style={{
                            display: "flex", justifyContent: "center", alignItems: "center", gap: "12px",
                            width: "min(480px, 100%)", height: "60px", 
                            backgroundColor: "#2d6a4f", color: "#ffffff",
                            fontSize: "18px", fontWeight: 700, borderRadius: "16px", textDecoration: "none",
                            boxShadow: "0 4px 16px rgba(45,106,79,0.2), 0 12px 40px rgba(45,106,79,0.15)",
                            fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.01em"
                        }}
                    >
                        Get a Free Quote
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>

                {/* Secondary Row */}
                <div className="secondary-fade" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", width: "100%", marginBottom: "40px" }}>
                    <a 
                        href={aboutData.githubUrl || "https://github.com/ponkiyaraj7-alt"} 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: "14px 32px", border: "1px solid rgba(0,0,0,0.12)", backgroundColor: "transparent", color: "#1d1d1f",
                            borderRadius: "12px", textDecoration: "none", fontWeight: 600, fontSize: "16px",
                            display: "inline-flex", alignItems: "center", gap: "10px", transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; }}
                    >
                        View GitHub
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </a>
                    <a 
                        href={aboutData.linkedinUrl || "https://www.linkedin.com/in/raj-ponkiya/"} 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: "14px 32px", border: "1px solid rgba(0,0,0,0.12)", backgroundColor: "transparent", color: "#0a66c2",
                            borderRadius: "12px", textDecoration: "none", fontWeight: 600, fontSize: "16px",
                            display: "inline-flex", alignItems: "center", gap: "10px", transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(10,102,194,0.05)"; e.currentTarget.style.borderColor = "rgba(10,102,194,0.3)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; }}
                    >
                        View LinkedIn
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                            color: "#86868b",
                            fontFamily: "'SF Mono', JetBrains Mono, monospace",
                            fontSize: "14px",
                            textDecoration: "none",
                            transition: "color 0.2s ease"
                        }}
                    >
                        ponkiyaraj7@gmail.com
                    </a>
                </div>

                {/* Testimonial */}
                <div className="secondary-fade" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "80px", maxWidth: "480px" }}>
                    <div style={{ fontSize: "48px", color: "rgba(45,106,79,0.2)", lineHeight: "0.5", margin: "0" }}>"</div>
                    <p style={{ fontSize: "15px", color: "#86868b", fontStyle: "italic", lineHeight: 1.6, margin: "16px 0 8px 0" }}>
                        Exceptional work quality and delivered ahead of expectations.
                    </p>
                    <div style={{ fontSize: "13px", color: "#a1a1a6", fontWeight: 500 }}>
                        — Client Review
                    </div>
                </div>

            </div>

            {/* Dark Footer Bar */}
            <div style={{
                width: "100%", backgroundColor: "#1d1d1f", borderRadius: "24px 24px 0 0",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "24px 40px", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 500,
            }} className="footer-layout">
                <div>© {new Date().getFullYear()} {aboutData.name}. All rights reserved.</div>
                
                <div style={{ display: "flex", gap: "24px" }}>
                    <a href={aboutData.githubUrl || "https://github.com/ponkiyaraj7-alt"} target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                    <a href={aboutData.linkedinUrl || "https://www.linkedin.com/in/raj-ponkiya/"} target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                    </a>
                </div>

                <div>Built with Next.js, GSAP & <span style={{ color: "#52b788" }}>♥</span></div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .closing-heading:hover {
                    background-position: right center !important;
                }
                .service-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 32px rgba(45,106,79,0.08);
                    border-color: rgba(45,106,79,0.2) !important;
                }
                .banner-cta:hover {
                    transform: translateY(-3px) !important;
                }
                .email-link-light:hover {
                    color: #2d6a4f !important;
                    text-decoration: underline !important;
                }
                .social-icon {
                    color: rgba(255,255,255,0.3);
                    transition: color 0.3s ease, transform 0.3s ease;
                }
                .social-icon:hover {
                    color: #ffffff;
                    transform: translateY(-2px);
                }
                @media (max-width: 600px) {
                    .footer-layout {
                        flex-direction: column;
                        gap: 20px;
                        text-align: center;
                        padding: 32px 24px !important;
                        border-radius: 16px 16px 0 0 !important;
                    }
                    .service-card {
                        flex: 1 1 100% !important;
                    }
                }
            `}} />
        </section>
    );
}

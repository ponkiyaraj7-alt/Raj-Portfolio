"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { 
    Cpu, 
    Globe, 
    Smartphone, 
    Sparkles, 
    Zap, 
    Clock, 
    Calendar, 
    Workflow, 
    Layers, 
    Coins, 
    Briefcase, 
    Building2, 
    ArrowLeft, 
    ArrowRight, 
    Check, 
    CheckCircle2, 
    Mail, 
    Phone, 
    User, 
    MessageSquare,
    ShieldCheck,
    Send
} from "lucide-react";

export default function QuotePage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        service: "",
        timeline: "",
        budget: "",
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        message: false,
    });

    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Initial load animation
    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
            );
        }
        gsap.fromTo(".back-link",
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 0.1 }
        );
        gsap.fromTo(".bottom-quote",
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 0.3 }
        );
    }, []);

    const animateStepChange = (newStep: number, direction: 'forward' | 'backward') => {
        const content = contentRef.current;
        if (!content) {
            setCurrentStep(newStep);
            return;
        }

        const xOut = direction === 'forward' ? -24 : 24;
        const xIn = direction === 'forward' ? 24 : -24;

        gsap.to(content, {
            x: xOut,
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
                setCurrentStep(newStep);
                gsap.fromTo(content,
                    { x: xIn, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.25 }
                );
            }
        });
    };

    const nextStep = () => {
        if (currentStep < 5) animateStepChange(currentStep + 1, 'forward');
    };

    const prevStep = () => {
        if (currentStep > 1) animateStepChange(currentStep - 1, 'backward');
    };

    const updateData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: !formData.name.trim(),
            email: !formData.email.trim() || !formData.email.includes("@"),
            message: !formData.message.trim(),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(err => err);
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "2357ad27-d2c0-47b1-84ff-bd1a8b3a3649";

        const messagePayload = `
========================================
NEW PORTFOLIO PROJECT & QUOTE INQUIRY
========================================

CLIENT INFORMATION:
• Name:  ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone || "Not provided"}

PROJECT REQUIREMENTS:
• Service Category: ${formData.service}
• Target Timeline:  ${formData.timeline}
• Budget Range:     ${formData.budget}

PROJECT SCOPE & DETAILS:
${formData.message}

========================================
Delivered directly to Raj Ponkiya (ponkiyaraj7@gmail.com)
`.trim();

        const emailSubject = encodeURIComponent(`Project Inquiry: ${formData.service} from ${formData.name}`);
        const emailBody = encodeURIComponent(messagePayload);
        const mailtoUrl = `mailto:ponkiyaraj7@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    subject: `Project Inquiry: ${formData.service} from ${formData.name}`,
                    from_name: `${formData.name} via Portfolio`,
                    replyto: formData.email,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || "Not provided",
                    service: formData.service,
                    timeline: formData.timeline,
                    budget: formData.budget,
                    message: messagePayload,
                }),
            });
            const result = await response.json();
            if (result.success) {
                animateStepChange(5, 'forward');
                setIsSubmitted(true);
            } else {
                console.warn("Web3Forms error response, falling back to direct email:", result);
                window.location.href = mailtoUrl;
                animateStepChange(5, 'forward');
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error("Form submission error, falling back to direct email:", error);
            window.location.href = mailtoUrl;
            animateStepChange(5, 'forward');
            setIsSubmitted(true);
        }
        setIsSubmitting(false);
    };

    const steps = [
        { id: 1, label: "Service" },
        { id: 2, label: "Timeline" },
        { id: 3, label: "Budget" },
        { id: 4, label: "Details" },
        { id: 5, label: "Done" },
    ];

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#fafafa",
            fontFamily: "var(--font-inter), Inter, -apple-system, sans-serif",
            padding: "32px 16px 64px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            {/* Top Bar */}
            <div style={{ width: "100%", maxWidth: "600px", marginBottom: "20px" }}>
                <Link href="/" className="back-link" style={{
                    fontSize: "14px",
                    color: "#6e6e73",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: 500,
                    transition: "color 0.2s ease"
                }} onMouseOver={(e) => e.currentTarget.style.color = "#1d1d1f"} onMouseOut={(e) => e.currentTarget.style.color = "#6e6e73"}>
                    <ArrowLeft size={16} />
                    Back to portfolio
                </Link>
            </div>

            {/* Main Card */}
            <div className="quote-card" ref={cardRef} style={{
                width: "100%",
                maxWidth: "600px",
                background: "#ffffff",
                border: "1px solid #E2E5E9",
                borderRadius: "16px",
                boxShadow: "0 1px 3px rgba(17,19,24,0.02), 0 4px 16px rgba(17,19,24,0.04)",
                padding: "40px 36px",
                boxSizing: "border-box",
                overflow: "hidden"
            }}>
                
                {/* Progress Indicators */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "40px",
                    position: "relative"
                }}>
                    {/* Background line */}
                    <div style={{
                        position: "absolute",
                        top: "8px",
                        left: "16px",
                        right: "16px",
                        height: "2px",
                        background: "#E2E5E9",
                        zIndex: 0
                    }} />
                    
                    {/* Active line fill */}
                    <div style={{
                        position: "absolute",
                        top: "8px",
                        left: "16px",
                        height: "2px",
                        width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 32px)`,
                        background: "#2563EB",
                        transition: "width 0.4s ease",
                        zIndex: 0
                    }} />

                    {steps.map((s, index) => {
                        const stepNum = index + 1;
                        const isCompleted = stepNum < currentStep;
                        const isCurrent = stepNum === currentStep;

                        return (
                            <div key={s.id} style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                zIndex: 1,
                                flex: 1
                            }}>
                                <div style={{
                                    width: "18px",
                                    height: "18px",
                                    borderRadius: "50%",
                                    background: isCompleted || isCurrent ? "#2563EB" : "#ffffff",
                                    border: `2px solid ${isCompleted || isCurrent ? "#2563EB" : "#CBD2D9"}`,
                                    boxShadow: isCurrent ? "0 0 0 4px rgba(37,99,235,0.15)" : "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#ffffff",
                                    transition: "all 0.3s ease"
                                }}>
                                    {isCompleted && <Check size={10} strokeWidth={3} />}
                                </div>
                                <span style={{
                                    fontSize: "11px",
                                    color: isCurrent ? "#1d1d1f" : "#86868b",
                                    marginTop: "8px",
                                    fontWeight: isCurrent ? 700 : 500,
                                    whiteSpace: "nowrap"
                                }}>
                                    {s.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Animated Content Wrapper */}
                <div ref={contentRef}>
                    {/* STEP 1 */}
                    {currentStep === 1 && (
                        <div>
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1d1d1f", textAlign: "center", marginBottom: "8px", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>
                                What system do you need built?
                            </h2>
                            <p style={{ fontSize: "14px", color: "#6e6e73", textAlign: "center", margin: "0 0 28px 0" }}>
                                Select the core category that best fits your project scope.
                            </p>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                                gap: "12px"
                            }}>
                                {[
                                    { id: "AI Workflow & Agents", icon: Cpu, title: "AI Workflows & Agents", subtitle: "Autonomous agents, RAG systems, LLM tools & automated pipelines" },
                                    { id: "Web Platform & SaaS", icon: Globe, title: "Web Platform & SaaS", subtitle: "Full-stack web applications, dashboards, API services & storefronts" },
                                    { id: "Mobile Application", icon: Smartphone, title: "Mobile Application", subtitle: "Cross-platform iOS/Android apps with cloud synchronization" },
                                    { id: "Custom Architecture", icon: Sparkles, title: "Architecture & Scoping", subtitle: "Technical roadmap, system integration, or custom requirements" }
                                ].map((option) => {
                                    const isSelected = formData.service === option.id;
                                    const IconComp = option.icon;
                                    return (
                                        <div
                                            key={option.id}
                                            onClick={() => updateData("service", option.id)}
                                            style={{
                                                padding: "20px",
                                                borderRadius: "14px",
                                                border: `1px solid ${isSelected ? '#2563EB' : '#E2E5E9'}`,
                                                background: isSelected ? "rgba(37,99,235,0.04)" : "#ffffff",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                                position: "relative",
                                                transform: isSelected ? "translateY(-2px)" : "none",
                                                boxShadow: isSelected ? "0 4px 16px rgba(37,99,235,0.08)" : "none",
                                                display: "flex",
                                                flexDirection: "column",
                                                minWidth: 0
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "#CBD2D9";
                                                    e.currentTarget.style.transform = "translateY(-2px)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "#E2E5E9";
                                                    e.currentTarget.style.transform = "none";
                                                }
                                            }}
                                        >
                                            {isSelected && (
                                                <div style={{ position: "absolute", top: "14px", right: "14px", color: "#2563EB" }}>
                                                    <CheckCircle2 size={18} />
                                                </div>
                                            )}
                                            <div style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius: "10px",
                                                background: isSelected ? "rgba(37,99,235,0.1)" : "#F1F3F5",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: isSelected ? "#2563EB" : "#111318",
                                                marginBottom: "14px",
                                                border: "1px solid #E2E5E9",
                                                transition: "all 0.2s ease"
                                            }}>
                                                <IconComp size={20} />
                                            </div>
                                            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111318", margin: "0 0 6px 0", letterSpacing: "-0.01em" }}>{option.title}</h3>
                                            <p style={{ fontSize: "12.5px", color: "#5F6672", margin: 0, lineHeight: 1.45 }}>{option.subtitle}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px" }}>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.service}
                                    style={{
                                        padding: "12px 28px",
                                        borderRadius: "8px",
                                        background: formData.service ? "#2563EB" : "#F1F3F5",
                                        color: formData.service ? "#ffffff" : "#8A919C",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        border: "1px solid #E2E5E9",
                                        cursor: formData.service ? "pointer" : "not-allowed",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        transition: "all 0.2s ease",
                                        fontFamily: "ui-monospace, monospace"
                                    }}
                                >
                                    Continue
                                    <ArrowRight size={15} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 2 && (
                        <div>
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1d1d1f", textAlign: "center", marginBottom: "8px", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>
                                What is your target timeline?
                            </h2>
                            <p style={{ fontSize: "14px", color: "#6e6e73", textAlign: "center", margin: "0 0 28px 0" }}>
                                Let me know how quickly you need the system deployed.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {[
                                    { id: "Priority (ASAP)", icon: Zap, label: "Priority / Fast Track", desc: "Urgent turnaround — high-priority deployment" },
                                    { id: "1–2 Weeks", icon: Clock, label: "1–2 Weeks", desc: "Rapid prototype, MVP, or focused sprint" },
                                    { id: "About 1 Month", icon: Calendar, label: "About 1 Month", desc: "Standard production architecture and delivery" },
                                    { id: "Flexible", icon: Workflow, label: "Flexible Timeline", desc: "Quality-first, milestone-driven development" }
                                ].map((option) => {
                                    const isSelected = formData.timeline === option.id;
                                    const IconComp = option.icon;
                                    return (
                                        <div
                                            key={option.id}
                                            onClick={() => updateData("timeline", option.id)}
                                            style={{
                                                padding: "16px 20px",
                                                borderRadius: "12px",
                                                border: `1px solid ${isSelected ? '#2563EB' : '#E2E5E9'}`,
                                                background: isSelected ? "rgba(37,99,235,0.04)" : "#ffffff",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "14px",
                                                transition: "all 0.2s ease"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "#CBD2D9";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "#E2E5E9";
                                                }
                                            }}
                                        >
                                            <div style={{
                                                width: "36px",
                                                height: "36px",
                                                borderRadius: "8px",
                                                background: isSelected ? "#2563EB" : "#F1F3F5",
                                                color: isSelected ? "#ffffff" : "#2563EB",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                border: "1px solid #E2E5E9"
                                            }}>
                                                <IconComp size={17} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: "14px", fontWeight: 700, color: "#111318" }}>
                                                    {option.label}
                                                </div>
                                                <div style={{ fontSize: "12px", color: "#5F6672", marginTop: "2px" }}>
                                                    {option.desc}
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <div style={{ color: "#2563EB" }}>
                                                    <CheckCircle2 size={18} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
                                <button
                                    onClick={prevStep}
                                    style={{
                                        padding: "11px 20px", borderRadius: "8px", background: "transparent",
                                        color: "#5F6672", fontWeight: 600, fontSize: "13px", border: "1px solid #E2E5E9",
                                        cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px",
                                        transition: "all 0.2s ease", fontFamily: "ui-monospace, monospace"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = "#111318"}
                                    onMouseOut={(e) => e.currentTarget.style.color = "#5F6672"}
                                >
                                    <ArrowLeft size={14} />
                                    Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.timeline}
                                    style={{
                                        padding: "11px 26px", borderRadius: "8px", border: "1px solid #E2E5E9",
                                        background: formData.timeline ? "#2563EB" : "#F1F3F5", color: formData.timeline ? "#ffffff" : "#8A919C",
                                        fontWeight: 600, fontSize: "13.5px", cursor: formData.timeline ? "pointer" : "not-allowed",
                                        display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s ease",
                                        fontFamily: "ui-monospace, monospace"
                                    }}
                                >
                                    Continue
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 3 && (
                        <div>
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111318", textAlign: "center", marginBottom: "8px", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>
                                What is your budget range?
                            </h2>
                            <p style={{ fontSize: "14px", color: "#5F6672", textAlign: "center", margin: "0 0 28px 0" }}>
                                This ensures the solution is engineered precisely to your scope.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {[
                                    { id: "Under $1,000", icon: Layers, label: "Under $1,000", desc: "Proof of concept, focused workflow, or MVP prototype" },
                                    { id: "$1,000 – $3,000", icon: Coins, label: "$1,000 – $3,000", desc: "Core AI application, automated workflow, or complete web platform" },
                                    { id: "$3,000 – $5,000", icon: Briefcase, label: "$3,000 – $5,000", desc: "Multi-agent systems, complex RAG pipelines, or full-stack SaaS" },
                                    { id: "$5,000+", icon: Building2, label: "$5,000+", desc: "End-to-end enterprise solution with dedicated architecture support" }
                                ].map((option) => {
                                    const isSelected = formData.budget === option.id;
                                    const IconComp = option.icon;
                                    return (
                                        <div
                                            key={option.id}
                                            onClick={() => updateData("budget", option.id)}
                                            style={{
                                                padding: "16px 20px",
                                                borderRadius: "12px",
                                                border: `1px solid ${isSelected ? '#2563EB' : '#E2E5E9'}`,
                                                background: isSelected ? "rgba(37,99,235,0.04)" : "#ffffff",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "14px",
                                                transition: "all 0.2s ease"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "#CBD2D9";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "#E2E5E9";
                                                }
                                            }}
                                        >
                                            <div style={{
                                                width: "36px",
                                                height: "36px",
                                                borderRadius: "8px",
                                                background: isSelected ? "#2563EB" : "#F1F3F5",
                                                color: isSelected ? "#ffffff" : "#2563EB",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                border: "1px solid #E2E5E9"
                                            }}>
                                                <IconComp size={17} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: "14px", fontWeight: 700, color: "#111318" }}>
                                                    {option.label}
                                                </div>
                                                <div style={{ fontSize: "12px", color: "#5F6672", marginTop: "2px" }}>
                                                    {option.desc}
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <div style={{ color: "#2563EB" }}>
                                                    <CheckCircle2 size={18} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
                                <button
                                    onClick={prevStep}
                                    style={{
                                        padding: "11px 20px", borderRadius: "8px", background: "transparent",
                                        color: "#5F6672", fontWeight: 600, fontSize: "13px", border: "1px solid #E2E5E9",
                                        cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px",
                                        transition: "all 0.2s ease", fontFamily: "ui-monospace, monospace"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = "#111318"}
                                    onMouseOut={(e) => e.currentTarget.style.color = "#5F6672"}
                                >
                                    <ArrowLeft size={14} />
                                    Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.budget}
                                    style={{
                                        padding: "11px 26px", borderRadius: "8px", border: "1px solid #E2E5E9",
                                        background: formData.budget ? "#2563EB" : "#F1F3F5", color: formData.budget ? "#ffffff" : "#8A919C",
                                        fontWeight: 600, fontSize: "13.5px", cursor: formData.budget ? "pointer" : "not-allowed",
                                        display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s ease",
                                        fontFamily: "ui-monospace, monospace"
                                    }}
                                >
                                    Continue
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4 */}
                    {currentStep === 4 && (
                        <div>
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111318", textAlign: "center", marginBottom: "8px", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>
                                Project Details & Contact
                            </h2>
                            <p style={{ fontSize: "14px", color: "#5F6672", textAlign: "center", margin: "0 0 28px 0" }}>
                                Tell me about the problems you&apos;re looking to solve.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%" }}>
                                
                                {/* Name */}
                                <div>
                                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px", color: "#5F6672", fontWeight: 700, marginBottom: "6px", fontFamily: "ui-monospace, monospace", textTransform: "uppercase" }}>
                                        <User size={13} color="#2563EB" />
                                        Your Name *
                                    </label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => updateData("name", e.target.value)}
                                        placeholder="e.g. Alex Morgan"
                                        className="form-input"
                                        style={{ width: "100%", padding: "11px 14px", border: `1px solid ${errors.name ? '#EF4444' : '#E2E5E9'}`, borderRadius: "8px", fontSize: "14px", color: "#111318", background: "#F7F8FA", boxSizing: "border-box", outline: "none" }}
                                    />
                                    {errors.name && <div style={{ fontSize: "12px", color: "#EF4444", marginTop: "4px" }}>Please enter your name</div>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px", color: "#5F6672", fontWeight: 700, marginBottom: "6px", fontFamily: "ui-monospace, monospace", textTransform: "uppercase" }}>
                                        <Mail size={13} color="#2563EB" />
                                        Email Address *
                                    </label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => updateData("email", e.target.value)}
                                        placeholder="alex@company.com"
                                        className="form-input"
                                        style={{ width: "100%", padding: "11px 14px", border: `1px solid ${errors.email ? '#EF4444' : '#E2E5E9'}`, borderRadius: "8px", fontSize: "14px", color: "#111318", background: "#F7F8FA", boxSizing: "border-box", outline: "none" }}
                                    />
                                    {errors.email && <div style={{ fontSize: "12px", color: "#EF4444", marginTop: "4px" }}>Please enter a valid email address</div>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px", color: "#5F6672", fontWeight: 700, marginBottom: "6px", fontFamily: "ui-monospace, monospace", textTransform: "uppercase" }}>
                                        <Phone size={13} color="#2563EB" />
                                        Phone Number (optional)
                                    </label>
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => updateData("phone", e.target.value)}
                                        placeholder="+1 (555) 000-0000"
                                        className="form-input"
                                        style={{ width: "100%", padding: "11px 14px", border: "1px solid #E2E5E9", borderRadius: "8px", fontSize: "14px", color: "#111318", background: "#F7F8FA", boxSizing: "border-box", outline: "none" }}
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px", color: "#5F6672", fontWeight: 700, marginBottom: "6px", fontFamily: "ui-monospace, monospace", textTransform: "uppercase" }}>
                                        <MessageSquare size={13} color="#2563EB" />
                                        Describe your workflow or requirements *
                                    </label>
                                    <textarea 
                                        value={formData.message}
                                        onChange={(e) => updateData("message", e.target.value)}
                                        rows={4}
                                        placeholder="What manual process needs automation? What systems or APIs need to connect?"
                                        className="form-input"
                                        style={{ width: "100%", padding: "11px 14px", border: `1px solid ${errors.message ? '#EF4444' : '#E2E5E9'}`, borderRadius: "8px", fontSize: "14px", color: "#111318", background: "#F7F8FA", boxSizing: "border-box", resize: "vertical", outline: "none" }}
                                    />
                                    {errors.message && <div style={{ fontSize: "12px", color: "#EF4444", marginTop: "4px" }}>Please describe your project needs</div>}
                                </div>

                            </div>

                            <div style={{ display: "flex", gap: "12px", marginTop: "28px", width: "100%" }}>
                                <button
                                    onClick={prevStep}
                                    style={{
                                        padding: "12px 20px", borderRadius: "8px", background: "transparent",
                                        color: "#5F6672", fontWeight: 600, fontSize: "13px", border: "1px solid #E2E5E9",
                                        cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px",
                                        transition: "all 0.2s ease", fontFamily: "ui-monospace, monospace"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = "#111318"}
                                    onMouseOut={(e) => e.currentTarget.style.color = "#5F6672"}
                                >
                                    <ArrowLeft size={14} />
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="send-button"
                                    style={{
                                        flex: 1,
                                        height: "48px", background: "#2563EB", color: "#ffffff",
                                        fontSize: "14px", fontWeight: 700, borderRadius: "8px", border: "none",
                                        cursor: isSubmitting ? "not-allowed" : "pointer",
                                        boxShadow: "0 1px 3px rgba(37,99,235,0.25)",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "10px",
                                        transition: "all 0.2s",
                                        fontFamily: "ui-monospace, monospace"
                                    }}
                                >
                                    {isSubmitting ? (
                                        <span>Dispatching Request...</span>
                                    ) : (
                                        <>
                                            <span>Send Project Inquiry</span>
                                            <Send size={15} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 5 / SUCCESS */}
                    {currentStep === 5 && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "24px 0 12px" }}>
                            
                            <div style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                background: "rgba(37,99,235,0.1)",
                                color: "#2563EB",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "20px"
                            }}>
                                <CheckCircle2 size={36} />
                            </div>

                            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#111318", margin: "0 0 8px 0", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>
                                Request Received!
                            </h2>
                            <p style={{ fontSize: "14.5px", color: "#5F6672", maxWidth: "440px", lineHeight: 1.6, margin: "0 0 24px 0" }}>
                                Thank you, <strong style={{ color: "#111318" }}>{formData.name}</strong>. Your inquiry has been routed directly to Raj Ponkiya.
                            </p>

                            {/* Summary Receipt Card */}
                            <div style={{
                                width: "100%",
                                background: "#F7F8FA",
                                border: "1px solid #E2E5E9",
                                borderRadius: "12px",
                                padding: "18px",
                                textAlign: "left",
                                marginBottom: "24px",
                                boxSizing: "border-box"
                            }}>
                                <div style={{ fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#2563EB", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px", fontFamily: "ui-monospace, monospace" }}>
                                    <ShieldCheck size={14} />
                                    Submission Summary
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12.5px" }}>
                                    <div>
                                        <span style={{ color: "#8A919C", display: "block", fontSize: "10.5px", fontFamily: "ui-monospace, monospace" }}>Service Category</span>
                                        <strong style={{ color: "#111318" }}>{formData.service || "AI Workflow"}</strong>
                                    </div>
                                    <div>
                                        <span style={{ color: "#8A919C", display: "block", fontSize: "10.5px", fontFamily: "ui-monospace, monospace" }}>Timeline</span>
                                        <strong style={{ color: "#111318" }}>{formData.timeline || "Standard"}</strong>
                                    </div>
                                    <div>
                                        <span style={{ color: "#8A919C", display: "block", fontSize: "10.5px", fontFamily: "ui-monospace, monospace" }}>Budget Range</span>
                                        <strong style={{ color: "#111318" }}>{formData.budget || "Custom"}</strong>
                                    </div>
                                    <div>
                                        <span style={{ color: "#8A919C", display: "block", fontSize: "10.5px", fontFamily: "ui-monospace, monospace" }}>Contact Email</span>
                                        <strong style={{ color: "#111318" }}>{formData.email || "ponkiyaraj7@gmail.com"}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Reassurance Message */}
                            <p style={{ fontSize: "13px", color: "#5F6672", lineHeight: 1.55, maxWidth: "460px", margin: "0 0 28px 0" }}>
                                I will review your requirements, analyze technical feasibility, and respond with an architecture proposal within <strong>24 hours</strong>.
                            </p>
                            
                            {/* Action Buttons */}
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
                                <Link href="/" style={{
                                    padding: "10px 20px",
                                    border: "1px solid #E2E5E9",
                                    borderRadius: "8px",
                                    color: "#111318",
                                    fontSize: "13.5px",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    transition: "all 0.2s ease",
                                    fontFamily: "ui-monospace, monospace"
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "#F7F8FA"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                                    <ArrowLeft size={14} />
                                    Back to Portfolio
                                </Link>

                                <a href="mailto:ponkiyaraj7@gmail.com" style={{
                                    padding: "10px 20px",
                                    background: "#2563EB",
                                    borderRadius: "8px",
                                    color: "#ffffff",
                                    fontSize: "13.5px",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    transition: "all 0.2s ease",
                                    fontFamily: "ui-monospace, monospace",
                                    boxShadow: "0 1px 3px rgba(37,99,235,0.25)"
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "#1D4ED8"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "#2563EB"; }}>
                                    <Mail size={14} />
                                    Direct Email
                                </a>
                            </div>

                        </div>
                    )}

                </div>
            </div>

            {/* Bottom Proof */}
            <div className="bottom-quote" style={{ marginTop: "28px", fontSize: "12px", color: "#5F6672", textAlign: "center", display: "flex", alignItems: "center", gap: "8px", fontFamily: "ui-monospace, monospace" }}>
                <ShieldCheck size={14} color="#2563EB" />
                Direct review & engineering response by Raj Ponkiya • Zero commitment
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .form-input:focus {
                    border-color: #2563EB !important;
                    box-shadow: 0 0 0 3px rgba(37,99,235,0.12) !important;
                    outline: none;
                }
                .send-button:hover:not(:disabled) {
                    background: #1D4ED8 !important;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 22px rgba(45,106,79,0.3) !important;
                }
                .send-button:active:not(:disabled) {
                    transform: scale(0.98);
                }
                @media (max-width: 600px) {
                    .quote-card {
                        padding: 28px 20px !important;
                        border-radius: 20px !important;
                    }
                }
            `}} />
        </div>
    );
}

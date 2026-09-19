"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

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

        const xOut = direction === 'forward' ? -30 : 30;
        const xIn = direction === 'forward' ? 30 : -30;

        gsap.to(content, {
            x: xOut,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                setCurrentStep(newStep);
                gsap.fromTo(content,
                    { x: xIn, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.3 }
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
        // Clear error if user starts typing in a previously required field
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: !formData.name.trim(),
            email: !formData.email.trim(),
            message: !formData.message.trim(),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(err => err);
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
                    subject: "New Quote Request — Portfolio",
                    from_name: "Portfolio Quote Form",
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || "Not provided",
                    service: formData.service,
                    timeline: formData.timeline,
                    budget: formData.budget,
                    message: formData.message,
                    botcheck: false,
                }),
            });
            const result = await response.json();
            if (result.success) {
                // Progress to Step 5 (Done)
                animateStepChange(5, 'forward');
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error("Form submission error:", error);
        }
        setIsSubmitting(false);
    };

    const steps = ["Service", "Timeline", "Budget", "Details", "Done"];

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#fafafa",
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            {/* Top Bar */}
            <div style={{ width: "100%", maxWidth: "560px", marginBottom: "20px" }}>
                <Link href="/" className="back-link" style={{
                    fontSize: "14px",
                    color: "#86868b",
                    textDecoration: "none",
                    transition: "color 0.2s ease"
                }} onMouseOver={(e) => e.currentTarget.style.color = "#1d1d1f"} onMouseOut={(e) => e.currentTarget.style.color = "#86868b"}>
                    ← Back to portfolio
                </Link>
            </div>

            {/* Main Card */}
            <div className="quote-card" ref={cardRef} style={{
                width: "100%",
                maxWidth: "560px",
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: "24px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.08)",
                padding: "48px 40px",
                boxSizing: "border-box",
                overflow: "hidden" // Prevent slide-in content from spilling out horizontally
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
                        top: "6px",
                        left: "10px",
                        right: "10px",
                        height: "2px",
                        background: "rgba(0,0,0,0.08)",
                        zIndex: 0
                    }} />
                    
                    {/* Active line fill */}
                    <div style={{
                        position: "absolute",
                        top: "6px",
                        left: "10px",
                        height: "2px",
                        width: `calc(${((currentStep - 1) / 4) * 100}% - 20px)`,
                        background: "#2d6a4f",
                        transition: "width 0.4s ease",
                        zIndex: 0
                    }} />

                    {steps.map((label, index) => {
                        const stepNum = index + 1;
                        const isCompleted = stepNum < currentStep;
                        const isCurrent = stepNum === currentStep;

                        return (
                            <div key={label} style={{
                                display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, width: "32px"
                            }}>
                                <div style={{
                                    width: "12px", height: "12px", borderRadius: "50%",
                                    background: isCompleted || isCurrent ? "#2d6a4f" : "#ffffff",
                                    border: `2px solid ${isCompleted || isCurrent ? "#2d6a4f" : "rgba(0,0,0,0.1)"}`,
                                    boxShadow: isCurrent ? "0 0 0 4px rgba(45,106,79,0.15)" : "none",
                                    transition: "all 0.3s ease"
                                }} />
                                <span style={{
                                    fontSize: "10px", color: "#86868b", marginTop: "8px", fontWeight: isCurrent ? 600 : 400
                                }}>
                                    {label}
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
                            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1d1d1f", textAlign: "center", marginBottom: "32px" }}>
                                What would you like me to build?
                            </h2>
                            <div style={{
                                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px"
                            }} className="step-1-grid">
                                {[
                                    { id: "Mobile App", icon: "📱", title: "Mobile App", subtitle: "iOS, Android, or both" },
                                    { id: "Website", icon: "🌐", title: "Website", subtitle: "Landing page, e-commerce, platform" },
                                    { id: "AI Workflow", icon: "🧠", title: "AI Workflow", subtitle: "Automation, chatbots, AI tools" },
                                    { id: "Not sure", icon: "❔", title: "Not sure yet", subtitle: "Let's figure it out together" }
                                ].map((option) => {
                                    const isSelected = formData.service === option.id;
                                    return (
                                        <div
                                            key={option.id}
                                            onClick={() => updateData("service", option.id)}
                                            style={{
                                                padding: "24px",
                                                borderRadius: "16px",
                                                border: `${isSelected ? '2px' : '1px'} solid ${isSelected ? '#2d6a4f' : 'rgba(0,0,0,0.08)'}`,
                                                background: isSelected ? "rgba(45,106,79,0.04)" : "#ffffff",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                                position: "relative",
                                                transform: isSelected ? "translateY(-2px)" : "none",
                                                boxShadow: isSelected ? "0 8px 24px rgba(45,106,79,0.08)" : "none"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
                                                    e.currentTarget.style.transform = "translateY(-2px)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                                                    e.currentTarget.style.transform = "none";
                                                }
                                            }}
                                        >
                                            {isSelected && (
                                                <div style={{ position: "absolute", top: "16px", right: "16px", color: "#2d6a4f" }}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                            )}
                                            <div style={{ fontSize: "32px", marginBottom: "16px" }}>{option.icon}</div>
                                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1d1d1f", margin: "0 0 4px 0" }}>{option.title}</h3>
                                            <p style={{ fontSize: "13px", color: "#86868b", margin: 0 }}>{option.subtitle}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px" }}>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.service}
                                    style={{
                                        padding: "14px 32px",
                                        borderRadius: "12px",
                                        background: formData.service ? "#2d6a4f" : "rgba(0,0,0,0.1)",
                                        color: formData.service ? "#ffffff" : "rgba(0,0,0,0.4)",
                                        fontWeight: 600,
                                        fontSize: "15px",
                                        border: "none",
                                        cursor: formData.service ? "pointer" : "not-allowed",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 2 && (
                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1d1d1f", textAlign: "center", marginBottom: "32px" }}>
                                What's your timeline?
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {[
                                    "🚀 ASAP — I need it yesterday",
                                    "📅 1–2 weeks",
                                    "🗓️ About a month",
                                    "🌱 No rush — let's do it right"
                                ].map((option) => {
                                    const isSelected = formData.timeline === option;
                                    return (
                                        <div
                                            key={option}
                                            onClick={() => updateData("timeline", option)}
                                            style={{
                                                padding: "16px 20px",
                                                borderRadius: "12px",
                                                border: `1px solid ${isSelected ? '#2d6a4f' : 'rgba(0,0,0,0.08)'}`,
                                                background: isSelected ? "#2d6a4f" : "#ffffff",
                                                color: isSelected ? "#ffffff" : "#1d1d1f",
                                                fontSize: "15px",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
                                                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.02)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                                                    e.currentTarget.style.backgroundColor = "#ffffff";
                                                }
                                            }}
                                        >
                                            {option}
                                        </div>
                                    )
                                })}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
                                <button
                                    onClick={prevStep}
                                    style={{
                                        padding: "14px 24px", borderRadius: "12px", background: "transparent",
                                        color: "#86868b", fontWeight: 600, fontSize: "15px", border: "1px solid rgba(0,0,0,0.1)",
                                        cursor: "pointer", transition: "all 0.2s ease"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = "#1d1d1f"}
                                    onMouseOut={(e) => e.currentTarget.style.color = "#86868b"}
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.timeline}
                                    style={{
                                        padding: "14px 32px", borderRadius: "12px", border: "none",
                                        background: formData.timeline ? "#2d6a4f" : "rgba(0,0,0,0.1)", color: formData.timeline ? "#ffffff" : "rgba(0,0,0,0.4)",
                                        fontWeight: 600, fontSize: "15px", cursor: formData.timeline ? "pointer" : "not-allowed", transition: "all 0.2s ease"
                                    }}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 3 && (
                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1d1d1f", textAlign: "center", marginBottom: "8px" }}>
                                What's your budget range?
                            </h2>
                            <p style={{ fontSize: "14px", color: "#86868b", textAlign: "center", marginBottom: "32px", marginTop: 0 }}>
                                This helps me tailor the right solution for you.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {[
                                    "💰 Under $1,000",
                                    "💰💰 $1,000 – $3,000",
                                    "💰💰💰 $3,000 – $5,000",
                                    "🏦 $5,000+"
                                ].map((option) => {
                                    const isSelected = formData.budget === option;
                                    return (
                                        <div
                                            key={option}
                                            onClick={() => updateData("budget", option)}
                                            style={{
                                                padding: "16px 20px", borderRadius: "12px",
                                                border: `1px solid ${isSelected ? '#2d6a4f' : 'rgba(0,0,0,0.08)'}`,
                                                background: isSelected ? "#2d6a4f" : "#ffffff", color: isSelected ? "#ffffff" : "#1d1d1f",
                                                fontSize: "15px", cursor: "pointer", transition: "all 0.2s ease"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
                                                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.02)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                                                    e.currentTarget.style.backgroundColor = "#ffffff";
                                                }
                                            }}
                                        >
                                            {option}
                                        </div>
                                    )
                                })}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
                                <button
                                    onClick={prevStep}
                                    style={{
                                        padding: "14px 24px", borderRadius: "12px", background: "transparent",
                                        color: "#86868b", fontWeight: 600, fontSize: "15px", border: "1px solid rgba(0,0,0,0.1)",
                                        cursor: "pointer", transition: "all 0.2s ease"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = "#1d1d1f"}
                                    onMouseOut={(e) => e.currentTarget.style.color = "#86868b"}
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.budget}
                                    style={{
                                        padding: "14px 32px", borderRadius: "12px", border: "none",
                                        background: formData.budget ? "#2d6a4f" : "rgba(0,0,0,0.1)", color: formData.budget ? "#ffffff" : "rgba(0,0,0,0.4)",
                                        fontWeight: 600, fontSize: "15px", cursor: formData.budget ? "pointer" : "not-allowed", transition: "all 0.2s ease"
                                    }}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4 */}
                    {currentStep === 4 && (
                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1d1d1f", textAlign: "center", marginBottom: "32px" }}>
                                Almost there! Tell me about your project.
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
                                
                                {/* Name */}
                                <div>
                                    <label style={{ display: "block", fontSize: "13px", color: "#6e6e73", fontWeight: 500, marginBottom: "6px" }}>Your name *</label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => updateData("name", e.target.value)}
                                        className="form-input"
                                        style={{ width: "100%", padding: "14px 16px", border: `1px solid ${errors.name ? '#EF4444' : 'rgba(0,0,0,0.1)'}`, borderRadius: "12px", fontSize: "15px", color: "#1d1d1f", background: "#ffffff", boxSizing: "border-box" }}
                                    />
                                    {errors.name && <div style={{ fontSize: "12px", color: "#EF4444", marginTop: "4px" }}>This field is required</div>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label style={{ display: "block", fontSize: "13px", color: "#6e6e73", fontWeight: 500, marginBottom: "6px" }}>Email address *</label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => updateData("email", e.target.value)}
                                        className="form-input"
                                        style={{ width: "100%", padding: "14px 16px", border: `1px solid ${errors.email ? '#EF4444' : 'rgba(0,0,0,0.1)'}`, borderRadius: "12px", fontSize: "15px", color: "#1d1d1f", background: "#ffffff", boxSizing: "border-box" }}
                                    />
                                    {errors.email && <div style={{ fontSize: "12px", color: "#EF4444", marginTop: "4px" }}>This field is required</div>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label style={{ display: "block", fontSize: "13px", color: "#6e6e73", fontWeight: 500, marginBottom: "6px" }}>Phone number (optional)</label>
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => updateData("phone", e.target.value)}
                                        className="form-input"
                                        style={{ width: "100%", padding: "14px 16px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", fontSize: "15px", color: "#1d1d1f", background: "#ffffff", boxSizing: "border-box" }}
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label style={{ display: "block", fontSize: "13px", color: "#6e6e73", fontWeight: 500, marginBottom: "6px" }}>Briefly describe what you need *</label>
                                    <textarea 
                                        value={formData.message}
                                        onChange={(e) => updateData("message", e.target.value)}
                                        rows={4}
                                        className="form-input"
                                        style={{ width: "100%", padding: "14px 16px", border: `1px solid ${errors.message ? '#EF4444' : 'rgba(0,0,0,0.1)'}`, borderRadius: "12px", fontSize: "15px", color: "#1d1d1f", background: "#ffffff", boxSizing: "border-box", resize: "vertical" }}
                                    />
                                    {errors.message && <div style={{ fontSize: "12px", color: "#EF4444", marginTop: "4px" }}>This field is required</div>}
                                </div>

                                {/* Botcheck */}
                                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                            </div>

                            <div style={{ display: "flex", gap: "12px", marginTop: "32px", width: "100%" }}>
                                <button
                                    onClick={prevStep}
                                    style={{
                                        padding: "14px 24px", borderRadius: "12px", background: "transparent",
                                        color: "#86868b", fontWeight: 600, fontSize: "15px", border: "1px solid rgba(0,0,0,0.1)",
                                        cursor: "pointer", transition: "all 0.2s ease"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = "#1d1d1f"}
                                    onMouseOut={(e) => e.currentTarget.style.color = "#86868b"}
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="send-button"
                                    style={{
                                        flex: 1,
                                        height: "54px", background: "#2d6a4f", color: "#ffffff",
                                        fontSize: "17px", fontWeight: 700, borderRadius: "14px", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer",
                                        boxShadow: "0 4px 16px rgba(45,106,79,0.2)", position: "relative", overflow: "hidden", transition: "all 0.2s"
                                    }}
                                >
                                    {isSubmitting ? "Sending..." : "Send Request"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 5 / SUCCESS */}
                    {currentStep === 5 && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "40px 0 20px" }}>
                            <div className="success-check-container" style={{ position: "relative", width: "80px", height: "80px", marginBottom: "24px" }}>
                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="success-circle" cx="40" cy="40" r="38" stroke="#2d6a4f" strokeWidth="3" fill="transparent" strokeDasharray="240" strokeDashoffset="240" />
                                    <path className="success-path" d="M25 40 L35 50 L55 28" stroke="#2d6a4f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="50" strokeDashoffset="50" />
                                </svg>
                            </div>
                            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1d1d1f", margin: "0 0 12px 0" }}>
                                You're all set!
                            </h2>
                            <p style={{ fontSize: "16px", color: "#6e6e73", maxWidth: "400px", lineHeight: 1.5, margin: "0 0 32px 0" }}>
                                Thanks, {formData.name}! I'll review your request and get back to you within 24 hours.
                            </p>
                            
                            <Link href="/" style={{
                                padding: "14px 32px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px",
                                color: "#1d1d1f", fontSize: "16px", fontWeight: 600, textDecoration: "none", marginBottom: "32px",
                                transition: "all 0.2s ease"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.03)" }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}>
                                ← Back to portfolio
                            </Link>

                            <p style={{ fontSize: "13px", color: "#86868b", margin: 0 }}>
                                You can also reach me directly through the contact section
                            </p>
                        </div>
                    )}

                </div>
            </div>

            {/* Bottom Quote */}
            <div className="bottom-quote" style={{ marginTop: "32px", fontSize: "14px", fontStyle: "italic", color: "#86868b", textAlign: "center" }}>
                "No commitment. Just a conversation."
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .quote-card {
                    /* Initial state handled by JS, but fallback here */
                }
                .form-input:focus {
                    border-color: #2d6a4f !important;
                    box-shadow: 0 0 0 3px rgba(45,106,79,0.1) !important;
                    outline: none;
                }
                .send-button:hover:not(:disabled) {
                    background: #3a8a64 !important;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(45,106,79,0.25) !important;
                }
                .send-button:active:not(:disabled) {
                    transform: scale(0.98);
                }
                .send-button::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 50%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transform: skewX(-20deg);
                    transition: none;
                }
                .send-button:hover:not(:disabled)::after {
                    left: 150%;
                    transition: left 0.6s ease-in-out;
                }
                
                @media (max-width: 600px) {
                    .quote-card {
                        padding: 32px 24px !important;
                        margin: 16px;
                    }
                    .step-1-grid {
                        grid-template-columns: 1fr !important;
                    }
                }

                @keyframes drawCircle {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes drawPath {
                    to { stroke-dashoffset: 0; }
                }
                .success-circle {
                    animation: drawCircle 0.6s ease-out forwards;
                }
                .success-path {
                    animation: drawPath 0.3s ease-out 0.6s forwards;
                }
            `}} />
        </div>
    );
}

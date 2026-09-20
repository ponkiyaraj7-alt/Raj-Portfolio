import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import AIWorkflowSection from "@/components/workflow/AIWorkflowSection";
import CapabilitiesSection from "@/components/capabilities/CapabilitiesSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import AIStackSection from "@/components/stack/AIStackSection";
import AboutSection from "@/components/about/AboutSection";

const WorkSection = dynamic(
  () => import("@/components/sections/WorkSection")
);
const AIPlaygroundSection = dynamic(
  () => import("@/components/playground/AIPlaygroundSection")
);
const CredentialsSection = dynamic(
  () => import("@/components/credentials/CredentialsSection")
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection")
);

export default function Home() {
  return (
    <main style={{ backgroundColor: "#ffffff" }}>
      {/* 01 — HERO ("Who is Raj?") */}
      <HeroSection />

      {/* 02 — AI SYSTEM ("What happens when a business problem enters my system?") */}
      <AIWorkflowSection />

      {/* 03 — CAPABILITIES ("What kinds of problems can he solve?") */}
      <CapabilitiesSection />

      {/* 04 — EXPERIENCE ("Who is he professionally? How did he develop his skills?") */}
      <ExperienceSection />

      {/* 05 — PROJECT SYSTEMS ("What has he actually built?") */}
      <WorkSection />

      {/* 06 — AI PLAYGROUND ("Can he demonstrate how AI systems work?") */}
      <AIPlaygroundSection />

      {/* 07 — AI ENGINEERING STACK + CAPABILITY MATRIX ("What technologies does he use?") */}
      <AIStackSection />

      {/* 08 — CREDENTIALS ("Education & certifications") */}
      <CredentialsSection />

      {/* 09 — ABOUT ("How does he approach engineering? How does he think?") */}
      <AboutSection />

      {/* 10 — CONTACT ("How can I connect?") */}
      <ContactSection />
    </main>
  );
}

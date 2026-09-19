import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import StackSection from "@/components/sections/StackSection";

const WorkSection = dynamic(
  () => import("@/components/sections/WorkSection")
);
const PlaygroundSection = dynamic(
  () => import("@/components/sections/PlaygroundSection")
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection")
);

export default function Home() {
  return (
    <main style={{ backgroundColor: "#ffffff" }}>
      {/* === Hero === */}
      <HeroSection />

      {/* === Content Sections === */}
      <StackSection />
      <WorkSection />
      <PlaygroundSection />
      <ContactSection />
    </main>
  );
}

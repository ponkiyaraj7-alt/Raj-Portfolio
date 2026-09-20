import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/chat/ChatWidget";
import CustomCursor from "@/components/hero/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Raj Ponkiya | Associate AI Developer — AI Automation & Workflows",
  description:
    "Raj Ponkiya is an Associate AI Developer engineering practical AI systems, LLM applications, and autonomous agents that turn repetitive business processes into automated workflows.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "Raj Ponkiya",
    "Associate AI Developer",
    "AI Developer",
    "AI Automation",
    "LLM Applications",
    "AI Agents",
    "Agentic Workflows",
    "RAG Systems",
    "Python",
    "LangChain",
    "LangGraph",
    "Next.js",
  ],
  openGraph: {
    title: "Raj Ponkiya | Associate AI Developer",
    description:
      "Building practical AI systems, autonomous agents, and intelligent workflows that turn manual business processes into automated pipelines.",
    url: "https://github.com/ponkiyaraj7-alt",
    siteName: "Raj Ponkiya Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jakarta.variable} ${syne.variable} ${jetbrains.variable} antialiased font-sans`}
      >
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <CustomCursor />
        <ChatWidget />
      </body>
    </html>
  );
}

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
  title: "Raj Ponkiya | Associate AI Developer & Automation Engineer",
  description:
    "Portfolio of Raj Ponkiya, an Associate AI Developer specializing in AI development, AI automation, LLM-based solutions, AI agents, and intelligent workflow systems.",
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
    "LLM Solutions",
    "AI Agents",
    "Workflow Automation",
    "LangChain",
    "LangGraph",
    "Python",
    "Next.js",
  ],
  openGraph: {
    title: "Raj Ponkiya | Associate AI Developer & Automation Engineer",
    description:
      "Associate AI Developer specializing in building practical AI solutions, AI agents, LLMs, and workflow automation.",
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

<div align="center">

# ✦ Raj Ponkiya — Portfolio

### Associate AI Developer Portfolio Built with Next.js, GSAP & Framer Motion

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br/>

**A production-grade, animated developer portfolio** featuring a 300-frame hero scroll sequence, interactive canvas playgrounds, glassmorphism UI, and live project showcases — all crafted with pixel-perfect attention to detail.

<br/>

[📁 Projects](#-projects-showcase) &nbsp;·&nbsp; [⚡ Features](#-features) &nbsp;·&nbsp; [🛠 Tech Stack](#-tech-stack) &nbsp;·&nbsp; [🚀 Getting Started](#-getting-started)

<br/>

![Portfolio Preview](public/Dashboard.png)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Projects Showcase](#-projects-showcase)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Performance](#-performance)
- [Design System](#-design-system)
- [About the Developer](#-about-the-developer)

---

## 🌟 Overview

This portfolio is engineered to showcase practical AI development, intelligent automation, and full-stack systems engineering. Every section communicates engineering capability:

- **The hero** communicates primary positioning: turning repetitive business processes into intelligent, automated workflows
- **The stack** presents a practical AI & full-stack toolkit (LangGraph, LangChain, FastAPI, Next.js, pgvector)
- **The work** demonstrates structured case studies (`Problem → Solution → AI Component → Automation → Technology → Outcome`)
- **The interactive surfaces** ground complex logic into intuitive, responsive user experiences

> *"I build AI-powered systems that turn repetitive business processes into intelligent, automated workflows."*

---

## ⚡ Features

### 🎬 Hero Scroll Sequence
- **300-frame canvas animation** rendered at device pixel ratio for crisp display on retina screens
- GSAP `ScrollTrigger` drives frame playback — scroll = cinema
- 3D perspective transforms: text pushes forward in Z-space as you scroll
- Dashboard mockup scales from `0.3 → 1.0` with spring easing at 60–90% scroll progress
- Navigation fades out seamlessly during the cinematic sequence

### 🎨 Interactive Canvas Playgrounds
Three fully custom canvas-based demos built from scratch:

| Demo | Description |
|------|-------------|
| **Gravity Garden** | Click anywhere to plant branching particle trees with animated leaves |
| **Particle Painter** | Mouse-driven particle emission — velocity maps to color (green → gold) |
| **Magnetic Typography** | Letters spring toward your cursor within a configurable influence radius |

### 📐 Glassmorphism Design System
- `backdrop-filter: blur()` glass cards throughout
- Layered shadows (inner glow + outer depth) for premium 3D feel
- Apple-inspired color language: `#2d6a4f` moss green accent, `#1d1d1f` deep black
- Fluid responsive typography using CSS `clamp()` — scales from mobile to 4K

### 🏗 Bento Grid Layout
- Asymmetric responsive grid for tech stack showcase
- First and last cards span full width for visual rhythm
- 3D tilt effect on hover — mouse position mapped to `rotateX` and `rotateY`

### 📱 App & Website Project Cards
- **App cards:** Phone frame mockups with mouse-tracking 3D rotation
- **Website cards:** Live `<iframe>` embeds with browser chrome UI
- **Glass modal:** Full case study, tech stack pills, live + GitHub links

### 🌊 Smooth Scrolling Architecture
- **Lenis** physics-based smooth scroll (zero-lag smoothing)
- GSAP ScrollTrigger synced with Lenis `raf` loop
- 120fps butter-smooth scroll even with heavy canvas rendering

---

## 💼 Projects Showcase

### Client & Application Systems

| Project | Type | Stack | Status |
|---------|------|-------|--------|
| **CloudPulse Monitor** | Telemetry & Automated Alerting | Flutter, Dart, Firebase, REST APIs | Shipped |
| **AIVoice Platform** | Voice AI & Automation | Flutter, Dart, Whisper, Python | Shipped |

### Platforms & Workflow Systems

| Project | Type | Stack |
|---------|------|-------|
| **AI Knowledge Platform** | AI SaaS & Workflow System | Python, FastAPI, LangChain, pgvector, Next.js |
| **ContentStudio Workflow** | Intelligent SaaS Platform | Next.js, Node.js, Redis, Bull Queue, PostgreSQL |
| **Commerce Hub Automation** | E-Commerce System | Next.js App Router, TypeScript, Stripe, Vercel |
| **Order Automation System** | Web Application | React, Node.js, Express, MongoDB |

---

## 🛠 Tech Stack

### Frontend
```
Next.js 16.1.6     →  App Router, Server Components, Image Optimization
React 19.2.3       →  Latest concurrent features
TypeScript 5       →  Full type safety across components and data
Tailwind CSS 4     →  Utility-first styling with custom design tokens
```

### Animation & Motion
```
GSAP 3.14.2        →  ScrollTrigger, timeline orchestration, 300-frame canvas
Framer Motion 12   →  Component animations, useScroll, useTransform, spring physics
Lenis 1.3.18       →  Smooth scroll with GSAP RAF synchronization
```

### Utilities
```
clsx 2.1.1         →  Conditional className utility
tailwind-merge     →  Merge conflicting Tailwind classes safely
```

### Tooling
```
ESLint 9           →  Next.js-specific linting rules
PostCSS            →  Tailwind CSS processing pipeline
```

---

## 🏛 Architecture

```
Portfolio/
├── app/                  # Next.js 16 App Router (pages & layout): fonts, LenisProvider, metadata
│   ├── page.tsx                # Home page — section composition
│   └── globals.css             # Design system, custom animations, CSS vars
│
├── components/
│   ├── HeroScrollSequence.tsx  # 300-frame canvas hero with GSAP ScrollTrigger
│   ├── Navbar.tsx              # Scroll-aware glassmorphic navigation
│   ├── Footer.tsx              # Site footer
│   ├── ProjectCard.tsx         # Reusable project card component
│   ├── CanvasScroll.tsx        # Generic canvas frame-sequence renderer
│   │
│   ├── sections/               # Full-page sections (composition layer)
│   │   ├── HeroDivider.tsx     # SVG wave transition hero → about
│   │   ├── AboutSection.tsx    # Bio, metrics counter, profile
│   │   ├── StackSection.tsx    # Bento grid tech stack showcase
│   │   ├── WorkSection.tsx     # Apps + websites portfolio grid
│   │   ├── PlaygroundSection.tsx # Three interactive canvas demos
│   │   └── ContactSection.tsx  # CTA, services, contact links
│   │
│   ├── ui/                     # Reusable primitives
│   │   ├── BentoGrid.tsx       # Asymmetric bento grid with tilt
│   │   ├── GlassModal.tsx      # Full case study modal
│   │   ├── HorizontalScroll.tsx # Scroll-driven horizontal carousel
│   │   └── TextReveal.tsx      # Word-by-word scroll reveal
│   │
│   └── providers/
│       └── LenisProvider.tsx   # Smooth scroll context + GSAP sync
│
├── data/
│   └── content.ts              # All project data, about info, tech stack
│
├── lib/
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
│
└── public/
    ├── Dashboard.png           # Hero mockup image
    ├── Frames/                 # 300 JPEG frames for hero animation
    ├── my-image.png            # Developer profile photo
    └── [project screenshots]   # Portfolio project preview images
```

### Animation Architecture
```
Lenis (smooth scroll)
     ↓ RAF sync
GSAP ScrollTrigger ←→ HeroScrollSequence (canvas frames)
     +
Framer Motion (component-level: useScroll, whileInView, spring)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17+ or 20+
- **npm** 9+ (or pnpm / yarn)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rajponkiya/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build with optimization
npm run start    # Start production server
npm run lint     # Run ESLint for code quality
```

> No environment variables required. The project is fully driven by `data/content.ts`.

---

## ⚡ Performance

- **Canvas rendering** uses `devicePixelRatio` scaling for crisp display on all screens
- **GPU acceleration** applied to animated elements via `will-change` and `backface-visibility`
- **Lenis smooth scroll** eliminates jank with physics-based easing
- **Next.js Image** optimization for all static assets
- **Code splitting** — each section is a separate component, loaded efficiently
- **`"use client"` directives** only where necessary to preserve SSR benefits

---

## 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Accent | `#2d6a4f` | CTA buttons, highlights, borders |
| Apple Blue | `#0071e3` | Links, interactive states |
| Surface Light | `#F8F9FA` | Section backgrounds |
| Glass BG | `rgba(255,255,255,0.6)` | Cards, modals |
| Text Primary | `#1d1d1f` | Headlines, body |
| Text Secondary | `#6e6e73` | Subtitles, captions |

### Typography
- **Display** — `Outfit` (Google Fonts) for hero headings
- **Body** — `Inter` (Google Fonts) for readable body copy
- **Scale** — Fluid responsive sizing with `clamp()`: `clamp(36px, 6vw, 76px)` for heroes

### Animation Principles
- **Easing** — `power2.out` for entrances, `power2.inOut` for transitions
- **Duration** — 0.3s for micro-interactions, 0.6s for section transitions
- **Stagger** — 0.1s delay between list items for cascade feel
- **Spring** — Framer Motion physics for all hover and interactive states

---

## 👨‍💻 About the Developer

**Raj Ponkiya** is an **Associate AI Developer** specializing in AI development, AI automation, LLM-based solutions, AI agents, workflow automation, and converting manual business processes into intelligent automated systems.

- **Location:** Ahmedabad, Gujarat, India
- **Email:** [ponkiyaraj7@gmail.com](mailto:ponkiyaraj7@gmail.com)
- **GitHub:** [github.com/ponkiyaraj7-alt](https://github.com/ponkiyaraj7-alt)
- **LinkedIn:** [linkedin.com/in/raj-ponkiya](https://www.linkedin.com/in/raj-ponkiya/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with ❤️ by Raj Ponkiya

*Next.js · React 19 · TypeScript · GSAP · Framer Motion · Tailwind CSS · Lenis*

</div>

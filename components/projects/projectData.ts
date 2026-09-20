// ─── Authoritative Project Data Types ─────────────────────────────────────
// Ready for real project case studies.
// When adding real projects, populate CASE_STUDY_PROJECTS with verified data.

export type ProjectTier = 1 | 2 | 3;
export type ProjectCategory =
  | "AI & Automation"
  | "AI SaaS"
  | "Full-Stack AI"
  | "Business Automation"
  | "Voice AI";

export interface ArchNode {
  id: string;
  label: string;
  sublabel?: string;
  tech?: string;
  role: string;
  isAI?: boolean;
  isAccent?: boolean;
}

export interface TechGroup {
  label: string;
  items: string[];
}

export interface CaseStudyProject {
  id: string;
  index: number;           // display order (1-indexed)
  tier: ProjectTier;
  name: string;
  tagline: string;
  category: ProjectCategory;
  badge: string;
  color: string;
  imageUrl?: string;
  role: string;
  status: string;

  // Content sections
  problem: string;
  solution: string;
  aiComponents: string[];  // bullet list of AI capabilities used
  automationFlow: string;  // narrative paragraph
  outcome: string;         // qualitative outcome

  // Architecture diagram
  architecture: ArchNode[];

  // Tech stack grouped
  techStack: TechGroup[];

  // Links — only rendered if valid URL and != "#"
  liveUrl?: string;
  githubUrl?: string;
}

// Ready for verified real projects to be inserted here.
export const CASE_STUDY_PROJECTS: CaseStudyProject[] = [];

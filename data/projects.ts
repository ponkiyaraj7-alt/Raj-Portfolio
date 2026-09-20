export interface ProjectSystem {
  id: string;
  name: string;
  tagline: string;
  category: "AI & Automation" | "Voice AI" | "AI SaaS" | "Full-Stack AI" | "Business Automation";
  badge: string;
  problem: string;
  system: string;
  aiComponent: string;
  automation: string;
  technologies: string[];
  result: string;
  metrics: string;
  color: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

// Ready for verified real projects to be inserted here.
export const PROJECT_SYSTEMS: ProjectSystem[] = [];

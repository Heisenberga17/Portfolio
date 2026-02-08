export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "platforms";
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "frontend" },
  { name: "Astro", level: 85, category: "frontend" },
  { name: "TypeScript", level: 88, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  { name: "HTML/CSS", level: 95, category: "frontend" },
  // Backend
  { name: "Cloudflare Workers", level: 85, category: "backend" },
  { name: "Node.js", level: 80, category: "backend" },
  { name: "REST APIs", level: 88, category: "backend" },
  // Tools
  { name: "Git", level: 85, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
  { name: "Figma", level: 70, category: "tools" },
  { name: "Wrangler", level: 80, category: "tools" },
  { name: "pnpm", level: 85, category: "tools" },
  // Platforms
  { name: "Cloudflare", level: 88, category: "platforms" },
  { name: "Vercel", level: 75, category: "platforms" },
  { name: "Spotify for Artists", level: 80, category: "platforms" },
  { name: "YouTube Studio", level: 78, category: "platforms" },
];

export const skillCategories = ["frontend", "backend", "tools", "platforms"] as const;

export const techStripItems = [
  "React", "Astro", "TypeScript", "Tailwind CSS", "Cloudflare Workers",
  "Node.js", "REST APIs", "Git", "Figma", "Wrangler",
];

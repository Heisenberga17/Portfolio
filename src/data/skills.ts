export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "platforms";
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Astro", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },
  // Backend
  { name: "Cloudflare Workers", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "REST APIs", category: "backend" },
  // Tools
  { name: "Git", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Wrangler", category: "tools" },
  { name: "pnpm", category: "tools" },
  // Platforms
  { name: "Cloudflare", category: "platforms" },
  { name: "Vercel", category: "platforms" },
  { name: "Spotify for Artists", category: "platforms" },
  { name: "YouTube Studio", category: "platforms" },
];

export const skillCategories = ["frontend", "backend", "tools", "platforms"] as const;

export const techStripItems = [
  "React", "Astro", "TypeScript", "Tailwind CSS", "Cloudflare Workers",
  "Node.js", "REST APIs", "Git", "Figma", "Wrangler",
];

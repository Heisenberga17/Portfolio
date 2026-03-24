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
  { name: "Three.js", category: "frontend" },
  { name: "GSAP", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },
  // Backend
  { name: "Cloudflare Workers", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "C/C++", category: "backend" },
  { name: "REST APIs", category: "backend" },
  // Tools
  { name: "Git", category: "tools" },
  { name: "GitHub Actions", category: "tools" },
  { name: "Claude Code", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Wrangler", category: "tools" },
  { name: "pnpm", category: "tools" },
  { name: "Figma", category: "tools" },
  // Platforms
  { name: "Cloudflare", category: "platforms" },
  { name: "GitHub", category: "platforms" },
  { name: "Spotify for Artists", category: "platforms" },
  { name: "YouTube Studio", category: "platforms" },
];

export const skillCategories = ["frontend", "backend", "tools", "platforms"] as const;

export const techStripItems = [
  "React", "Astro", "TypeScript", "Tailwind CSS", "Three.js",
  "GSAP", "Cloudflare Workers", "Node.js", "Python", "C/C++",
  "GitHub Actions", "Claude Code",
];

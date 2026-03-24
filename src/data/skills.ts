export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "platforms";
  daily?: boolean;
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", daily: true },
  { name: "Astro", category: "frontend", daily: true },
  { name: "TypeScript", category: "frontend", daily: true },
  { name: "JavaScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend", daily: true },
  { name: "Three.js", category: "frontend" },
  { name: "GSAP", category: "frontend" },
  { name: "Anime.js", category: "frontend" },
  { name: "Motion", category: "frontend" },
  { name: "MDX", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },
  // Backend
  { name: "Cloudflare Workers", category: "backend", daily: true },
  { name: "Node.js", category: "backend", daily: true },
  { name: "Python", category: "backend" },
  { name: "C/C++", category: "backend" },
  { name: "Assembly", category: "backend" },
  { name: "OpenGL/GLSL", category: "backend" },
  { name: "REST APIs", category: "backend", daily: true },
  // Tools
  { name: "Git", category: "tools", daily: true },
  { name: "GitHub Actions", category: "tools", daily: true },
  { name: "Claude Code", category: "tools", daily: true },
  { name: "Vite", category: "tools", daily: true },
  { name: "VS Code", category: "tools", daily: true },
  { name: "Vitest", category: "tools" },
  { name: "Wrangler", category: "tools", daily: true },
  { name: "CMake", category: "tools" },
  { name: "pnpm", category: "tools", daily: true },
  { name: "Figma", category: "tools" },
  // Platforms
  { name: "Cloudflare", category: "platforms", daily: true },
  { name: "GitHub", category: "platforms", daily: true },
  { name: "Spotify for Artists", category: "platforms" },
  { name: "YouTube Studio", category: "platforms" },
];

export const skillCategories = ["frontend", "backend", "tools", "platforms"] as const;

export const techStripItems = [
  "React", "Astro", "TypeScript", "Three.js", "GSAP",
  "Cloudflare Workers", "Node.js", "Python", "C/C++",
  "Assembly", "OpenGL", "Vite", "Claude Code",
];

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "platforms";
  daily?: boolean;
  url: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", daily: true, url: "https://react.dev" },
  { name: "Astro", category: "frontend", daily: true, url: "https://astro.build" },
  { name: "TypeScript", category: "frontend", daily: true, url: "https://www.typescriptlang.org" },
  { name: "JavaScript", category: "frontend", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
  { name: "Tailwind CSS", category: "frontend", daily: true, url: "https://tailwindcss.com" },
  { name: "Three.js", category: "frontend", url: "https://threejs.org" },
  { name: "GSAP", category: "frontend", url: "https://gsap.com" },
  { name: "Anime.js", category: "frontend", url: "https://animejs.com" },
  { name: "Motion", category: "frontend", url: "https://motion.dev" },
  { name: "MDX", category: "frontend", url: "https://mdxjs.com" },
  { name: "HTML/CSS", category: "frontend", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  // Backend
  { name: "Cloudflare Workers", category: "backend", daily: true, url: "https://workers.cloudflare.com" },
  { name: "Node.js", category: "backend", daily: true, url: "https://nodejs.org" },
  { name: "Python", category: "backend", url: "https://www.python.org" },
  { name: "C/C++", category: "backend", url: "https://cplusplus.com/doc/tutorial" },
  { name: "Assembly", category: "backend", url: "https://rgbds.gbdev.io" },
  { name: "OpenGL/GLSL", category: "backend", url: "https://learnopengl.com" },
  { name: "REST APIs", category: "backend", daily: true, url: "https://restfulapi.net" },
  // Tools
  { name: "Git", category: "tools", daily: true, url: "https://git-scm.com" },
  { name: "GitHub Actions", category: "tools", daily: true, url: "https://github.com/features/actions" },
  { name: "Claude Code", category: "tools", daily: true, url: "https://docs.anthropic.com/en/docs/claude-code/overview" },
  { name: "Vite", category: "tools", daily: true, url: "https://vite.dev" },
  { name: "VS Code", category: "tools", daily: true, url: "https://code.visualstudio.com" },
  { name: "Vitest", category: "tools", url: "https://vitest.dev" },
  { name: "Wrangler", category: "tools", daily: true, url: "https://developers.cloudflare.com/workers/wrangler" },
  { name: "CMake", category: "tools", url: "https://cmake.org" },
  { name: "pnpm", category: "tools", daily: true, url: "https://pnpm.io" },
  { name: "Figma", category: "tools", url: "https://www.figma.com" },
  // Platforms
  { name: "Cloudflare", category: "platforms", daily: true, url: "https://www.cloudflare.com" },
  { name: "GitHub", category: "platforms", daily: true, url: "https://github.com" },
  { name: "Spotify for Artists", category: "platforms", url: "https://artists.spotify.com" },
  { name: "YouTube Studio", category: "platforms", url: "https://studio.youtube.com" },
];

export const skillCategories = ["frontend", "backend", "tools", "platforms"] as const;

export const techStripItems = [
  "React", "Astro", "TypeScript", "Three.js", "GSAP",
  "Cloudflare Workers", "Node.js", "Python", "C/C++",
  "Assembly", "OpenGL", "Vite", "Claude Code",
];

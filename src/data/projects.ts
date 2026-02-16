export interface Project {
  slug: string;
  title: string;
  url: string;
  description: string;
  longDescription: string;
  role: string;
  category: "Web Platform" | "Business" | "Music";
  tech: string[];
  featured: boolean;
  color: string;
  image: string;
}

export const projects: Project[] = [
  {
    slug: "casa24records",
    title: "Casa 24 Records",
    url: "https://casa24records.info",
    description: "Analytics platform, drum machine, and digital archive for a Panama City music collective. ~12,000 lines of handwritten code with a retro terminal aesthetic.",
    longDescription: "Digital headquarters for seven artists in Panama City making genre-fluid music with zero labels. Part analytics dashboard (Spotify, YouTube, Instagram, Discord metrics updated daily via Python pipeline), part creative studio (a professional drum machine built on the Web Audio API), part digital archive (a Google Drive-powered magazine viewer and audio player with a markdown lore system). Single Astro static site simulating an SPA with five sections, a React analytics island with Recharts, and a 3,220-line vanilla JS drum sequencer with WAV export. Retro green-on-dark terminal aesthetic deployed to Cloudflare Pages.",
    role: "Founder & Developer",
    category: "Music",
    tech: ["Astro", "React", "TypeScript", "Web Audio API", "Recharts", "Python", "Cloudflare Workers"],
    featured: true,
    color: "#f59e0b",
    image: "/images/projects/casa24records-hero.png",
  },
  {
    slug: "massport",
    title: "Massport",
    url: "https://massport507.com",
    description: "Football tournament platform for Panama. Manage tournaments, teams, schedules, and live scores.",
    longDescription: "Massport is a comprehensive football tournament management platform built for the Panamanian sports community. It handles everything from tournament creation and team registration to real-time score updates and standings. The platform serves organizers, teams, and fans with an intuitive interface that makes managing local football tournaments seamless.",
    role: "Full-Stack Developer",
    category: "Web Platform",
    tech: ["React", "Cloudflare Workers", "Tailwind CSS", "TypeScript"],
    featured: true,
    color: "#22c55e",
    image: "/images/projects/massport-hero.png",
  },
  {
    slug: "microclean",
    title: "MicroClean",
    url: "https://microcleanpa.com",
    description: "Professional cleaning service platform with online quotation system and booking.",
    longDescription: "MicroClean is a professional cleaning service platform that streamlines the booking process for customers in Panama City. The platform features an intelligent quotation system that provides instant price estimates based on property size and service type, along with an easy booking flow that connects customers with cleaning professionals.",
    role: "Developer & Co-Owner",
    category: "Business",
    tech: ["HTML/CSS", "JavaScript", "Cloudflare Workers"],
    featured: true,
    color: "#3b82f6",
    image: "/images/projects/microclean-hero.png",
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "Web Platform", label: "Web Platform" },
  { id: "Business", label: "Business" },
  { id: "Music", label: "Music" },
] as const;

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
  {
    slug: "casa24records",
    title: "Casa 24 Records",
    url: "https://casa24records.info",
    description: "Independent hip-hop collective from Panama. Seven artists creating genre-fluid music spanning rap, R&B, indie, and Latin styles.",
    longDescription: "Casa 24 Records is the digital home of an independent hip-hop collective from Panama City. The platform showcases seven artists who create genre-fluid music spanning rap, R&B, indie, and Latin styles. It integrates with Spotify and YouTube APIs to display the latest releases, streaming stats, and music videos, serving as both a promotional tool and fan hub.",
    role: "Founder & Developer",
    category: "Music",
    tech: ["React", "Spotify API", "YouTube API", "Cloudflare Workers", "Tailwind CSS"],
    featured: true,
    color: "#f59e0b",
    image: "/images/projects/casa24records-hero.png",
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "Web Platform", label: "Web Platform" },
  { id: "Business", label: "Business" },
  { id: "Music", label: "Music" },
] as const;

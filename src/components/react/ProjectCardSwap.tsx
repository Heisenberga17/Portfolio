import { useRef, useState } from "react";
import CardSwap, { Card } from "@/components/CardSwap";
import type { CardSwapHandle } from "@/components/CardSwap";

interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category?: string;
}

interface ProjectCardSwapProps {
  projects: Project[];
}

export default function ProjectCardSwap({ projects }: ProjectCardSwapProps) {
  const swapRef = useRef<CardSwapHandle>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Card stack */}
      <div
        className="relative w-full flex justify-center"
        style={{ height: 460 }}
      >
        <CardSwap
          ref={swapRef}
          width={580}
          height={380}
          cardDistance={50}
          verticalDistance={45}
          delay={12000}
          pauseOnHover={true}
          skewAmount={4}
          easing="elastic"
          onSwap={(frontIdx) => setActiveIndex(frontIdx)}
          onCardClick={(idx) => {
            window.location.href = `/projects/${projects[idx].slug}`;
          }}
        >
          {projects.map((project) => (
            <Card
              key={project.slug}
              customClass="!bg-bg-card !border-border/60 cursor-pointer overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-target"
            >
              <div className="w-full h-full relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20 pb-5 px-5">
                  {project.category && (
                    <span className="font-mono text-[0.6rem] text-accent-secondary/90 uppercase tracking-[0.15em] mb-1.5 block">
                      {project.category}
                    </span>
                  )}
                  <h3 className="font-heading font-semibold text-[1.1rem] text-white leading-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-[0.78rem] leading-relaxed line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.58rem] px-2 py-0.5 rounded bg-white/10 text-white/70 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => swapRef.current?.prev()}
          className="w-10 h-10 rounded-full border border-border bg-bg-card flex items-center justify-center text-text-secondary transition-colors hover:border-accent-primary hover:text-accent-primary"
          aria-label="Previous project"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-6 bg-accent-primary"
                  : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => swapRef.current?.next()}
          className="w-10 h-10 rounded-full border border-border bg-bg-card flex items-center justify-center text-text-secondary transition-colors hover:border-accent-primary hover:text-accent-primary"
          aria-label="Next project"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

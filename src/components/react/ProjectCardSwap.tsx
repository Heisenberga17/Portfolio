import CardSwap, { Card } from "@/components/CardSwap";

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
  return (
    <div className="relative w-full flex justify-center" style={{ height: 460 }}>
      <CardSwap
        width={580}
        height={380}
        cardDistance={50}
        verticalDistance={45}
        delay={4500}
        pauseOnHover={true}
        skewAmount={4}
        easing="elastic"
        onCardClick={(idx) => {
          window.location.href = `/projects/${projects[idx].slug}`;
        }}
      >
        {projects.map((project) => (
          <Card
            key={project.slug}
            customClass="!bg-bg-card !border-border/60 cursor-pointer overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            <div className="w-full h-full relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Bottom gradient with project info */}
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
  );
}

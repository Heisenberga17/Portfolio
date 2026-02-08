import SpotlightCard from "@/components/SpotlightCard";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
  color?: string;
  url?: string;
  category?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  slug,
  color = "#2D5741",
  url,
}: ProjectCardProps) {
  return (
    <a
      href={`/projects/${slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <SpotlightCard
        className="!rounded-[14px] !border-border !bg-bg-card !p-0 h-full transition-all duration-300 hover:!border-accent-primary hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35),0_0_0_1px_rgba(45,87,65,0.15)]"
        spotlightColor="rgba(45, 87, 65, 0.12)"
      >
        <div className="flex flex-col h-full">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-bg-secondary">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            {/* Accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              style={{ background: color }}
            />
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col gap-2.5 flex-1">
            <h3 className="font-heading font-semibold text-[1.15rem] text-text-primary leading-tight m-0">
              {title}
            </h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed m-0 line-clamp-2">
              {description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-auto pt-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.7rem] px-2.5 py-0.5 rounded-md bg-accent-primary/10 text-accent-primary border border-accent-primary/15 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
            {url && (
              <span
                className="inline-flex items-center gap-1 font-mono text-[0.72rem] text-accent-secondary mt-1 w-fit opacity-70 hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(url, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                Visit Site
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </SpotlightCard>
    </a>
  );
}

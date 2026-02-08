import { useRef, useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
  color: string;
  url: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  slug,
  color,
  url,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  }

  return (
    <>
      <style>{`
        @keyframes pc-fade-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .project-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 14px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.3s ease, transform 0.25s ease, box-shadow 0.3s ease;
          animation: pc-fade-up 0.6s ease-out backwards;
        }
        .project-card:hover {
          border-color: var(--color-accent-primary);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(45,87,65,0.15);
        }
        .project-card__spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 14px;
        }
        .project-card:hover .project-card__spotlight {
          opacity: 1;
        }
        .project-card__img-wrap {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: var(--color-bg-secondary);
        }
        .project-card__img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .project-card:hover .project-card__img-wrap img {
          transform: scale(1.05);
        }
        /* Colored line at top of image */
        .project-card__accent-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .project-card:hover .project-card__accent-line {
          transform: scaleX(1);
        }
        .project-card__body {
          position: relative;
          z-index: 2;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .project-card__title {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1.15rem;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.3;
        }
        .project-card__desc {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
          padding-top: 6px;
        }
        .project-card__tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          padding: 3px 10px;
          border-radius: 6px;
          background: rgba(45,87,65,0.1);
          color: var(--color-accent-primary);
          border: 1px solid rgba(45,87,65,0.15);
          letter-spacing: 0.02em;
        }
        .project-card__visit {
          position: relative;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--color-accent-secondary);
          text-decoration: none;
          margin-top: 4px;
          padding: 4px 0;
          opacity: 0.7;
          transition: opacity 0.2s ease;
          width: fit-content;
        }
        .project-card__visit:hover {
          opacity: 1;
          text-decoration: underline;
        }
      `}</style>

      <a
        ref={cardRef}
        href={`/projects/${slug}`}
        className="project-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Spotlight overlay */}
        <div
          className="project-card__spotlight"
          style={{
            background: isHovered
              ? `radial-gradient(circle 280px at ${spotlight.x}% ${spotlight.y}%, rgba(45,87,65,0.08), transparent)`
              : "none",
          }}
        />

        {/* Image */}
        <div className="project-card__img-wrap">
          <img src={image} alt={title} loading="lazy" />
          <div
            className="project-card__accent-line"
            style={{ background: color }}
          />
        </div>

        {/* Body */}
        <div className="project-card__body">
          <h3 className="project-card__title">{title}</h3>
          <p className="project-card__desc">{description}</p>
          <div className="project-card__tags">
            {tags.map((tag) => (
              <span key={tag} className="project-card__tag">
                {tag}
              </span>
            ))}
          </div>
          <span
            className="project-card__visit"
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
        </div>
      </a>
    </>
  );
}

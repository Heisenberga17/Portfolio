import { useState } from "react";
import ProjectCard from "./ProjectCard";

interface ProjectData {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  color: string;
  url: string;
}

interface ProjectFilterProps {
  projects: ProjectData[];
}

const FILTERS = [
  { id: "all", label: "All" },
  { id: "Web Platform", label: "Web Platform" },
  { id: "Business", label: "Business" },
  { id: "Music", label: "Music" },
] as const;

export default function ProjectFilter({ projects }: ProjectFilterProps) {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div>
      <style>{`
        .pf-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .pf-btn {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 20px;
          border-radius: 8px;
          border: 1px solid var(--color-border);
          background: var(--color-bg-card);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
        }
        .pf-btn:hover {
          border-color: var(--color-accent-primary);
          color: var(--color-text-primary);
        }
        .pf-btn--active {
          background: var(--color-accent-primary);
          border-color: var(--color-accent-primary);
          color: #F0E6D3;
          box-shadow: 0 0 16px rgba(45,87,65,0.25);
        }
        .pf-btn--active:hover {
          border-color: var(--color-accent-hover);
          background: var(--color-accent-hover);
          color: #F0E6D3;
        }

        .pf-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .pf-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .pf-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Fade transition wrapper */
        .pf-item {
          animation: pf-item-in 0.4s ease-out backwards;
        }
        @keyframes pf-item-in {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Count badge */
        .pf-count {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-text-secondary);
          margin-bottom: 20px;
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* Filter buttons */}
      <div className="pf-filters">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`pf-btn ${active === f.id ? "pf-btn--active" : ""}`}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="pf-count">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        {active !== "all" ? ` in ${active}` : ""}
      </p>

      {/* Grid */}
      <div className="pf-grid">
        {filtered.map((project, i) => (
          <div
            key={project.slug}
            className="pf-item"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              slug={project.slug}
              color={project.color}
              url={project.url}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            marginTop: 48,
          }}
        >
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}

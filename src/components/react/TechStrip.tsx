const ITEMS = [
  "React",
  "Astro",
  "TypeScript",
  "Tailwind CSS",
  "Cloudflare Workers",
  "Node.js",
  "REST APIs",
  "Git",
  "Figma",
  "Wrangler",
];

/* A single row of tech names for the marquee */
function MarqueeRow({ direction }: { direction: "left" | "right" }) {
  const animName =
    direction === "left" ? "ts-scroll-left" : "ts-scroll-right";

  return (
    <div
      style={{
        display: "flex",
        width: "max-content",
        animation: `${animName} 40s linear infinite`,
      }}
    >
      {/* Render the list twice for seamless loop */}
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span
          key={`${item}-${i}`}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            opacity: 0.07,
            whiteSpace: "nowrap",
            padding: "0 32px",
            letterSpacing: "-0.02em",
            userSelect: "none",
            transition: "opacity 0.3s ease",
          }}
          className="ts-item"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function TechStrip() {
  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        padding: "32px 0",
      }}
    >
      <style>{`
        @keyframes ts-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes ts-scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        .ts-item:hover {
          opacity: 0.25 !important;
        }

        /* Fade edges */
        .ts-container::before,
        .ts-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .ts-container::before {
          left: 0;
          background: linear-gradient(90deg, var(--color-bg-primary), transparent);
        }
        .ts-container::after {
          right: 0;
          background: linear-gradient(270deg, var(--color-bg-primary), transparent);
        }

        /* Separator line between rows */
        .ts-separator {
          height: 1px;
          background: linear-gradient(90deg, transparent 5%, var(--color-border) 50%, transparent 95%);
          margin: 8px 0;
        }

        /* Pause on hover for accessibility */
        .ts-track:hover > div {
          animation-play-state: paused;
        }
      `}</style>

      <div className="ts-container" style={{ position: "relative" }}>
        <div className="ts-track">
          <MarqueeRow direction="left" />
        </div>
        <div className="ts-separator" />
        <div className="ts-track">
          <MarqueeRow direction="right" />
        </div>
      </div>
    </div>
  );
}

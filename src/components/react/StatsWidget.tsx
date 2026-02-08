import CountUp from "@/components/CountUp";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
}

const STATS: StatItem[] = [
  { value: 3, suffix: "+", label: "Years", sublabel: "Experience" },
  { value: 3, suffix: "", label: "Active", sublabel: "Projects" },
  { value: 3, suffix: "", label: "Industries", sublabel: "Music, Sports, Services" },
];

export default function StatsWidget() {
  return (
    <div>
      <style>{`
        .sw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--color-border);
          border: 1px solid var(--color-border);
          border-radius: 14px;
          overflow: hidden;
        }
        @media (max-width: 600px) {
          .sw-grid {
            grid-template-columns: 1fr;
          }
        }
        .sw-card {
          background: var(--color-bg-card);
          padding: 36px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .sw-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-accent-secondary), transparent);
          opacity: 0.6;
        }
        .sw-number {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-accent-secondary);
          line-height: 1;
        }
        .sw-label {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-top: 8px;
        }
        .sw-sublabel {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--color-text-secondary);
          margin-top: 4px;
        }
      `}</style>

      <div className="sw-grid">
        {STATS.map((stat) => (
          <div key={stat.label} className="sw-card">
            <div className="sw-number">
              <CountUp
                to={stat.value}
                from={0}
                duration={2}
                separator=""
              />
              {stat.suffix}
            </div>
            <div className="sw-label">{stat.label}</div>
            {stat.sublabel && (
              <div className="sw-sublabel">{stat.sublabel}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

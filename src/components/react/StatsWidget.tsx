import { useEffect, useRef, useState } from "react";

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

function AnimatedCounter({
  target,
  suffix,
  triggered,
}: {
  target: number;
  suffix: string;
  triggered: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const duration = 1600;
    const stepTime = 40;
    const steps = Math.ceil(duration / stepTime);
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [triggered, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
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

        /* Subtle top accent glow */
        .sw-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-accent-secondary), transparent);
          opacity: 0;
          transition: opacity 0.6s ease 0.3s;
        }
        .sw-card--visible::before {
          opacity: 1;
        }

        @keyframes sw-number-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        .sw-number {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-accent-secondary);
          line-height: 1;
          opacity: 0;
        }
        .sw-number--visible {
          animation: sw-number-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes sw-label-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .sw-label {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-top: 8px;
          opacity: 0;
        }
        .sw-label--visible {
          animation: sw-label-in 0.5s ease-out forwards;
        }

        .sw-sublabel {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--color-text-secondary);
          margin-top: 4px;
          opacity: 0;
        }
        .sw-sublabel--visible {
          animation: sw-label-in 0.5s ease-out forwards;
        }
      `}</style>

      <div className="sw-grid">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`sw-card ${visible ? "sw-card--visible" : ""}`}
          >
            <div
              className={`sw-number ${visible ? "sw-number--visible" : ""}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                triggered={visible}
              />
            </div>
            <div
              className={`sw-label ${visible ? "sw-label--visible" : ""}`}
              style={{ animationDelay: `${i * 0.15 + 0.2}s` }}
            >
              {stat.label}
            </div>
            {stat.sublabel && (
              <div
                className={`sw-sublabel ${visible ? "sw-sublabel--visible" : ""}`}
                style={{ animationDelay: `${i * 0.15 + 0.35}s` }}
              >
                {stat.sublabel}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

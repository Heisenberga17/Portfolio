import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
}

export default function SkillBar({ name, level }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef}>
      <style>{`
        .sb-wrap {
          margin-bottom: 18px;
        }
        .sb-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 7px;
        }
        .sb-name {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-primary);
        }
        .sb-pct {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-accent-secondary);
          letter-spacing: 0.03em;
          opacity: 0;
          transition: opacity 0.4s ease 0.5s;
        }
        .sb-pct--visible {
          opacity: 1;
        }
        .sb-track {
          position: relative;
          width: 100%;
          height: 8px;
          background: var(--color-bg-secondary);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        .sb-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, #2D5741 0%, #3A7055 50%, #D4A843 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sb-fill--visible {
          transform: scaleX(1);
        }
        /* Glow tip */
        .sb-fill::after {
          content: '';
          position: absolute;
          right: 0;
          top: -2px;
          bottom: -2px;
          width: 12px;
          background: radial-gradient(circle at right, rgba(212,168,67,0.5) 0%, transparent 100%);
          border-radius: 0 4px 4px 0;
          opacity: 0;
          transition: opacity 0.3s ease 0.8s;
        }
        .sb-fill--visible::after {
          opacity: 1;
        }
      `}</style>

      <div className="sb-wrap">
        <div className="sb-header">
          <span className="sb-name">{name}</span>
          <span className={`sb-pct ${visible ? "sb-pct--visible" : ""}`}>
            {level}%
          </span>
        </div>
        <div className="sb-track">
          <div
            className={`sb-fill ${visible ? "sb-fill--visible" : ""}`}
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </div>
  );
}

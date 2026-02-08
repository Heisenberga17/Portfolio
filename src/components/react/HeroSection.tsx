import { useEffect, useRef } from "react";

const HEADING_WORD = "Heisen's";
const SUB_WORD = "Den";
const TAGLINE =
  "Building digital products across music, sports, and services";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Parallax-drift effect on the grid background */
  useEffect(() => {
    let raf: number;
    let y = 0;
    const tick = () => {
      y += 0.15;
      if (sectionRef.current) {
        const grid = sectionRef.current.querySelector(
          ".hero-grid-bg"
        ) as HTMLElement | null;
        if (grid) {
          grid.style.transform = `translate(${Math.sin(y * 0.01) * 12}px, ${y % 200}px)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-bg-primary)",
      }}
    >
      <style>{`
        /* ---- Grid background ---- */
        .hero-grid-bg {
          position: absolute;
          inset: -100px;
          background-image:
            linear-gradient(rgba(45,87,65,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,87,65,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        /* Radial fade overlay so grid fades at edges */
        .hero-grid-fade {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 70% 60% at 50% 45%,
            transparent 0%,
            var(--color-bg-primary) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Noise texture overlay for depth */
        .hero-noise {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
          pointer-events: none;
          z-index: 1;
        }

        /* Ambient glow spots */
        .hero-glow-green {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(45,87,65,0.18) 0%, transparent 70%);
          top: 15%;
          left: 10%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          animation: hero-glow-drift 8s ease-in-out infinite alternate;
        }
        .hero-glow-gold {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%);
          bottom: 20%;
          right: 12%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          animation: hero-glow-drift 10s ease-in-out 2s infinite alternate-reverse;
        }
        @keyframes hero-glow-drift {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(30px, -20px) scale(1.15); }
        }

        /* ---- Character stagger animation ---- */
        @keyframes hero-char-in {
          0% {
            opacity: 0;
            transform: translateY(40px) rotateX(40deg);
            filter: blur(8px);
          }
          60% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
            filter: blur(0px);
          }
        }
        .hero-char {
          display: inline-block;
          opacity: 0;
          animation: hero-char-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          font-family: var(--font-heading);
        }

        /* ---- "Den" gradient text ---- */
        @keyframes hero-den-in {
          0% {
            opacity: 0;
            transform: translateY(24px);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        .hero-den {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 1;
          background: linear-gradient(135deg, #2D5741 0%, #3A7055 40%, #D4A843 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          animation: hero-den-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s forwards;
        }

        /* ---- Tagline blur-in ---- */
        @keyframes hero-tagline-in {
          0% {
            opacity: 0;
            filter: blur(12px);
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
        }
        .hero-tagline {
          opacity: 0;
          animation: hero-tagline-in 1s ease-out 1.3s forwards;
        }

        /* ---- CTA buttons container ---- */
        @keyframes hero-ctas-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-ctas {
          opacity: 0;
          animation: hero-ctas-in 0.8s ease-out 1.7s forwards;
        }

        /* ---- CTA solid button ---- */
        .hero-btn-solid {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: #2D5741;
          color: #F0E6D3;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.2s ease;
          box-shadow: 0 0 0 0 rgba(45,87,65,0), 0 2px 8px rgba(0,0,0,0.3);
        }
        .hero-btn-solid:hover {
          transform: translateY(-2px);
          background: #3A7055;
          box-shadow: 0 0 24px rgba(45,87,65,0.35), 0 8px 24px rgba(0,0,0,0.3);
        }

        /* ---- CTA outline button ---- */
        .hero-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: transparent;
          color: #D4A843;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          border: 1.5px solid #D4A843;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.2s ease, color 0.2s ease;
        }
        .hero-btn-outline:hover {
          transform: translateY(-2px);
          background: rgba(212,168,67,0.08);
          box-shadow: 0 0 24px rgba(212,168,67,0.2), 0 8px 24px rgba(0,0,0,0.2);
        }

        /* ---- Decorative corner glyphs ---- */
        .hero-corner-glyph {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-accent-primary);
          opacity: 0.2;
          pointer-events: none;
          user-select: none;
          z-index: 2;
          letter-spacing: 2px;
        }

        /* ---- Scroll indicator ---- */
        @keyframes hero-scroll-bob {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        .hero-scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          animation: hero-scroll-bob 2s ease-in-out infinite;
          opacity: 0;
          animation-delay: 2.5s;
          animation-fill-mode: forwards;
        }
        .hero-scroll-indicator svg {
          stroke: var(--color-text-secondary);
        }
      `}</style>

      {/* Background layers */}
      <div className="hero-grid-bg" />
      <div className="hero-grid-fade" />
      <div className="hero-noise" />
      <div className="hero-glow-green" />
      <div className="hero-glow-gold" />

      {/* Corner decorations - dev/retro den feel */}
      <span className="hero-corner-glyph" style={{ top: 24, left: 24 }}>
        {"// heisen.init()"}
      </span>
      <span className="hero-corner-glyph" style={{ top: 24, right: 24, textAlign: "right" }}>
        {"v0.1.0"}
      </span>
      <span className="hero-corner-glyph" style={{ bottom: 24, left: 24 }}>
        {"<den>"}
      </span>
      <span className="hero-corner-glyph" style={{ bottom: 24, right: 24, textAlign: "right" }}>
        {"SNES://ready"}
      </span>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 800,
          padding: "0 24px",
        }}
      >
        {/* Heading: character stagger */}
        <h1
          style={{
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
            fontWeight: 700,
            lineHeight: 0.95,
            margin: 0,
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            perspective: "600px",
          }}
        >
          {HEADING_WORD.split("").map((char, i) => (
            <span
              key={i}
              className="hero-char"
              style={{
                animationDelay: `${i * 0.07}s`,
                ...(char === " " ? { width: "0.3em" } : {}),
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Subheading: "Den" */}
        <div className="hero-den" style={{ marginTop: 4 }}>
          {SUB_WORD}
        </div>

        {/* Tagline */}
        <p
          className="hero-tagline"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "var(--color-text-secondary)",
            marginTop: 28,
            lineHeight: 1.6,
            maxWidth: 540,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {TAGLINE}
        </p>

        {/* CTAs */}
        <div
          className="hero-ctas"
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="/projects" className="hero-btn-solid">
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
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            View My Work
          </a>
          <a href="/contact" className="hero-btn-outline">
            Get In Touch
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}

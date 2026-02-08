import { lazy, Suspense, useEffect, useState } from "react";
import SplitText from "@/components/SplitText";
import GradientText from "@/components/GradientText";
import BlurText from "@/components/BlurText";
import Squares from "@/components/Squares";
import Magnet from "@/components/Magnet";

const PixelTrail = lazy(() => import("@/components/PixelTrail"));

const TAGLINE =
  "Building digital products across music, sports, and services";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <section
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

        /* Override SplitText wrapper for hero */
        .hero-heading .split-parent {
          overflow: visible !important;
        }
      `}</style>

      {/* Squares animated grid background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Squares
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(45,87,65,0.08)"
          squareSize={48}
          hoverFillColor="rgba(45,87,65,0.04)"
        />
      </div>

      {/* PixelTrail mouse effect — lazy loaded, client only */}
      {mounted && (
        <Suspense fallback={null}>
          <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "auto", opacity: 0.4 }}>
            <PixelTrail
              gridSize={63}
              trailSize={0.1}
              maxAge={300}
              interpolate={5}
              color="#2D5741"
              gooeyFilter={{ id: "hero-goo", strength: 6 }}
            />
          </div>
        </Suspense>
      )}

      <div className="hero-grid-fade" />
      <div className="hero-glow-green" />
      <div className="hero-glow-gold" />

      {/* Corner decorations */}
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
        {/* Heading: SplitText character stagger */}
        <div className="hero-heading">
          <SplitText
            text="Heisen's"
            tag="h1"
            splitType="chars"
            delay={70}
            duration={0.8}
            ease="power3.out"
            from={{ opacity: 0, y: 40, rotateX: 40, filter: "blur(8px)" }}
            to={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
            threshold={0.1}
            rootMargin="0px"
            className="text-[clamp(3.5rem,10vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-text-primary"
          />
        </div>

        {/* Subheading: "Den" with animated gradient */}
        <div style={{ marginTop: 4 }}>
          <GradientText
            colors={["#2D5741", "#3A7055", "#D4A843", "#2D5741"]}
            animationSpeed={6}
            className="text-[clamp(3rem,8vw,6rem)] font-heading font-bold leading-none"
          >
            Den
          </GradientText>
        </div>

        {/* Tagline: BlurText reveal */}
        <div style={{ marginTop: 28, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
          <BlurText
            text={TAGLINE}
            delay={80}
            animateBy="words"
            direction="top"
            className="font-sans text-[clamp(1rem,2.5vw,1.25rem)] text-text-secondary leading-relaxed justify-center"
          />
        </div>

        {/* CTAs with Magnet hover effect */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Magnet padding={60} magnetStrength={3}>
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
          </Magnet>
          <Magnet padding={60} magnetStrength={3}>
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
          </Magnet>
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

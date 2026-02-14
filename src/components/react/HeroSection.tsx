import { lazy, Suspense, useEffect, useState } from "react";
import ASCIIText from "@/components/ASCIIText";
import BlurText from "@/components/BlurText";
import Squares from "@/components/Squares";

const PixelTrail = lazy(() => import("@/components/PixelTrail"));

const TAGLINE = "Developer crafting web platforms and digital experiences";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      <style>{`
        .hero-grid-fade {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, var(--color-bg-primary) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .hero-glow-green {
          position: absolute;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(45,87,65,0.18) 0%, transparent 70%);
          top: 15%; left: 10%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          animation: hero-glow-drift 8s ease-in-out infinite alternate;
        }
        .hero-glow-gold {
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%);
          bottom: 20%; right: 12%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          animation: hero-glow-drift 10s ease-in-out 2s infinite alternate-reverse;
        }
        @keyframes hero-glow-drift {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(30px, -20px) scale(1.15); }
        }
        @keyframes hero-scroll-bob {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        .hero-scroll-indicator {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          animation: hero-scroll-bob 2s ease-in-out infinite;
          opacity: 0;
          animation-delay: 2.5s;
          animation-fill-mode: forwards;
        }
        .hero-scroll-indicator svg { stroke: var(--color-text-secondary); }
      `}</style>

      {/* Squares animated grid background */}
      <div className="absolute inset-0 z-0">
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
          <div className="absolute inset-0 z-[1] pointer-events-auto">
            <PixelTrail
              gridSize={50}
              trailSize={0.15}
              maxAge={400}
              interpolate={6}
              color="#3A7055"
              gooeyFilter={{ id: "hero-goo", strength: 8 }}
            />
          </div>
        </Suspense>
      )}

      <div className="hero-grid-fade" />
      <div className="hero-glow-green" />
      <div className="hero-glow-gold" />

      {/* Main content */}
      <div className="relative z-[2] text-center w-full max-w-[900px] px-6">
        {/* ASCIIText heading */}
        <div className="relative w-full h-[250px] md:h-[300px]">
          <ASCIIText
            text="Heisen's Den"
            asciiFontSize={8}
            textFontSize={150}
            textColor="#fdf9f3"
            planeBaseHeight={6}
            enableWaves={false}
          />
        </div>

        {/* Tagline: BlurText reveal */}
        <div className="mt-4 max-w-[540px] mx-auto">
          <BlurText
            text={TAGLINE}
            delay={80}
            animateBy="words"
            direction="top"
            className="font-sans text-[clamp(1rem,2.5vw,1.25rem)] text-text-secondary leading-relaxed justify-center"
          />
        </div>

        {/* CTAs */}
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-primary text-[#F0E6D3] font-heading font-semibold text-[0.95rem] rounded-[10px] no-underline cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_0_24px_rgba(45,87,65,0.35),0_8px_24px_rgba(0,0,0,0.3)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            View My Work
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-accent-secondary font-heading font-semibold text-[0.95rem] border-[1.5px] border-accent-secondary rounded-[10px] no-underline cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-secondary/8 hover:shadow-[0_0_24px_rgba(212,168,67,0.2),0_8px_24px_rgba(0,0,0,0.2)]"
          >
            Get In Touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}

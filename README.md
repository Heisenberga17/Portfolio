# Heisen's Den

Personal developer portfolio built with Astro 5, React 19, and Tailwind CSS 4. Features WebGL animations, a dark/light theme, and a Cloudflare-powered contact form.

[![Live Site](https://img.shields.io/badge/Live-portfolio--4u5.pages.dev-2D5741?style=flat-square)](https://portfolio-4u5.pages.dev/)
[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)

<!-- Add a screenshot: ![Screenshot](public/og-image.png) -->

## Features

**Pages** — Home, About, Projects (filterable), Blog (scaffolded), Contact

**Animations**
- ASCII text WebGL heading (Three.js + @react-three/fiber)
- Pixel trail mouse effect
- Squares animated grid background
- BlurText reveal, SplitText, DecryptedText, GradientText
- CardSwap elastic carousel with auto-rotation
- SpotlightCard hover glow, TiltedCard parallax
- Custom cursor (TargetCursor + Magnet)

**Performance**
- GPU-friendly glow animations (no `filter: blur`)
- Lazy-loaded Three.js canvas
- `prefers-reduced-motion` respected via `useReducedMotion` hook

**Accessibility**
- Skip-to-content link
- ARIA attributes on interactive elements
- `focus-visible` styles throughout
- Reduced motion hook disables animations when requested

**SEO**
- Open Graph + Twitter Card meta tags
- JSON-LD schema markup (WebSite, ProfilePage, CreativeWork)
- XML sitemap via `@astrojs/sitemap`

**Design**
- Dark/light theme toggle with FOUC prevention (inline script reads localStorage before paint)
- 4 custom fonts: Sora, Plus Jakarta Sans, JetBrains Mono, Cinzel Decorative
- Forest green + gold color palette

**Infrastructure**
- GitHub Actions CI/CD: lint → build → deploy to Cloudflare Pages
- Cloudflare Worker for contact form API with rate limiting

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro 5 |
| UI | React 19 |
| Styling | Tailwind CSS 4 (CSS-first config) |
| Language | TypeScript (strict) |
| 3D / WebGL | Three.js, @react-three/fiber, @react-three/drei |
| Animation | GSAP, Motion, react-bits |
| Testing | Vitest, React Testing Library |
| Hosting | Cloudflare Pages |
| API | Cloudflare Workers |
| CI/CD | GitHub Actions |

## Project Structure

```
src/
├── components/
│   ├── astro/           # Header, Footer, Section, SEO, SchemaMarkup
│   └── react/           # HeroSection, ProjectCard, ContactForm, etc.
├── content/
│   ├── projects/        # MDX project entries
│   └── blog/            # MDX blog posts
├── data/                # skills.ts, projects.ts, socials.ts
├── hooks/               # useReducedMotion
├── layouts/             # BaseLayout.astro
├── pages/               # Astro file-based routing
└── styles/              # global.css (@theme tokens)
worker/                  # Cloudflare Worker (contact form API)
.github/workflows/       # CI/CD pipeline
```

## Getting Started

**Prerequisites**: Node.js 20+, [pnpm](https://pnpm.io)

```sh
# Clone
git clone https://github.com/Heisenberga17/Portfolio.git
cd Portfolio

# Install dependencies
pnpm install

# Start dev server (localhost:4321)
pnpm dev

# Production build
pnpm build

# Preview production build locally
pnpm preview
```

## Featured Projects

**[Massport](https://massport507.com)** — Football tournament platform for Panama. Manages tournaments, teams, schedules, and live scores.

**[MicroClean](https://microcleanpa.com)** — Professional cleaning service with an instant online quotation system and WhatsApp booking integration.

**[Casa 24 Records](https://casa24records.info)** — Digital home for a Panama City hip-hop collective. ~12,000 lines of handwritten code featuring an analytics dashboard, drum machine, magazine viewer, and audio player.

## Animation Components

13 [react-bits](https://react-bits.dev) components installed via the shadcn CLI (source files copied into the project, not imported from npm):

| Component | Usage |
|-----------|-------|
| SplitText | Hero heading word-by-word reveal |
| BlurText | Subtitle fade-in with blur |
| GradientText | Accent gradient on key words |
| DecryptedText | Scramble-to-reveal effect |
| CountUp | Animated number counters |
| ScrollVelocity | Scroll-speed-driven text marquee |
| Squares | Animated grid background |
| AnimatedContent | Scroll-triggered entrance |
| ScrollReveal | Progressive section reveals |
| Magnet | Magnetic pull on hover |
| TargetCursor | Custom crosshair cursor |
| SpotlightCard | Mouse-following glow on cards |
| TiltedCard | 3D parallax tilt on hover |

Install a new component:
```sh
npx shadcn@latest add @react-bits/[Name]-TS-TW
```

## Color Palette

| Hex | Token | Usage |
|-----|-------|-------|
| `#2D5741` | `accent-primary` | Forest green — buttons, links, active states |
| `#D4A843` | `accent-secondary` | Gold/amber — highlights, badges |
| `#3A7055` | `accent-hover` | Hover states |
| `#0a0a0a` | `bg-dark` | Dark mode background |
| `#F5F0E8` | `bg-light` | Light mode background |

## Scripts

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Production build to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm test` | Run tests with Vitest |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage report |

## Deployment

Auto-deploys to **Cloudflare Pages** on every push to `main` via GitHub Actions. The pipeline runs lint, type-check, and build before deploying.

The contact form Worker is deployed separately from the `worker/` directory using [Wrangler](https://developers.cloudflare.com/workers/wrangler/):

```sh
cd worker && npx wrangler deploy
```

## Contact

- **WhatsApp**: [+507 6379-7497](https://wa.me/50763797497)
- **GitHub**: [Heisenberga17](https://github.com/Heisenberga17)
- **LinkedIn**: [Fernando Quijano](https://www.linkedin.com/in/fernando-quijano-0880911b1/)
- **Instagram**: [@heisen_ops](https://www.instagram.com/heisen_ops/)
- **Email**: [heisen.ops@gmail.com](mailto:heisen.ops@gmail.com)

## License

All rights reserved.

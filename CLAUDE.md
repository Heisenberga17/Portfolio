# CLAUDE.md - Heisen's Den Portfolio

## Tech Stack (DO NOT deviate)

- **Astro 5** with `@astrojs/react`, `@astrojs/mdx`, `@astrojs/sitemap`
- **React 19** for interactive islands only
- **Tailwind CSS 4** (CSS-first config, NO `tailwind.config.ts`)
- **TypeScript** in strict mode
- **pnpm** as package manager (never use npm or yarn)
- **Fonts**: Sora (headings), Plus Jakarta Sans (body), JetBrains Mono (code)

## Architecture Rules

### Astro Components
- Use `ClientRouter` from `astro:transitions` (NOT the old `ViewTransitions`)
- Content collections use `content.config.ts` at `src/` root with `glob()` loader
- The `astro:content` virtual module TS error is expected; it resolves at build time

### React Islands (hydration directives)
- `client:load` -- above-the-fold interactive components (hero, nav)
- `client:visible` -- below-fold components (project cards, skills)
- `client:idle` -- non-critical UI (theme toggle, analytics)
- Never hydrate a component that does not need interactivity

### react-bits Animations
- Install via: `npx shadcn@latest add @react-bits/[Name]-TS-TW`
- Do NOT install react-bits with npm/pnpm. The shadcn CLI copies source files.
- Requires `components.json` in project root (already present)
- Installed components (13): SplitText, BlurText, GradientText, CountUp,
  ScrollVelocity, DecryptedText, Squares, AnimatedContent, Magnet,
  TargetCursor, SpotlightCard, TiltedCard, ScrollReveal

## Style Rules

### Tailwind CSS 4
- All theme tokens live in `@theme` blocks inside `src/styles/global.css`
- Use `@tailwindcss/vite` plugin in `astro.config.mjs`. No separate config file.
- Utility classes only. Avoid `@apply` unless abstracting a repeated pattern.

### Color Palette
| Token             | Value     | Usage            |
|-------------------|-----------|------------------|
| accent-primary    | `#2D5741` | Forest green     |
| accent-secondary  | `#D4A843` | Gold/amber       |
| accent-hover      | `#3A7055` | Hover states     |
| bg-dark           | `#0a0a0a` | Dark mode bg     |
| bg-light          | `#F5F0E8` | Light mode bg    |

### Theme Toggle
- Dark mode: CSS vars on `:root`
- Light mode: CSS vars on `:root.light`
- An inline `<script>` in the head prevents FOUC by reading localStorage before paint

## File Structure

```
src/
  components/
    *.tsx              -- react-bits source files (copied by shadcn)
    react/             -- project React components (HeroSection, ProjectCard, etc.)
    astro/             -- Astro components (Header, Footer, Section, SEO)
  content/
    projects/          -- MDX project files
  data/
    skills.ts, projects.ts, socials.ts
  styles/
    global.css         -- @theme tokens, base styles
worker/
  contact-worker.ts    -- Cloudflare Worker for contact form
  wrangler.toml
```

## Development Workflow

```sh
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm preview          # Preview production build locally
```

- Add packages: `pnpm add <pkg>` / `pnpm add -D <pkg>`
- Add react-bits component: `npx shadcn@latest add @react-bits/[Name]-TS-TW`
- New project entry: create MDX file in `src/content/projects/`
- New React component: add to `src/components/react/`, use appropriate `client:*` directive

## Deployment

- **Platform**: Cloudflare Pages (adapter: `@astrojs/cloudflare`)
- **Live URL**: https://portfolio-4u5.pages.dev/
- **Repo**: github.com/Heisenberga17/Portfolio
- **Contact form**: Cloudflare Worker deployed separately via `wrangler` from `worker/`

## Known Gotchas

- Bash subagents in Claude Code CANNOT write files (sandbox blocks it). Always use Write/Edit tools.
- `astro:content` shows TS errors in the editor. This is normal; the module is virtual and only exists during build.
- `components.json` must stay in the project root for the shadcn CLI to work.

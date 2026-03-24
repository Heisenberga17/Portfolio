# Design Tokens Reference

All tokens are defined in `global.css` inside the `@theme` block (Tailwind 4 CSS-first config).

## Color Tokens

### Accent & Semantic

| Token                  | Value     | Usage                        |
|------------------------|-----------|------------------------------|
| `accent-primary`       | `#2D5741` | Forest green -- buttons, links, focus rings |
| `accent-secondary`     | `#D4A843` | Gold/amber -- highlights, badges            |
| `accent-hover`         | `#3A7055` | Lighter green -- hover states               |
| `success`              | `#22c55e` | Success feedback                             |
| `error`                | `#ef4444` | Error feedback                               |

### Theme-Aware (Dark / Light)

| Token            | Dark (`:root`)  | Light (`:root.light`) |
|------------------|-----------------|-----------------------|
| `bg-primary`     | `#0a0a0a`       | `#F5F0E8`             |
| `bg-secondary`   | `#111111`       | `#EDE0CE`             |
| `bg-card`        | `#1a1a1a`       | `#FFFFFF`             |
| `text-primary`   | `#F0E6D3`       | `#1a1a1a`             |
| `text-secondary` | `#a3a3a3`       | `#6b7280`             |
| `border`         | `#262626`       | `#d4d4d4`             |

## Typography Tokens

| Token      | Font Stack                                         | Applied To          |
|------------|-----------------------------------------------------|---------------------|
| `sans`     | Plus Jakarta Sans Variable, system-ui, sans-serif   | `body` (default)    |
| `heading`  | Sora, system-ui, sans-serif                         | `h2`--`h6`          |
| `display`  | Cinzel Decorative, Sora, serif                      | `h1`                |
| `mono`     | JetBrains Mono Variable, ui-monospace, monospace    | `code`, `pre`       |

## Theme System

Dark mode is the default (`:root`). Light mode activates via the `light` class on `<html>`.

Theme-aware colors use a two-layer indirection:

1. `:root` / `:root.light` set `--tw-*` intermediary vars (e.g. `--tw-bg-primary`).
2. The `@theme` block maps them into Tailwind: `--color-bg-primary: var(--tw-bg-primary)`.
3. Toggling the `light` class swaps all `--tw-*` values; Tailwind utilities update automatically.

**FOUC prevention**: an inline `<script>` in the `<head>` reads `localStorage` and applies the
`light` class before first paint. This runs synchronously, before any stylesheet or component.

## Usage Guide

**In Tailwind classes (preferred):**
```html
<div class="bg-bg-primary text-accent-primary font-heading border-border">
```

**In raw CSS:**
```css
.custom {
  background: var(--color-bg-card);
  color: var(--color-accent-secondary);
  font-family: var(--font-mono);
}
```

**Adding new tokens:** always add to the `@theme` block in `global.css`. For theme-aware
colors, add a `--tw-*` var in both `:root` and `:root.light`, then reference it in `@theme`.
Never use raw hex values inline -- create a token instead.

# AGENTS.md — eurinhash

Personal portfolio of Eurin Hash: Next.js 16 App Router, React 19, Tailwind v4, strict TS. No backend, no data layer. Page copy is hardcoded in TSX, project data lives in `src/content/projects.ts`, articles are Markdown in `src/content/notes/`. All copy is French.

## Commands (run at repo root, npm)

- `npm run dev` — port 3000. A dev server may already be running and owns the port; check `http://localhost:3000` before starting another (`next dev` refuses and prints the existing PID).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run lint` — ESLint 9 flat config via `eslint-config-next`.
- `npm test` — `node --test src/lib/*.test.ts` (notes content pipeline only).
- `npm run build` — real gate: prerenders all routes. Expect a Turbopack warning about `C:\Users\PC\package-lock.json` (parent-directory artifact) and a rewrite of `tsconfig.json` (see Traps).
- CI (`.github/workflows/ci.yml`, workflow « Qualité ») runs `npm ci`, typecheck, lint and tests on push to `main` and on pull requests. Locally: typecheck + lint + test + build, then check the page in the running dev server.
- After pulling dependency changes run `npm install`; a stale `node_modules` breaks lint (see Traps).

## Toolchain

- npm only. `package-lock.json` is the committed lockfile (CI uses `npm ci`). `package.json` has no `packageManager`; do not reintroduce pnpm or a workspace file.
- Tailwind v4 via `@tailwindcss/postcss`, **no** `tailwind.config`: colors/fonts are CSS vars (`--bg`, `--fg`, `--accent`, `--line`…) plus the `@theme inline` block in `src/app/globals.css`.
- shadcn/ui is configured (`components.json`: new-york, aliases `@/components/ui`, `@/lib/utils`, `@/hooks`) but only `ui/button.tsx` exists. Generate new primitives with the shadcn CLI.
- Icons come from `lucide-react`, imported per page.
- Animation: GSAP (`ScrollTrigger`, `SplitText`) drives the hero and scroll reveals; `motion` is only used for button micro-interactions in `hero-content.tsx`. Every animation must be static under `prefers-reduced-motion`.

## Routing and layout

- One folder per route in `src/app/`: `page.tsx` (home), `projets`, `services`, `a-propos`, `notes`, `contact`.
- Nav labels differ from paths: `/services` is labelled "Compétences", `/a-propos` is "Mon parcours", `/projets` is "Mes projets". The link list is hardcoded twice — in `src/components/site-header.tsx` and `src/components/site-footer.tsx` — so a new route needs editing both.
- Notes: `/notes` (index) and `/notes/[slug]` (article, `generateStaticParams`), fed by `src/content/notes/index.ts` and `src/lib/notes.ts`; `/feed.xml`, `sitemap.ts` and `opengraph-image.tsx` files are generated. Authoring rules are in `docs/README.md`.
- `src/app/layout.tsx` only sets `<html lang="fr">`, metadata and viewport. Each page composes `<SiteHeader current="/route" />` + `<SiteFooter />` itself, and `current` drives `aria-current`. `not-found.tsx` does the same.
- The home page (`/`) is intentionally short: hero, stack marquee, 3 featured projects (`FEATURED_COUNT`), a condensed about block, the 2 latest notes (`NOTES_COUNT`), contact CTA. Detail belongs on `/projets`, `/services`, `/a-propos`; do not duplicate it on the home page.
- Projects live in one module, `src/content/projects.ts` (`projects`, `initiatives`, `stack`), rendered by `ProjectCard` on the home page and `/projets`. Inner pages use `PageHero` (`src/components/page-hero.tsx`) for their hero. Skills come from `src/components/competences-data.ts` (rendered by `/services`). Edit content there, not in the pages.

## Conventions

- Copy is first-person singular (`je`, `mes projets`, `tu peux me contacter`) — not corporate "nous". Keep it French with real accents and typographic apostrophes (`’`).
- Global metadata lives in `layout.tsx` (title template `%s — Eurin Hash`, metadataBase `https://eurinhash.com`, `fr_FR`). Inner pages export their own `metadata` (`title`, `description`, `alternates.canonical`); the home page inherits the layout defaults.
- The brand is an image now: `public/eurinhash-wordmark-trim.png` (480x51, transparent) rendered via `next/image` at `h-[22px]` in the header and `h-[20px]` in the footer, inside the `Link href="/"`. Don't reintroduce the old `EURINH<span>A</span>SH` text markup; the `.wordmark` class only lingers as layout styling.
- Colors: never write a literal hex/rgb in `globals.css` (only in token definitions in `:root`). Use `var(--token)`, and for transparency `color-mix(in srgb, var(--accent-bright) 45%, transparent)`. Semantic tokens: `--bg`, `--fg`, `--fg-muted`, `--fg-subtle` (these two are raised by an `@media (prefers-contrast: more)` block, so use them for readable text), `--surface`, `--surface-2`, `--surface-raised`, `--surface-sunken`, `--line`, `--accent*`, `--lime`, state colors. Derived tokens (`--white`, `--black`, `--ink`, `--card-top`, `--card-bottom`, `--accent-pale`…) hold exact values for gradients and shadows. Only local exceptions: `--hero-line` / `--hero-line-soft` on `.hero-bg`.
- Typography: 8 size tokens in `globals.css` (`--fs-micro` 12px, `--fs-small` 14px, `--fs-body` 16px, `--fs-lead`, `--fs-title-s`, `--fs-title-m`, `--fs-title-l`, `--fs-display`; also usable as Tailwind `text-micro`, `text-small`…). Never write a raw `font-size`; pick a token. `micro` is for labels, chips and tags only: any sentence or link a person reads stays at `small` or above. Only two documented exceptions: `.88em` (inline code) and `13px` (SVG diagram text, tied to the viewBox).
- Styling is mostly hand-written CSS in `globals.css` (`.container-shell`, `.hero`, `.button`, `.card`, `.section`, `.eyebrow`, `.kicker`, `.space-bg`, `.orbit`) combined with Tailwind utilities in the same `className`. Reuse those classes instead of inventing new patterns.
- 2-space indent, double quotes, conventional commits (`feat:`, `chore:`, `content:`). No Prettier; JSX is terse (a `<section>` and its `<div>` often share a line) — don't reformat whole files.

## États d’interface et erreurs

- Frontières App Router : `src/app/error.tsx` et `global-error.tsx` sont des Client Components ; ils reçoivent `{ error: unknown, reset, retry }` et « Réessayer » appelle `retry()` (en Next 16.4 `unstable_retry` n’existe plus, et `reset()` seul peut rejouer l’erreur en cache). `global-error.tsx` remplace le root layout : `<html>/<body>` et styles inline obligatoires, `globals.css` n’est pas appliqué. `loading.tsx` fournit le squelette racine, `not-found.tsx` rend un vrai 404 en production.
- Primitives à réutiliser : `src/components/ui/alert.tsx` (`default`/`warning`/`danger`/`success`), `skeleton.tsx`, `empty-state.tsx`. Ne pas recréer un système parallèle de boutons, d’alertes ou de skeletons.
- Tokens d’état dans `globals.css` : `--danger`, `--warning`, `--success`, `--muted`, `--surface` exposés via `@theme inline` (`text-danger`, `border-line`, `text-muted-foreground`, `bg-surface`). Rouge/ambre/vert uniquement pour l’état, toujours doublé d’une icône ou d’un libellé.
- Messages : dire ce qui s’est passé, la conséquence et l’action possible, en français et au tutoiement. Jamais de message d’exception, stack, chemin interne, secret ou donnée personnelle ; `error.digest` est la seule référence exposée. `reportError()` (`src/lib/report-error.ts`) est le point d’entrée unique de journalisation (console en dev uniquement, à brancher sur un service de suivi).
- Formulaire (aucun pour l’instant) : prévoir les états initial/en cours/succès/échec, `aria-invalid` + `aria-describedby` vers le message du champ, `role="alert"` pour l’échec de soumission, focus sur le premier champ invalide, action désactivée pendant l’envoi. Ne jamais simuler un succès.

## Traps

- `next build` rewrites `tsconfig.json` (`jsx: "react-jsx"`, adds `.next/dev/types`, reformats it). Revert that churn before committing.
- Static assets are only served from a root `public/` folder (`src/public/` is not served — verified 404). `public/` holds favicons (`icon-32.png`, `icon-192.png`, `apple-icon-180.png`, wired through `metadata.icons`), the brand wordmark, the hero globe and project covers (`.webp`) and the portrait (`eurinhash_portrait.webp`). Ship WebP for photos and covers; never commit multi-MB PNG sources.
- If `npm run lint` dies with `ERR_MODULE_NOT_FOUND ... eslint-config-next/core-web-vitals`, `node_modules` holds a pre-v16 `eslint-config-next`; run `npm install` instead of editing the imports in `eslint.config.mjs`.
- `globals.css` is hand-written, partly minified on very long lines, with many hard-coded colors and font sizes. Prefer the existing tokens; consolidation is tracked in the GitHub issues.
- `page-accueil.md` documents the home page; update it when the home page changes.

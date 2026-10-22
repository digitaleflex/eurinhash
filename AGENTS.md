# AGENTS.md — eurinhash

Personal portfolio of Eurin Hash: Next.js 16 App Router, React 19, Tailwind v4, strict TS. No backend, no data layer, no tests, no CI. All page content is hardcoded in TSX; all copy is French.

## Commands (run at repo root, npm)

- `npm run dev` — port 3000. A dev server may already be running and owns the port; check `http://localhost:3000` before starting another (`next dev` refuses and prints the existing PID).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run lint` — ESLint 9 flat config via `eslint-config-next`.
- `npm run build` — real gate: prerenders all routes. Expect a Turbopack warning about `C:\Users\PC\package-lock.json` (parent-directory artifact) and a rewrite of `tsconfig.json` (see Traps).
- No test runner, fixtures, or CI. Verify with typecheck + build, then check the page in the running dev server.
- After pulling dependency changes run `npm install`; a stale `node_modules` breaks lint (see Traps).

## Toolchain

- npm only. `package-lock.json` is the lockfile (not yet committed). `package.json` has no `packageManager`; do not reintroduce pnpm or a workspace file.
- Tailwind v4 via `@tailwindcss/postcss`, **no** `tailwind.config`: colors/fonts are CSS vars (`--bg`, `--fg`, `--blue`, `--line`) plus the `@theme inline` block in `src/app/globals.css`.
- shadcn/ui is configured (`components.json`: new-york, aliases `@/components/ui`, `@/lib/utils`, `@/hooks`) but only `ui/button.tsx` exists. Generate new primitives with the shadcn CLI.
- Icons come from `lucide-react`, imported per page.

## Routing and layout

- One folder per route in `src/app/`: `page.tsx` (home), `projets`, `services`, `a-propos`, `notes`, `contact`.
- Nav labels differ from paths: `/services` is labelled "Compétences", `/a-propos` is "Mon parcours", `/projets` is "Mes projets". The link list is hardcoded twice — in `src/components/site-header.tsx` and `src/components/site-footer.tsx` (the footer omits Notes) — so a new route needs editing both.
- `src/app/[slug]/page.tsx` is a legacy duplicate: it holds its own `pages` map for the same five routes. The static folders win at request time, yet the dynamic route still builds duplicate paths. Do not add content there; delete it when touching routing, and never create both a folder and a map key for one route.
- `src/app/layout.tsx` only sets `<html lang="fr">`, metadata and viewport. Each page composes `<SiteHeader current="/route" />` + `<SiteFooter />` itself, and `current` drives `aria-current`. `not-found.tsx` does the same.
- Content is duplicated between pages (home project cards vs `projets/page.tsx`); there is no shared content module, so edits must be mirrored by hand.

## Conventions

- Copy is first-person singular (`je`, `mes projets`, `tu peux me contacter`) — not corporate "nous". Keep it French with real accents and typographic apostrophes (`’`).
- Global metadata lives in `layout.tsx` (title template `%s — Eurin Hash`, metadataBase `https://eurinhash.com`, `fr_FR`). Pages don't export their own metadata.
- The brand is an image now: `public/eurinhash-wordmark-trim.png` (480x51, transparent) rendered via `next/image` at `h-[22px]` in the header and `h-[20px]` in the footer, inside the `Link href="/"`. Don't reintroduce the old `EURINH<span>A</span>SH` text markup; the `.wordmark` class only lingers as layout styling.
- Styling is mostly hand-written CSS in `globals.css` (`.container-shell`, `.hero`, `.button`, `.card`, `.section`, `.eyebrow`, `.kicker`, `.space-bg`, `.orbit`) combined with Tailwind utilities in the same `className`. Reuse those classes instead of inventing new patterns.
- 2-space indent, double quotes, conventional commits (`feat:`, `chore:`, `content:`). No Prettier; JSX is terse (a `<section>` and its `<div>` often share a line) — don't reformat whole files.

## Traps

- `next build` rewrites `tsconfig.json` (`jsx: "react-jsx"`, adds `.next/dev/types`, reformats it). Revert that churn before committing.
- Static assets are only served from a root `public/` folder (`src/public/` is not served — verified 404). `public/` holds the favicons (`icon-32.png`, `icon-192.png`, `apple-icon-180.png`, wired through `metadata.icons` in `layout.tsx`) and the two original brand PNGs (`eurinhash-logo-mark.png`, `eurinhash-logo-wordmark.png`, ~1.5 MB combined, referenced by nothing). Pages load only the derived `eurinhash-wordmark-trim.png`; if the brand changes, re-derive it (black background keyed out to transparency) rather than shipping the originals.
- Active nav styling is dead: `SiteHeader` emits `nav-link-active` while `globals.css` defines `.nav-link.active`. Align one with the other before debugging the highlight.
- If `npm run lint` dies with `ERR_MODULE_NOT_FOUND ... eslint-config-next/core-web-vitals`, `node_modules` holds a pre-v16 `eslint-config-next`; run `npm install` instead of editing the imports in `eslint.config.mjs`.
- `README.md` is a UTF-16 one-liner (`# eurinhash`); this file is the real documentation.

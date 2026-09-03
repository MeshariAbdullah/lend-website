# Lend website

Public marketing website for **Lend** (lend.sa) — a Saudi rental platform that gives every rental a
clear offer, a documented contract, a recorded handover, an organized history, and a structured
dispute journey.

This repository is a standalone site. It has no connection to the Lend application code or backend.

## Stack

- Next.js (App Router) · TypeScript · Tailwind CSS v4 · ESLint
- Arabic-first: Arabic at `/`, English at `/en`, full RTL/LTR handling
- Fonts: Inter + IBM Plex Sans Arabic via `next/font/google`
- No analytics, auth, CRM, or backend integrations yet

## Scripts

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

## Structure

```
src/app/[locale]/        routes (ar | en) — layout, home, privacy, terms, not-found
src/app/sitemap.ts       sitemap with hreflang alternates
src/app/robots.ts        robots.txt
src/app/icon.svg         favicon (official mark)
src/content/             ar.ts / en.ts copy dictionaries (typed)
src/components/          UI primitives, header/footer, sections, product mockups
src/lib/i18n.ts          locale helpers and site URL
public/brand/            official logo, palette, guidelines (see public/brand/README.md)
public/og/               static Open Graph images
docs/design-audit.md     audit of the Claude Design archive the site is built from
```

## Deployment

Vercel-ready. Set `NEXT_PUBLIC_SITE_URL=https://lend.sa` in the project environment so canonical
URLs, Open Graph URLs, and the sitemap point at the production domain.

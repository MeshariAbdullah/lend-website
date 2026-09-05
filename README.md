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

## Business-interest form

The "سجّل اهتمام منشأتك" CTA opens a real form that posts to `POST /api/leads`.
Submissions are validated and sanitized on the server and emailed through
[Resend](https://resend.com). Configure it with environment variables only
(see `.env.example`):

| Variable | Purpose |
|---|---|
| `LEADS_TO_EMAIL` | Inbox that receives submissions (defaults to `partner@lend.sa`). |
| `LEADS_FROM_EMAIL` | Verified sender on your Resend domain, e.g. `Lend <no-reply@lend.sa>`. |
| `RESEND_API_KEY` | Resend API key. Server-only, never shipped to the browser. |

When `RESEND_API_KEY` or `LEADS_FROM_EMAIL` is missing the API answers
`503 { ok: false, error: "not_configured" }` and the form shows a
"temporarily unavailable" message. No success is ever faked.

## Scripts

```
npm run dev        # local development
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run test:e2e   # Playwright smoke tests (builds and starts the site on :3100)
```

# Lend brand assets

Official Lend identity files, kept exactly as provided or extracted 1:1 from the
official guidelines. See `docs/design-audit.md` for the full audit.

| Path | Contents |
|---|---|
| `logo/lend-mark.svg` | Primary mark (navy + green). Geometry extracted from the brand guidelines PDF, page 4 |
| `logo/lend-mark-on-dark.svg` | On-dark variant (white + green) |
| `logo/lend-mark-mono.svg`, `logo/lend-mark-mono-white.svg` | Monochrome variants |
| `logo/lend-logo-horizontal*.svg` | Mark + wordmark lockup. The wordmark is live text (Inter Bold, wide tracking) as specified by the guidelines |
| `logo/reference/` | 300 dpi renders of the logo page from the official PDF, for visual comparison |
| `colors/lend-palette.json` | Official palette (PDF p.6) plus the neutrals used by the design system |
| `colors/lend-palette-guidelines-p6.png` | Render of the palette page from the official PDF |
| `guidelines/lend-brand-guidelines.pdf` | Lend Brand Guidelines V1.0 (2026). Reference only, not linked from the site |
| `icons/`, `images/` | Empty — the archive ships no icon set or imagery |

Rules

- Never alter the mark's proportions or colours. Clear space = ½ the centre dot's diameter. Minimum 24 px digital.
- Fonts (Inter, IBM Plex Sans Arabic) are loaded from Google Fonts via `next/font`; no font files are committed.
- Design tokens derived from these files live in `src/app/globals.css`.

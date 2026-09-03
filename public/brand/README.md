# Lend Brand Identity Assets

This folder holds the **official Lend brand identity files**. These assets are the
visual source of truth for the website — logo, colors, typography, iconography,
graphic language, and usage rules.

## Folder structure

| Folder | What goes here |
|---|---|
| `logo/` | Official logo files. SVG originals preferred; PNG/JPG variants preserved as provided. |
| `colors/` | Color palette references (swatch files, palette exports, color spec documents). |
| `icons/` | Official brand iconography (SVG preferred). |
| `images/` | Brand imagery, photography, patterns, and other graphic assets. |
| `guidelines/` | Brand guideline documents (e.g. PDFs). Reference only — not embedded in the site. |

## Rules

- **Do not modify originals.** Files here are kept exactly as provided.
- **Logo:** never recreated or reinterpreted — only the official asset is used.
- **Fonts:** font files are **not** committed here unless licensing clearly allows
  redistribution. Font names are identified from the guidelines and loaded via a
  properly licensed source (e.g. Google Fonts, Adobe Fonts, or self-hosting with a
  valid web license).
- **Colors:** official color references are converted into reusable Tailwind/CSS
  design tokens for the site — the source references stay in `colors/`.
- **Guidelines PDFs** stay in `guidelines/` as reference material only.

## Workflow

1. Place the official brand identity files in the folders above.
2. Each asset is then audited and catalogued (what it is, which is the primary
   logo, which are variants).
3. The official palette and typography are extracted from the assets/guidelines.
4. Reusable design tokens are built from the identity — nothing is invented
   beyond what the official assets define; anything unclear is reported, not
   guessed.

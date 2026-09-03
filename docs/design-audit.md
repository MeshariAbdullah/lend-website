# Lend website — design archive audit

Source: `Lend_Product_UI_System.zip` (Claude Design "Project archive" export), audited on 2026-09-03.
This document records what the archive contains and which parts of it the public website is built from.

## 1. Files extracted

| File | Size | Role |
|---|---|---|
| `Lend Design System.dc.html` | 58 KB | **Primary visual source of truth** — colors, type, spacing, radius, elevation, buttons, fields, chips, timeline, cards, navigation, tables, system states |
| `Lend Customer Screens.dc.html` | 69 KB | 13 customer app screens (welcome → profile) |
| `Lend Merchant Screens.dc.html` | 82 KB | 16 merchant app screens (welcome → profile) |
| `uploads/lend-brand-guidelines.pdf` | 53 KB, 13 pages | **Official brand guidelines V1.0 (2026)** |
| `uploads/Lend_Brand_Guidelines_EN (1).pdf` | 53 KB | Byte-identical duplicate of the file above |
| `support.js` | 64 KB | Claude Design canvas runtime (generated). Not design content |
| `.thumbnail` | 13 KB | Canvas thumbnail JPEG. Not design content |

All three `.dc.html` files were rendered headlessly and reviewed screen by screen; the PDF was read page by page and its vector drawings were inspected directly.

## 2. Logo

* The PDF contains **no raster logo**. The mark is drawn as vector paths (page 4): a 70 × 70 pt rounded-square ring with an 8.75 pt round-capped stroke, the top half in Deep Navy and the bottom half in Vibrant Green, and a 14 pt navy dot in the centre. Meaning per the guidelines: top arc = pickup, bottom arc = documented return, dot = the platform that certifies every step.
* Those exact path coordinates were normalised and saved as `public/brand/logo/lend-mark*.svg` (primary, on-dark, monochrome, monochrome-white). The geometry is a 1:1 extraction, not a redraw. High-resolution renders of the PDF logo page are kept in `public/brand/logo/reference/`.
* The **wordmark** "LEND" is typeset text in the PDF (rendered there in a fallback font because the PDF generator lacked Inter). The guidelines specify Inter, and the design system sets it as Inter Bold, ~0.35 em tracking. The website's `Logo` component sets it the same way.
* Discrepancy: the design system file draws the mark with plain circular arcs (`A16 16` in a 48 px box). The brand guidelines PDF is the higher-authority source, so the website uses the PDF geometry (rounded-square ring).
* Usage rules (PDF p.4 / DS): never alter proportions or colours; clear space = ½ the dot diameter; minimum 24 px digital.

## 3. Colour palette (official, PDF p.6 — matches the DS exactly)

| Token | Hex | Use |
|---|---|---|
| Deep Navy | `#1B2951` | Primary, buttons, key text |
| Vibrant Green | `#12A67E` | Secondary, emphasis, verified/progress |
| Warm Beige | `#F5F5F0` | Page background |
| Green Tint | `#E1F5EE` | "Verified" background |
| Navy Tint | `#EEF2F9` | Info background |
| Deep Green | `#0F6E56` | Done / verified |
| Amber | `#BA7517` | In progress / pending only |
| Alert Red | `#A32D2D` | Error / cancelled only |

Neutrals used by DS components (not in the PDF): body text `#3A4568`, muted `#5B6683`, faint `#9AA1B5`, on-navy muted `#B9C2D8`, card border `#E7E8E1`, soft divider `#EFEFE9`, control border `#D9DCE6`, focus ring `#BFE8DB`, amber tint `#F7EBD8`, red tint `#F5DEDE`, canvas `#ECECE5`, navy hover `#26365F`, navy pressed `#131F3D`.

All of the above are exposed as Tailwind/CSS tokens in `src/app/globals.css` and as a reference file in `public/brand/colors/lend-palette.json`.

## 4. Typography

* Latin: **Inter** (400–700). Arabic: **IBM Plex Sans Arabic** (400–700). Both are Google Fonts under the SIL Open Font License; they are loaded with `next/font/google` (self-hosted at build time). No font files are committed.
* App type scale (PDF p.7): hero 32/700, section 22/600, sub-heading 16/500, body 14/400, caption 12/400. The website scales the display sizes up for marketing use (hero 40–64 px, sections 28–40 px) but keeps the same weights and hierarchy.
* Arabic body line-height in the DS is 1.8; Latin 1.6.

## 5. Spacing, radius, elevation

* **Spacing:** 8 px system — 8 · 16 · 24 · 32 · 48; mobile page padding 16–20 px. DS canvas max-width 1240 px.
* **Radius:** controls 10 px · cards 14 px · chips pill · dark panels 20 px · phone screens 28 px (customer/merchant screens use 24–28 px sheets).
* **Shadows:** one soft level only, `0 2px 8px rgba(27,41,81,.10)`; screens `0 4px 24px rgba(27,41,81,.12)`; modals `0 12px 40px rgba(27,41,81,.25)`.

## 6. Components

* **Buttons:** primary navy (hover `#26365F`, pressed `#131F3D`, focus ring 3 px `#BFE8DB`), secondary white with 1.5 px navy border, tertiary deep-green text, destructive red. Padding 12 × 18, radius 10, weight 600, size 14. Merchant surfaces use a **green** primary for the main action (join / issue contract).
* **Cards:** white, 1 px `#E7E8E1` border, radius 14, padding 18–20. Inset detail blocks use beige `#F5F5F0` with radius 10.
* **Chips:** pill, 6 × 14 padding, 12.5 px 600. Green = active/done, amber = pending, red = overdue/damage, navy tint = neutral info.
* **Four-stage timeline:** exactly four stages, always — offer & contract issued → customer review → rental starts → return & close. Done = deep green + check, current = green ring, upcoming = grey; flows right → left in Arabic.
* **Fields:** 1.5 px `#D9DCE6` border, radius 10–12, focus green border + `#E1F5EE` ring.
* **Navigation:** mobile top app bar (36 px back tile, centred title) and 4-item bottom nav; desktop admin sidebar in navy with green-tinted active item. Public marketing site has none of these; it uses a conventional top navigation built from the same tokens.
* **Backgrounds:** warm beige page, white cards, navy panels for brand moments (welcome screen, DS cover). No gradients anywhere in the system; the only patterned surface is the hatched red evidence placeholder.
* **Icons:** 16–20 px line icons, 1.6–1.8 px stroke, round caps/joins, navy or muted grey. Category tiles use initial-letter circles.
* **Motifs:** the logo ring; the navy panel with a beige bottom sheet; the tagline with the second phrase in green ("ووثّق حقك." / "Document your right." — the guidelines ask for the keyword in green). Section labels in the DS use a small letter-spaced deep-green eyebrow ("01 — FOUNDATIONS").
* **RTL rules:** Arabic is default; directional icons mirror; numbers, IDs and phone digits stay Latin and LTR; timeline flows right → left.
* **Responsive:** the archive is a mobile product (390 px screens) plus a 1240 px desktop design-system canvas and a 230 px admin sidebar that collapses below 1024 px. There is no marketing-site layout in the archive; desktop compositions on the website are derived from the DS grid patterns (2–4 column card grids, 14 px gaps).

## 7. What the website adapts from the app UI

* Palette, fonts, radii, the single shadow level, chip and button styles, card style, eyebrow labels, the navy panel motif, and the four-stage timeline.
* Product compositions re-created from real screens: offer & contract (customer 08), review wizard (09), approval success (10), rental details (12), merchant dashboard (M09), close rental / receipt (M14), damage case (M15).

## 8. What is deliberately **not** copied literally

* App chrome: bottom tab bar, back-tile top bar, login/registration forms, OTP and email confirmation screens, profile lists, tables and pagination, diagnostics panel.
* Marketing claims that appear in the brand PDF but are outside the approved product model: "digital promissory note", "verified merchant", campaign slogans about renting vs. buying. The website uses the product-requirements wording (contractual record, account confirmation, documented handover, structured dispute journey).
* The "موثّق" (verified) chip on merchant and customer profiles is not used to imply identity verification; the site only describes account confirmation by mobile number.
* Sample data in the mockups (names, IDs, prices) is illustrative, matching the design files.

## 9. Open items / judgement calls

* The guidelines' Inter/Plex wordmark has no vector outline in the archive, so the wordmark is live text in the `Logo` component and in `lend-logo-horizontal*.svg`. If an outlined official wordmark exists, drop it into `public/brand/logo/` and swap the component.
* `public/brand/icons/` and `public/brand/images/` remain empty: the archive contains no icon set or imagery beyond inline line icons.

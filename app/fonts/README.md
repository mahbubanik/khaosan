# Brand fonts

Loaded via `next/font/local` in `app/layout.tsx` (self-hosted, no external
request, no layout shift). Components never name a font — they read the
semantic tokens `--font-display`, `--font-script`, `--font-sans`, which are
assembled in `globals.css`.

## ⚠️ Licence status — resolve before launch

The supplied files are **demo / personal-use builds, not commercial licences.**
Serving a font via `@font-face` publishes the file publicly, so this is a real
exposure on a paying client's site, not a technicality.

| File | Family / subfamily | Licence as embedded in the file | Status |
|---|---|---|---|
| `CameraObscuraDEMO.otf` | Camera Obscura — **DEMO** | © 2021 ikiiko | ⚠️ demo build |
| `BellavoirDelight_PERSONAL_USE_ONLY.otf` | Bellavoir Delight **PERSONAL USE** | "Please visit www.mansgreback.com to obtain a commercial license." | ❌ not usable |
| `Good Brush.otf` | GOOD BRUSH | © 2019 Good Java Studio — "This demo font is 100% FREE" | ⚠️ verify commercial terms |

### Both demo faces have sabotaged numerals

This was verified by rendering, not assumed:

- **Camera Obscura DEMO** — every digit `0`–`9` renders as a small block reading
  `ikiiko.com`. "Pad Thai 385 BDT" comes out as "Pad Thai ▮▮▮ BDT".
- **Bellavoir Delight** — every digit renders as a stamp reading
  `PERSONAL USE ONLY! … FOR THE FULL AND COMMERCIAL VERSION`.
- **Good Brush** — digits render correctly. This face is clean.

### How the code defends against it

`Camera Obscura` is registered with a `unicode-range` that **excludes
U+0030–U+0039**, so digits fall through to Playfair Display automatically.
A price can never render as a watermark, even if new menu items are added
later through the admin panel. Once a licensed full version is installed,
delete the `declarations` block in `app/layout.tsx`.

**Bellavoir Delight is deliberately not wired in.** It is personal-use
licensed and redundant with Good Brush, which already covers the script role.
The file is kept here for reference only.

## Current role assignment

| Token | Face | Used for |
|---|---|---|
| `--font-display` | Camera Obscura → Playfair Display (digits + fallback) | Headings, section titles, dish names |
| `--font-script` | Good Brush 9 | The "Thai Way" accent and section eyebrows — used sparingly, it is an all-caps brush face |
| `--font-sans` | Montserrat | Body, UI, prices, addresses, hours. Matches the printed menu's geometric sans — this is a real choice, not a placeholder |

Prices are deliberately set in the sans: it keeps numerals tabular and aligned,
and it sidesteps the demo-font numeral problem entirely.

## Swapping in licensed files

1. Convert to `.woff2` (roughly a third the size of `.otf`):
   ```
   pip install fonttools brotli
   python -c "from fontTools.ttLib import TTFont; f=TTFont('X.otf'); f.flavor='woff2'; f.save('X.woff2')"
   ```
2. Drop it in this folder using the existing filename.
3. Remove the `declarations` line for Camera Obscura in `app/layout.tsx`.

Multiple weights are added as separate `src` entries:

```ts
src: [
  { path: "./fonts/CameraObscura-Regular.woff2", weight: "400", style: "normal" },
  { path: "./fonts/CameraObscura-Bold.woff2",    weight: "700", style: "normal" },
]
```

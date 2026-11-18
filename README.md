# d3ucey — portfolio

Jesse's portfolio, built on the same design system as the original offhand site:
one grotesk (Archivo), paper and ink, one yellow accent, an eyebrow with a
yellow square, and GSAP scroll motion over Lenis smooth scrolling.

The content is the work: five apps with real screenshots, a shelf of ten more
tools that reveal their logo on hover, six honest questions, and an email.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Dev writes to `.next-dev` (see `distDir` in `next.config.ts`) so a running dev
server is not wiped by a production build. Keep `127.0.0.1` in
`allowedDevOrigins` or the HMR socket is blocked and the page never hydrates.

## What lives where

```
app/
  layout.tsx        metadata, theme colour, font and hero preloads
  page.tsx          renders <PortfolioSite />
  globals.css       tokens, base, grid, shell, sections, breakpoints
  icon.svg          black tile with the yellow square
components/
  PortfolioSite.tsx body shell + one-shot client motion boot
  site/             Header, Hero, About, Apps, Shelf, Faq, Cta, Footer, Panel
lib/
  site-data.ts      every app, shelf tool and FAQ answer, in one file
  motion/
    boot.js         boot order, GSAP plugin registration, teardown
    core/           dom, env, reveal, scroll (Lenis ↔ GSAP)
    modules/        header, panel, hero, parallax, archive, faq, cta, noise
public/assets/
  fonts/            self-hosted Archivo variable woff2 (OFL)
  media/            app screenshots, design plates, logos (webp)
```

## Editing it

- Copy, links, facts and FAQ answers: `lib/site-data.ts`. Nothing is hardcoded
  in the components.
- Email: `site.email` and `site.mailto` in the same file. The header pill, the
  contact button, the footer and the index panel all read from it.
- New app row: add an object to `products`. Add a 16:10 media plate to
  `public/assets/media` and point `shot` at it. Rows alternate sides by index.
- New shelf tool: add to `shelf` with a 192×192 logo tile. Hover reveals it.
- The shelf starts with four rows open; the rest animate open with the
  measured-height disclosure in `lib/motion/modules/archive.js`.

## Motion and behaviour

- GSAP `3.13.0`, ScrollTrigger, SplitText and Lenis `1.3.11`.
- Boot order: scroll → header → panel → hero → reveals → parallax → shelf →
  FAQ → CTA → refresh.
- Hero: three app windows fly in on separate transform layers, drift on their
  own sine loops, react to scroll velocity and scatter as the hero leaves.
- Index panel: `m` / `Esc` / button, focus trap, scroll lock, per-section header
  colour driven by the section under the header line.
- Reduced motion: native scrolling, no splits or scrubs, shelf logos shown
  statically, section content visible without JS.

## Media

Screenshots come from each project's own repository (or its live site) and are
cropped to 16:10. Avnac's are two screenshots of the app itself, cropped to the
file grid and to the canvas. Logos are normalised to 192×192 tiles on white so
they sit consistently on ink.

## Pixel accents

The accent mark in every section head is a 12×12 gem drawn in Aseprite through
SpriteWare, exported at 1× and scaled with `image-rendering: pixelated` so the
pixels stay square. The arrows (↗ on links, ↑ and ↓ in the footer and hero) are
drawn the same way, then exported as vector rects and rendered inline by
`components/site/Arrow.tsx` with `shape-rendering="crispEdges"`: they inherit
`currentColor`, stay sharp at any size, and turn accent on hover. Buttons are clipped to stepped corners
and carry an ink pixel tile instead of a rounded square. Because the clip also
swallows an outline, the button's focus state is an inset double ring (paper
outside, ink inside) that follows the same stepped silhouette. The two controls (FAQ rows, shelf "show more") use a
beveled 12×12 pixel square that swaps to the gem when open, which is the
original square-to-diamond state change without rotating a bitmap. The contact section scatters six more artifacts
(three gems, two sparkles), which drift against the scroll and fade in as the
section arrives; the sparkles run a two-frame twinkle from a 10×5 strip.

Source PNGs live in `public/assets/pixel/`. Redraw them in SpriteWare and drop
in a new export to change them; nothing else needs touching.

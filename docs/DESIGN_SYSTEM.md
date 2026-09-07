# Lake beauty Design System

## Direction
Modern Nature Calm: sage/olive greens on a soft off-white, one modern sans-serif throughout,
gentle rounded geometry instead of sharp editorial corners. Customer results still lead visual
hierarchy; the hero is a calm moss/ink gradient, not a decorative 3D scene (a real photo was the
first choice but the available facility photos aren't hero-safe — see `docs/DESIGN.md`
addendum). See `docs/DESIGN.md` for the full rationale behind each choice below.

## Tokens
- Canvas (page background): `#F5F3EC`
- Surface (cards/panels): `#FFFFFF`
- Ink (primary text / dark-band sections): `#23291F`
- Ink-deep (deepest dark, hero gradient corner): `#171C14`
- Moss (primary accent — links, icons, focus, eyebrows): `#5E7350`
- Moss-soft (light accent on dark backgrounds): `#A9BC97`
- Sand (secondary warm-neutral, used sparingly for quiet chips/dividers): `#D9D2C1`
- Line (border on light surfaces): `rgba(35, 41, 31, .14)`
- Line-light (border on dark surfaces): `rgba(255, 255, 255, .16)`
- Radius (shared corner radius for cards/images/panels): `14px` — buttons/badges keep the
  existing `999px` pill shape

Single sans-serif family for both display and body: **Be Vietnam Pro** (chosen for its genuine
Google Fonts `vietnamese` diacritic subset and humanist warmth; fallback to the existing
`Manrope` if the `next/font/google` `vietnamese`-subset check fails during implementation — see
`docs/DESIGN.md`). No serif face is used anywhere in this system; the previous `Bodoni Moda`
display serif is retired.

## Motion
Use 200–500ms fades, translations, or scale. Respect `prefers-reduced-motion`. No WebGL/Three.js
anywhere in this system — the hero is a static color gradient, no photo (see Image Rules).

## Image Rules
Use only verified, unfiltered business images. Every result must include paired original images.
Missing assets stay as explicit placeholders until provided. The hero uses a plain `--ink`/
`--ink-deep` gradient veil, no photo — the existing `public/images/facility/` files turned out to
be unredacted multi-person camera-grab montages, unsafe to promote to the hero (see
`docs/DESIGN.md` addendum); revisit once a single clean, consented photo is available. Never a
stock or fabricated image, and never an over-processed one.

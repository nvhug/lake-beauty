# DESIGN — Nature-Modern Visual Redesign

Companion to `specs/001-nature-modern-redesign/1-spec.md`. This is a visual-restyle-only
design pass: no new page, no new information architecture, no content changes. It fixes the
concrete design tokens the spec deferred, and sanity-checks the restyle against every section
that currently exists.

## Direction decided (confirmed with the business owner before this doc was written)

- Palette: sage/olive greens on a soft off-white — calm, plant-inspired, not sweet/warm-beige.
- Typography: one modern, minimal sans-serif for both headings and body — the serif display
  font (Bodoni Moda) is removed entirely.
- Hero: the Three.js 3D scene is removed. A real business photo was the first preference (see
  below) but was rejected after inspection for a privacy reason discovered during IMPLEMENT — the
  hero uses the soft moss/ink gradient veil fallback instead (no photo).

## Addendum (found during IMPLEMENT, 2026-09-07): facility photos are not hero-safe

The plan below to use a `public/images/facility/room-0X.webp` photo as the hero background was
**not carried out**. Inspecting all seven files showed they are camera-grab montages (multiple
timestamped shots grid-collaged into one file), not the single curated "real experience" photos
`docs/ASSET_MAP.md` describes — several show a customer's face clearly and unredacted while
reclining mid-treatment, and one shows a staff member's face, in a format never intended as a
standalone marketing image. Promoting one of these to the hero — the single most prominent image
on the page — would badly amplify an existing privacy issue rather than fix it (the same files
are already used, more mildly, in the Facility filmstrip via a plain `object-fit: cover` crop with
no attempt to isolate one clean cell — a pre-existing issue this redesign does not fix, but is
now flagged separately for the business owner).

**Decision**: use the CSS-gradient fallback documented under States below instead of a photo. If
Lake beauty later supplies a single clean, consented facility/portrait photo, swap it in then —
this is not a permanent decision, just what's safe with the assets available today.

## Why these specific tokens (not a generic "wellness sage" default)

The AI-generic "calming wellness site" look right now is: sage green + a geometric grotesk +
cream, applied identically regardless of subject. Two choices below deliberately avoid landing
there by accident:

1. **Typeface: Be Vietnam Pro**, not a trendier geometric grotesk (Space Grotesk / Outfit /
   Instrument Sans). All page content is Vietnamese with heavy diacritics (á, ệ, ữ, ẫ...), and
   the current font (`Manrope`) was deliberately loaded with `subsets: ["latin", "vietnamese"]`
   for that reason. Be Vietnam Pro is a Google Font (`next/font/google` export `Be_Vietnam_Pro`)
   designed for Vietnamese, ships a genuine `vietnamese` subset, has a humanist (not purely
   geometric) warmth that fits "gentle but modern," and its wide weight range (100–900) lets one
   family carry both display and body roles just by weight/size — satisfying FR-002 without a
   second family. **IMPLEMENT must verify** `Be_Vietnam_Pro` actually exports from
   `next/font/google` with the `vietnamese` subset before committing to it; if that check fails,
   fall back to keeping `Manrope` for both roles (already proven safe for this content) rather
   than picking an untested alternative.
2. **Hero signature: a moss/ink gradient veil, no photo** (revised — see Addendum above). The
   original intent was a real facility photo per the project constitution's "real business, not
   stock photos" preference, but the only candidate assets (`public/images/facility/room-01.webp`
   … `room-07.webp`) turned out to be unredacted multi-person camera-grab montages, unsafe to
   promote to the page's most prominent visual slot. The fallback keeps the same left-to-right +
   bottom-fade veil technique `.hero-veil` already uses today, just recolored to `--ink`/
   `--ink-deep` with no image behind it — strictly simpler than either a photo pipeline or an
   invented texture system, and avoids the generic "gradient blob" look precisely because it's
   presented as what it is (a calm color field), not a fake decorative stand-in for a photo.
3. **Softer corners as a structural cue, not decoration**: raise the shared radius from the
   current sharp "0–10px, square-to-soft" editorial system to a single `--radius: 14px` used on
   cards, images and panels (pill shapes stay pill for buttons/badges — unchanged). A slightly
   rounder geometry is itself the "nhẹ nhàng" (gentle) signal — no added ornament required.

## Design tokens (replaces `docs/DESIGN_SYSTEM.md` values — see that file for the full table)

| Token | Value | Role |
|---|---|---|
| `--canvas` | `#F5F3EC` | Page background (soft linen off-white) |
| `--surface` | `#FFFFFF` | Card/panel background |
| `--ink` | `#23291F` | Primary text; dark-band section background (proof, final CTA, footer-dark) |
| `--ink-deep` | `#171C14` | Deepest dark, hero gradient corner |
| `--moss` | `#5E7350` | Primary accent — eyebrows, links, icons, focus ring, hover states |
| `--moss-soft` | `#A9BC97` | Light accent for text-on-dark (proof numbers, hero trust list) |
| `--sand` | `#D9D2C1` | Secondary warm-neutral for quiet chips/dividers — used sparingly, never as a bright accent |
| `--line` | `rgba(35, 41, 31, 0.14)` | Borders on light surfaces |
| `--line-light` | `rgba(255, 255, 255, 0.16)` | Borders on dark surfaces |
| `--radius` | `14px` | Shared corner radius for cards/images/panels (buttons/badges keep `999px` pill) |
| `--sans` (single family) | `Be Vietnam Pro` (fallback: keep `Manrope` if the vietnamese-subset check in IMPLEMENT fails) | All headings and body text |

Removed entirely: `--accent` (`#d9694f`), `--accent-soft` (`#f0a894`), `--serif`
(`Bodoni_Moda`) and every component rule that referenced them (h1/h2/h3 `font-family: var(--serif)`,
`.button-coral`, `.eyebrow` accent color, testimonial quote-mark serif, etc.) — CORRECTNESS
should treat any surviving reference to these as a regression, not a stylistic leftover.

## Information hierarchy

Unchanged from the current shipped page — this restyle does not reorder anything:
Nav → Hero → Social Proof → Services → Before/After Results → Results Gallery → Treatment
Process → Facility (Real Experience) → Testimonials → About → FAQ → Final CTA → Footer.
Within the Hero specifically: eyebrow → headline → supporting text → primary/secondary CTA →
trust indicators, same order as today, just restyled.

## Layout

No new sections, no new components, no layout-grid changes (`.proof`, `.service-grid`,
`.results-layout`, `.process-grid`, `.about`, `.final-cta` all keep their existing grid
structure). The only structural change is inside `components/hero/Hero.tsx`: the
`<HeroStage>` Three.js canvas mount point is simply removed — `.hero-veil` becomes a solid
`--ink`/`--ink-deep` gradient with no image layer behind it, still positioned absolutely behind
`.hero-inner` exactly as today — same DOM slot, one less layer.

## States

- **Hero background**: a pure `--ink`/`--ink-deep` CSS gradient, no image, no loading state to
  manage — see Addendum above for why a photo isn't used here yet.
- **Long content**: no change from today — service/testimonial/FAQ text already handles
  varying lengths; the restyle doesn't change container widths or line-clamping behavior.
- **Reduced motion**: unaffected structurally (the existing `@media (prefers-reduced-motion:
  reduce)` block in `app/globals.css` already collapses all transitions/animations to
  near-zero); removing the Three.js scene actually simplifies this since there's no longer a
  WebGL-specific reduced-motion branch to maintain.

## Mobile / responsive behavior

No breakpoint changes. The hero's mobile treatment (`height: auto; min-height: 92svh` at
≤820px) stays as-is; the veil gradient direction at that breakpoint (top-to-bottom instead of
left-to-right) is recolored to the new `--ink`/`--ink-deep` values but keeps its existing
shape. All grid-to-single-column collapses already defined in the `@media (max-width: 1000px)`
and `@media (max-width: 820px)` blocks are untouched by this restyle.

## Accessibility

- **Contrast**: `--ink` (`#23291F`) on `--canvas` (`#F5F3EC`) and on `--surface` (`#FFFFFF`)
  must both be checked against WCAG AA (4.5:1 body text / 3:1 large text) before this ships —
  do the actual contrast-ratio check during IMPLEMENT, don't assume "looks fine." Likewise
  check `--moss` (`#5E7350`) as body-sized link/eyebrow text on `--canvas`; if it falls short,
  darken `--moss` for text usage while keeping the lighter value for large decorative accents
  only (record the adjusted hex here if that happens).
  `--moss-soft` (`#A9BC97`) on `--ink` (`#23291F`) (used for hero trust list / proof labels)
  needs the same check since it's a light-on-dark small-text pairing.
- **Focus states**: `:focus-visible` currently outlines in `var(--accent)`; move it to
  `var(--moss)` — still needs a visible-on-both-canvas-and-ink-background check since focus can
  land on both light and dark sections (nav links vs. footer links).
- **Keyboard/interaction behavior**: unchanged — before/after slider, mobile menu, FAQ
  accordion, nav scroll state all keep their existing keyboard handling; this doc only concerns
  their visual skin.

## Interaction range check

Not applicable in the traditional sense (no new input with a wide value range is introduced).
The one thing worth stating explicitly: the Before/After slider's divider and label chips
currently rely on `--surface`/`--ink` for contrast against arbitrary photo content behind them
— confirm after retokenizing that the divider handle and the BEFORE/AFTER pill labels still
read clearly against both light-and dark-toned result photos, not just re-use the new tokens
blindly.

## Explicitly out of scope for this pass

- Sourcing new photography (a clean hero portrait remains a future asset gap, not something
  this redesign solves).
- Any change to section content, order, copy, or business facts (see spec FR-004/FR-007).
- Any change to the Before/After slider's interaction model, only its color/type presentation.

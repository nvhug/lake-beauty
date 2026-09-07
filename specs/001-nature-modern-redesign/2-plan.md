# Implementation Plan: Nature-Modern Visual Redesign

**Branch**: `001-nature-modern-redesign` | **Date**: 2026-09-07 | **Spec**: [1-spec.md](./1-spec.md)

**Input**: Feature specification from `specs/001-nature-modern-redesign/1-spec.md`

## Summary

Restyle the existing Lake beauty landing page from "Premium Clinical Beauty" (ivory/beige,
red-orange accent, Bodoni Moda serif, Three.js 3D hero) to "Modern Nature Calm" (sage/olive on
off-white, single sans-serif, static real-photo hero) per `docs/DESIGN.md`. This is a
presentation-only change: no new routes, no new data, no change to section order or business
content — it replaces CSS custom properties, font loading, and the hero's visual implementation.

## Technical Context

**Language/Version**: TypeScript 5 (strict), Next.js 16 (App Router), React 19 — unchanged.

**Primary Dependencies**: `next/font/google` (swap `Bodoni_Moda` + `Manrope` for a single
`Be_Vietnam_Pro` load, with `Manrope` kept as the documented fallback if the `vietnamese` subset
check fails — see Research below). Framer Motion and Lenis are unaffected. `three`,
`@react-three/fiber`, `@react-three/drei` are removed once confirmed unused anywhere else in the
codebase (see Research).

**Storage**: N/A — no data model change; `data/brand.ts` and `data/content.ts` are read, not
written to, by this feature.

**Testing**: No test runner currently exists in this repo (`package.json` has no `test` script
despite `stack.yml`'s auto-detected `npm run test` default). Rather than pull in a full test
framework for a presentation-only change, add a `test` script backed by Node's built-in test
runner (`node --test`, available on Node 22 with no new dependency) and one real regression test
— see Research and Data Model below. This satisfies the IMPLEMENT gate's requirement for at
least one real test artifact without over-scoping a CSS/JSX restyle into needing a full test
suite.

**Target Platform**: Static export (`next build` → `out/`) served via Cloudflare Pages /
`serve` — unchanged.

**Project Type**: Web app, single Next.js project — unchanged.

**Performance Goals**: Lighthouse Performance/Accessibility/Best Practices/SEO ≥ 90 (existing
bar, per spec SC-005). Removing the Three.js scene should only help this, not regress it.

**Constraints**: WCAG AA contrast for all new color pairings (spec FR-008); `prefers-reduced-
motion` still respected; no business fact may change (spec FR-007).

**Scale/Scope**: Single page (`app/page.tsx`), ~11 section components, one global stylesheet
(`app/globals.css`), one layout font loader (`app/layout.tsx`). No new pages or routes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Checked against `.specify/memory/constitution.md`:

- **Tech stack**: plan keeps Next.js/React/TypeScript/Framer Motion/Lenis as-is; only removes
  Three.js usage, which the constitution already scopes as optional ("A beautiful website
  without Three.js is better than a slow website with Three.js"). ✅ No violation.
- **UI conventions**: plan updates the centralized design tokens rather than hard-coding colors
  in components, matching "never hard-code colors ... use the centralized tokens." ✅
- **Code conventions**: Server Components stay default; `"use client"` usage is not expanded by
  this change (removing a client-only Three.js scene, not adding one). ✅
- **What we never do**: no business fact changes, no testimonial/photo changes beyond re-cropping
  for the new hero treatment (spec FR-007, edge cases). ✅
- **Environment**: no new env vars introduced. ✅

No constitution violations. Nothing to record in Complexity Tracking.

## Research *(Phase 0)*

- **Decision**: Use `Be_Vietnam_Pro` from `next/font/google` as the single sans-serif family for
  both headings and body, replacing `Bodoni_Moda` (serif, removed) and `Manrope` (body).
  **Rationale**: all page content is Vietnamese with heavy diacritics; `Be Vietnam Pro` is a
  Google Font with a genuine `vietnamese` subset (it was designed for this use case) and a wide
  weight range (100–900) that lets one family carry both display and body roles via weight/size
  alone, satisfying spec FR-002's "single family" requirement without a second face.
  **Alternatives considered**: Space Grotesk / Outfit / Instrument Sans — all more geometrically
  "trendy modern-minimal" candidates, but none reliably ship a Google Fonts `vietnamese` subset,
  risking mid-word fallback-font glitches on diacritics (á, ệ, ữ, ẫ...). Keeping `Manrope` for
  both roles was also considered as the safe no-risk option and is documented as the fallback if
  `Be_Vietnam_Pro`'s `vietnamese` subset does not resolve correctly at implementation time
  (verify by rendering Vietnamese sample text and checking computed font-family in devtools, or
  by confirming the subset in `next/font/google`'s generated font file metadata).

- **Decision**: Replace the Three.js hero scene with a plain recolored CSS gradient veil
  (`--ink`/`--ink-deep`), no photo. **Revised during IMPLEMENT** (2026-09-07): the original plan
  was a real facility photo (`public/images/facility/room-0X.webp`), but inspecting all seven
  files found them to be unredacted, multi-person camera-grab montages (customer faces visible
  mid-treatment, staff faces visible, burned-in timestamps) — not the single curated photo
  `docs/ASSET_MAP.md` implied. Promoting one to the hero, the page's most prominent image, would
  be a real privacy exposure, so the gradient-only fallback already documented in `docs/DESIGN.md`
  is used instead. **Alternatives considered**: a pure CSS gradient/noise texture invented from
  scratch (this is effectively what was chosen, just without extra invented texture — kept
  simple); commissioning new hero photography (out of scope — spec Assumptions explicitly defers
  new asset sourcing); cropping a facility photo tightly enough to avoid faces (rejected — the
  images are grid montages of six separate shots each, not one continuous scene, so no crop
  region reliably avoids showing an identifiable person across all seven files).

- **Decision**: Confirm `three`, `@react-three/fiber`, `@react-three/drei` are unused elsewhere
  before removing them from `package.json`. **Rationale**: `components/hero/HeroScene.tsx` is
  the only expected consumer based on the current component tree
  (`components/{navigation,hero,faq,results,testimonials,experience,ui}`); grep the codebase for
  `three`/`@react-three` imports during IMPLEMENT before deleting the dependencies, don't assume.
  **Alternatives considered**: leaving the dependencies installed but unused — rejected, dead
  dependencies contradict "no unnecessary dependencies" (`LANDING_PAGE_SPEC.md` §33 performance
  rules) and inflate `node_modules`/install time for no benefit.

- **Decision**: Testing approach is one Node built-in test (`node --test`) asserting the old
  palette/serif/Three.js references are fully gone, not a new test framework.
  **Rationale**: proportionate to a CSS/JSX-only restyle; avoids pulling in Jest/Vitest + RTL for
  a feature with no new business logic to unit-test, while still giving the IMPLEMENT gate one
  real, meaningful automated check (not a token/placeholder test written just to satisfy the
  gate). **Alternatives considered**: Vitest + React Testing Library for component-level
  rendering assertions — more thorough but disproportionate setup cost for a visual-only change;
  can be revisited if a future feature needs real component testing.

## Data Model *(Phase 1 — include if the feature involves data)*

No data entities are introduced or modified. This feature only changes:
- **Design tokens** (`docs/DESIGN_SYSTEM.md` values, implemented as CSS custom properties in
  `app/globals.css`'s `:root` block): palette, font-family, and radius values — not their
  existence as a system.
- **Hero visual asset reference**: a static image path (and alt text) replacing the removed
  `HeroScene` component's props — not a persisted or typed entity, just a component prop change
  in `components/hero/Hero.tsx`.

`data/brand.ts` and `data/content.ts` (the actual business-fact entities: `Result`,
`Testimonial`, services, etc., per `docs/CONTENT_SCHEMA.md`) are unaffected — this plan does not
touch them.

## Project Structure

### Documentation (this feature)

```text
specs/001-nature-modern-redesign/
├── 1-spec.md            # /speckit-specify command output
├── 2-plan.md            # This file — Research, Data Model, Quickstart/Validation below
└── 3-tasks.md           # Phase 2 output (/speckit-tasks — not created by this command)
```

No `contracts/` directory — this feature has no external interface (no API, no CLI, no new
component prop contract exposed outside this codebase).

### Source Code (repository root)

Existing single Next.js project structure — no new top-level directories:

```text
app/
├── layout.tsx        # font loading — swap Bodoni_Moda+Manrope for Be_Vietnam_Pro
├── globals.css        # design tokens (:root), removes --accent/--accent-soft/--serif refs
└── page.tsx            # unchanged — section order/composition untouched

components/
├── hero/
│   ├── Hero.tsx        # remove <HeroStage> Three.js mount; .hero-veil becomes a solid
│   │                    # gradient (no photo — see 2-plan.md Research / docs/DESIGN.md addendum)
│   └── HeroScene.tsx   # deleted
├── navigation/ faq/ results/ testimonials/ experience/ ui/
│                       # unchanged structurally — only consume updated CSS tokens/classes

scripts/
└── redesign.test.mjs   # new — node:test regression check (old tokens/serif/three.js gone)

package.json            # add "test": "node --test scripts/**/*.test.mjs"; remove
                         # three/@react-three/fiber/@react-three/drei if confirmed unused
```

**Structure Decision**: Reuse the existing single-project Next.js layout exactly as-is. The only
structural deltas are deleting `components/hero/HeroScene.tsx`, adding one test script under a
new (currently nonexistent) `scripts/` directory, and editing `app/layout.tsx` /
`app/globals.css` / `components/hero/Hero.tsx` in place. No component is relocated or renamed.

## Quickstart / Validation *(Phase 1)*

Prerequisites: `npm install` (after dependency changes), no environment variables needed.

1. `npm run dev` — load `http://localhost:3000` and visually confirm: sage/olive palette
   throughout, no serif text anywhere, hero shows a static gradient (no photo, no WebGL canvas
   in devtools' Rendering panel), all sections in their original order with unchanged copy.
2. `npm test` (new script) — confirms no leftover `#d9694f`/`#f0a894` hex values or
   `Bodoni_Moda`/`font-serif` references remain in `app/globals.css`/`app/layout.tsx`, and that
   `components/hero/Hero.tsx` no longer imports `HeroScene` or any `three`/`@react-three/*`
   module.
3. `npm run build` — static export must succeed with no TypeScript or lint errors (constitution
   quality bar).
4. Manual accessibility spot-check: verify `--ink`-on-`--canvas`, `--moss`-as-link-text-on-
   `--canvas`, and `--moss-soft`-on-`--ink` contrast ratios meet WCAG AA using devtools' contrast
   checker (spec FR-008 / DESIGN.md Accessibility section) — adjust the token value and update
   `docs/DESIGN_SYSTEM.md` if any pairing fails, rather than shipping a failing ratio.
5. Manual QA walkthrough of interactive elements (before/after slider, mobile menu, FAQ
   accordion, nav scroll state) confirming no behavioral regression — this is the native QA
   gate's job (`specs/001-nature-modern-redesign/5-qa-report.md`), referenced here rather than
   duplicated.

## Complexity Tracking

*(No constitution violations — this section intentionally left without entries.)*

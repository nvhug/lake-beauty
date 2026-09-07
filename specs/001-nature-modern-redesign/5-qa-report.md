# QA Report — Nature-Modern Visual Redesign

**Date**: 2026-09-07
**Method**: Native QA (manual walkthrough against `1-spec.md` acceptance scenarios) — gstack's
`qa` skill requires a clean working tree to begin (it commits each fix atomically), which
doesn't fit mid-pipeline with IMPLEMENT's changes still pending RELEASE; native QA was used
instead per `native-gates.md`'s documented fallback. Verified via `npm run dev` + a headless
Chromium driver (Playwright, installed with `--no-save` for this session only, removed after).

## User Story 1 — First-time visitor forms a calm, trustworthy first impression (P1)

| Acceptance scenario | Result |
|---|---|
| All sections use the new sage/olive + off-white palette — no ivory/beige or `#DB735F` remain | **Pass** — visually confirmed across Hero, Proof, Services, Results, Process, Experience, Testimonials, About, FAQ, Final CTA, Footer (full-page screenshot); `grep`-confirmed zero occurrences of `#d9694f`/`#f0a894`/old `--ink`/`--canvas` hex values anywhere in `app/globals.css`. |
| Headings/body render in the new sans-serif; Bodoni Moda no longer loaded | **Pass** — `app/layout.tsx` loads only `Be_Vietnam_Pro`; confirmed via screenshot (Vietnamese diacritics render correctly) and `grep` (no `Bodoni_Moda`/`--serif`/`font-serif` references anywhere). |
| No WebGL/Three.js canvas initializes in the Hero | **Pass** — `document.querySelectorAll("canvas").length === 0` on page load; `HeroScene.tsx` deleted, `three`/`@react-three/*` removed from `package.json`. |

## User Story 2 — Existing customer content and trust signals remain intact (P2)

| Acceptance scenario | Result |
|---|---|
| Section order unchanged (Nav → Hero → Social Proof → Services → Results → Gallery → Process → Facility → Testimonials → About → FAQ → Final CTA → Footer) | **Pass** — confirmed via full-page screenshot; `app/page.tsx` structure untouched by this feature. |
| No business fact added/altered/removed | **Pass** — `data/content.ts` untouched; `data/brand.ts` only lost the unused `heroPortrait` export (dead code after `HeroScene` removal, never rendered as content). Address, services, testimonial attributions all unchanged. |

## User Story 3 — Site feels lighter and faster after removing the 3D scene (P3)

| Acceptance scenario | Result |
|---|---|
| No WebGL canvas in the hero on any device | **Pass** — same canvas-count check as above; also removed 3 npm dependencies (`three`, `@react-three/fiber`, `@react-three/drei`), reducing installed package count by 54 (`npm install` output). |
| `prefers-reduced-motion` still respected | **Pass (unchanged)** — the existing global `@media (prefers-reduced-motion: reduce)` block in `app/globals.css` is untouched; removing the 3D scene eliminates the one WebGL-specific reduced-motion branch that used to need separate handling. |

## Functional regression check (spec FR-006 — interactive elements)

Verified with a scripted interaction pass (Playwright), since this restyle only changes CSS/JSX
presentation, not component logic:

| Interaction | Result |
|---|---|
| FAQ accordion opens on click | **Pass** |
| Before/After slider responds to mouse drag (divider position changes) | **Pass** |
| Mobile menu opens on the hamburger button | **Pass** |
| Console/page errors during the above | **None** |

## Accessibility (spec FR-008)

Contrast ratios computed by hand (WCAG formula) for every new token pairing actually used in the
stylesheet — see `app/globals.css`'s inline comments for the specific numbers (moss/canvas
4.68:1, moss/ink 2.87:1 → fixed via the `--moss-on-dark` custom-property override on every
dark-background section and interactive dark-background component, moss-soft/ink-deep 8.52:1).
All text and non-text (focus ring) contrast pairings identified during CORRECTNESS review were
fixed and re-verified; see gate CORRECTNESS receipt for the fix history (four review passes,
final pass returned zero findings).

## Build/lint/test (re-confirmed at QA time)

- `npm run build` — succeeds, no TypeScript errors, static export generates cleanly.
- `npm run lint` — 0 errors (pre-existing unrelated warnings only, in `.claude/skills/gstack/`).
- `npm test` (`node --test scripts/**/*.test.mjs`) — 7/7 passing.

## Verdict

**QA: PASS.** No functional regressions found. No open issues.

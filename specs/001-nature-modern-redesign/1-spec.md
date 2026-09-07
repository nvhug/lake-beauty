# Feature Specification: Nature-Modern Visual Redesign

**Feature Branch**: `001-nature-modern-redesign`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "update UI theo phong cách khác hoàn toàn, tôi không thích tông màu, kiểu thiết kế, và phong cách này. hãy update mang xu hướng hiện đại đơn giản, hài hòa với thiên nhiên. nhẹ nhàng nhưng hiện đại"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First-time visitor forms a calm, trustworthy first impression (Priority: P1)

A prospective customer lands on the homepage from a Facebook/Messenger link. Instead of the
current warm ivory/beige "clinical beauty" look with a heavy red-orange accent and a 3D hero
scene, they see a light, airy, nature-inspired page (soft sage/olive greens on an off-white
background, clean modern sans-serif type, no 3D) that feels calm and current rather than dated
or overly "salon-generic."

**Why this priority**: The homepage's visual identity is the first thing every visitor judges
before reading any content — if the redesign doesn't land here, nothing else matters.

**Independent Test**: Load the homepage on desktop and mobile with no other functional changes;
a reviewer confirms the new palette, typography, and hero treatment are applied consistently
site-wide and the old palette/serif/3D scene are gone.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the visitor views any section (hero, services,
   results, testimonials, footer, etc.), **Then** all backgrounds, text, borders and accent
   colors use the new sage/olive + off-white palette — no ivory/beige or red-orange (`#DB735F`)
   colors remain.
2. **Given** the homepage is loaded, **When** the visitor reads any heading or body text,
   **Then** it renders in the new modern sans-serif family — the previous serif display font
   (Bodoni Moda) is no longer loaded or referenced anywhere.
3. **Given** the visitor scrolls to the Hero section, **When** the page renders, **Then** no
   WebGL/Three.js canvas is initialized — the hero shows a static image or a soft nature-inspired
   gradient/texture instead, and the page has no Three.js-related network/JS cost.

---

### User Story 2 - Existing customer content and trust signals remain intact (Priority: P2)

A visitor evaluating whether to book a consultation still needs to see the real before/after
results, services, process, testimonials and contact information exactly as before — only the
visual skin changes, not the substance or order of the page.

**Why this priority**: The redesign must not regress the site's actual conversion content (real
photos, factual claims, anonymized testimonials) — losing or altering that would undermine trust
and violate the project's existing factual-accuracy constitution.

**Independent Test**: Compare the page's section order and all business-fact text (services,
result captions, testimonial attributions, address, booking channel) before and after the
redesign; content and order are unchanged, only presentation differs.

**Acceptance Scenarios**:

1. **Given** the redesign is applied, **When** comparing to the pre-redesign page, **Then** the
   section order (Nav → Hero → Social Proof → Services → Before/After Results → Process →
   Facility → Testimonials → About → FAQ → Final CTA → Footer, per `LANDING_PAGE_SPEC.md`) is
   unchanged.
2. **Given** the redesign is applied, **When** inspecting any business fact on the page (address,
   services list, testimonial attribution, result condition labels), **Then** the text matches
   what was confirmed in `docs/CONTENT_SCHEMA.md` / project memory — no fact is added, removed,
   or altered as a side effect of restyling.

---

### User Story 3 - Site feels lighter and faster after removing the 3D scene (Priority: P3)

A mobile visitor on a mid-range device opens the site and experiences a hero section that loads
quickly and doesn't drain battery/CPU on WebGL rendering, since the 3D scene is replaced by a
static asset.

**Why this priority**: This is a natural side benefit of the palette/typography/hero decisions
already made, not the primary driver — but it's a measurable, testable outcome worth confirming.

**Independent Test**: Load the hero on a throttled mobile profile and confirm no WebGL context is
created and the hero's dedicated JS payload (Three.js/`@react-three/fiber`/`@react-three/drei`
code actually shipped to the client) is removed or no longer loaded on that route.

**Acceptance Scenarios**:

1. **Given** the hero renders on any device, **When** checking the browser's rendering contexts,
   **Then** no WebGL canvas exists in the hero.
2. **Given** `prefers-reduced-motion` is set, **When** the hero renders, **Then** the static
   hero image/gradient displays with no motion regardless (this requirement was previously only
   relevant to the 3D scene and is now trivially satisfied by removing it, but must not regress
   to reintroducing motion elsewhere without respecting the setting).

---

### Edge Cases

- What happens to any copy or trust indicators that referenced the old accent color or "clinical"
  framing indirectly (e.g. imagery treated to match the old warm tone)? → Re-treat/re-export
  only the *display* treatment (crops, hero background) as needed for the new palette; do not
  alter the underlying real photos' authenticity (see constitution: "never over-process skin,
  never fabricate results").
- What happens if a component currently hard-codes the old accent/ivory colors inline instead of
  via the design tokens? → Must be moved to reference the updated centralized tokens, per the
  constitution's "never hard-code colors" rule, so no component is missed by search-and-replace.
- What happens to the hero's "no clean front-facing portrait yet" gap noted in
  `docs/ASSET_MAP.md`? → Out of scope for this redesign to source new photography; the static
  hero treatment must work with a placeholder/gradient until a real portrait/nature image is
  supplied, per the same "explicit placeholder until provided" rule already in the asset map.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The design system (`docs/DESIGN_SYSTEM.md` and its implementation in
  `app/globals.css` / token usage across `components/`) MUST be replaced with a new palette
  centered on sage/olive greens over a soft off-white/light-neutral background, replacing every
  reference to the current ivory/beige surface and `#DB735F` red-orange accent.
- **FR-002**: The typography system MUST use a single modern, minimal sans-serif family for both
  display/heading and body text; the current serif display font (Bodoni Moda) MUST be removed
  from font loading and CSS entirely.
- **FR-003**: The Hero section's Three.js scene (`components/hero/HeroScene.tsx` and any
  supporting `three`/`@react-three/fiber`/`@react-three/drei` usage) MUST be removed and replaced
  with a static image or a soft nature-inspired gradient/texture background. If the corresponding
  npm dependencies become fully unused after this change, they MUST be removed from
  `package.json`.
- **FR-004**: All other page sections (Social Proof, Services, Before/After Results, Treatment
  Process, Facility, Testimonials, About, FAQ, Final CTA, Footer) MUST visually adopt the new
  palette/typography but MUST NOT change their content, data source (`data/brand.ts`,
  `data/content.ts`), or section order.
- **FR-005**: Motion/animation (Framer Motion, scroll behavior) MAY be retained but MUST continue
  to respect `prefers-reduced-motion` and MUST stay within the existing "less but better" motion
  philosophy (subtle fades/translations/scale, 200–500ms).
- **FR-006**: The Before/After slider and all interactive elements MUST remain fully functional
  (touch, mouse drag, keyboard) after the restyle — this is a visual-only change to their
  presentation, not their behavior.
- **FR-007**: No business fact (address, services, testimonial attribution, result labels,
  contact/booking channel) MUST be added, altered, or removed as part of this redesign, per the
  project constitution's factual-accuracy rules.
- **FR-008**: The updated palette and typography MUST maintain WCAG-friendly contrast ratios
  (per the existing accessibility requirement in `LANDING_PAGE_SPEC.md` §32) — sage/olive-on-
  off-white combinations must be checked for sufficient text contrast, not just visual appeal.

### Key Entities

- **Design tokens**: The centralized color/typography/spacing values consumed by all components
  (currently documented in `docs/DESIGN_SYSTEM.md`); this redesign replaces their values, not
  their existence as a centralized system.
- **Hero visual asset**: The new static image or gradient/texture replacing the removed Three.js
  scene; sourced from either a real business photo (preferred, pending availability per
  `docs/ASSET_MAP.md`) or a designed gradient/texture as an interim placeholder.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of visible UI surfaces (every page section) use the new palette — zero
  occurrences of the previous accent color or ivory/beige background values remain in shipped
  CSS.
- **SC-002**: Zero WebGL contexts are created on page load — the hero renders without
  initializing Three.js.
- **SC-003**: Page weight/JS payload for the hero route decreases measurably (fewer bytes shipped
  to the client) as a direct result of removing the 3D scene and its dependencies, versus the
  pre-redesign baseline.
- **SC-004**: All existing interactive features (before/after slider, mobile menu, FAQ accordion,
  nav scroll state) pass the same manual QA checklist used previously (`LANDING_PAGE_SPEC.md`
  §48) with no functional regressions.
- **SC-005**: Lighthouse Performance/Accessibility/Best Practices/SEO scores stay ≥ 90 (the
  existing bar), and Accessibility specifically does not regress due to new color contrast
  choices.

## Assumptions

- The exact sage/olive/off-white hex values and the specific sans-serif typeface are a DESIGN-
  stage decision (to be finalized as concrete tokens in `docs/DESIGN_SYSTEM.md` during the
  DESIGN gate), not fixed by this spec — this spec fixes the *direction*, DESIGN fixes the exact
  values.
- No new business content, images, or copy are introduced; where a genuinely new visual asset is
  needed (e.g. a nature-themed hero background) and no real business photo is available yet, an
  explicit placeholder/gradient is used rather than a fabricated or stock "generic beauty" image,
  consistent with the constitution's image-authenticity rules.
- Removing the Three.js hero scene is an explicit, confirmed decision (not a default) — the
  business owner chose "bỏ 3D, dùng hình ảnh/gradient tĩnh" over keeping a restyled 3D scene.
- This is a visual-restyle-only feature: no changes to routing, data schema, or the booking/
  Messenger integration are in scope.

## Quality Checklist

**Purpose**: Validate specification completeness and quality before proceeding to planning

### Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

### Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

### Notes

- Color palette direction (sage/olive on off-white), typography direction (single modern
  sans-serif), and hero treatment (remove 3D, use static image/gradient) were confirmed directly
  with the business owner via targeted questions before this spec was written — no
  [NEEDS CLARIFICATION] markers were needed as a result.

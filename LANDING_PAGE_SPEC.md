Nếu mục tiêu là **landing page production thật sự**, có SEO, responsive, animation, Three.js, dễ mở rộng và sau này có thể tích hợp form/CRM/Messenger/booking thì mình chọn **Next.js**, không chọn HTML thuần.

**Khuyến nghị stack:**

```text
Next.js 16+
TypeScript
Tailwind CSS
React Three Fiber
Three.js
@react-three/drei
Framer Motion
Lenis
next/image
```

HTML thuần chỉ đáng chọn nếu đây là **một landing page cực đơn giản, gần như static và không có Three.js/animation phức tạp**.

Dưới đây là bộ prompt/spec mình sẽ dùng cho **Claude Code**.

---

# CLAUDE CODE — MASTER PROMPT

Bạn có thể lưu thành:

```text
CLAUDE.md
```

hoặc:

```text
docs/LANDING_PAGE_SPEC.md
```

và yêu cầu Claude Code đọc nó trước khi code.

---

```md
# PREMIUM BEAUTY LANDING PAGE
## Claude Code Master Specification

You are a senior frontend engineer, creative developer,
UX/UI designer and Three.js developer.

Your task is to build a production-quality landing page
for a premium beauty / skincare business.

The provided Facebook screenshots are the primary source
for the business's visual content, customer results,
treatment images, facility images and social proof.

========================================================
# 0. NON-NEGOTIABLE RULES
========================================================

Before writing code:

1. Inspect the existing repository.
2. Inspect package.json.
3. Inspect all existing source files.
4. Inspect all provided images/assets.
5. Determine whether the project already uses Next.js,
   Tailwind, React Three Fiber or another design system.
6. Reuse existing infrastructure when appropriate.
7. Do NOT blindly replace the existing project structure.
8. Do NOT start coding before understanding the repository.

The final website must feel like a professionally designed
premium beauty brand website.

It must NOT look like:

- an AI-generated template
- a generic spa website
- a SaaS landing page
- a gaming website
- a portfolio template
- a Three.js technology demo

Three.js is a supporting visual layer,
NOT the main purpose of the website.

========================================================
# 1. PRIMARY GOAL
========================================================

Build a high-converting premium beauty/skincare landing page.

Primary business goals:

1. Build trust.
2. Showcase real customer results.
3. Explain services.
4. Demonstrate professional treatment process.
5. Convert visitors into consultation/booking leads.

Primary CTA:

"ĐẶT LỊCH TƯ VẤN"

Secondary CTA:

"XEM KẾT QUẢ"

The strongest conversion asset is REAL CUSTOMER RESULTS.

Therefore:

BEFORE/AFTER > decorative animation.

========================================================
# 2. TECHNOLOGY
========================================================

Preferred stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Three.js
- @react-three/fiber
- @react-three/drei
- Framer Motion
- Lenis

Use Next.js App Router unless the existing project
already uses another architecture.

Use Server Components by default.

Use "use client" ONLY when required.

Client components should primarily be used for:

- Three.js
- interactive sliders
- carousels
- animations requiring browser APIs
- interactive navigation
- forms

Do not make the entire page a client component.

========================================================
# 3. DESIGN DIRECTION
========================================================

DESIGN CONCEPT:

Premium Clinical Beauty.

Keywords:

- premium
- elegant
- clean
- clinical
- trustworthy
- sophisticated
- modern
- editorial
- warm
- feminine but not overly decorative

Visual direction:

- ivory
- warm white
- subtle beige
- nude
- muted neutral colors
- black / dark charcoal typography
- restrained accent color

Use generous whitespace.

Typography should feel editorial and premium.

Avoid excessive decoration.

Avoid excessive gradients.

Avoid excessive glassmorphism.

Avoid neon colors.

Avoid excessive shadows.

Avoid excessive rounded cards.

Avoid generic "spa" aesthetics.

========================================================
# 4. VISUAL HIERARCHY
========================================================

Priority order:

1. Customer results
2. Trust
3. Services
4. Treatment process
5. Brand story
6. CTA
7. Decorative visuals

Three.js must NEVER overpower the actual business content.

If removing a Three.js effect improves conversion,
remove it.

========================================================
# 5. PAGE STRUCTURE
========================================================

Build the page in this exact logical order:

01. Navigation
02. Hero
03. Social Proof
04. Services
05. Before / After Results
06. Treatment Process
07. Real Experience / Facility
08. Customer Testimonials
09. About Brand
10. FAQ
11. Final CTA
12. Footer

========================================================
# 6. NAVIGATION
========================================================

Desktop navigation:

LEFT:

Logo / brand name

CENTER:

Dịch vụ
Kết quả
Quy trình
Về chúng tôi

RIGHT:

ĐẶT LỊCH

Navigation starts transparent over Hero.

On scroll:

- subtle background
- subtle blur
- subtle border
- compact height

Do not create a huge navbar.

Mobile:

Logo

Menu button

CTA should remain easily accessible.

Navigation must support keyboard interaction.

========================================================
# 7. HERO
========================================================

Hero is the visual introduction.

Structure:

LEFT:

Eyebrow:

"CHĂM SÓC DA CHUYÊN SÂU"

Headline:

"Đánh thức vẻ đẹp
tự nhiên của làn da."

Supporting text:

"Làn da khỏe đẹp bắt đầu từ
một liệu trình đúng và phù hợp
với tình trạng da thực tế."

Primary CTA:

"ĐẶT LỊCH TƯ VẤN"

Secondary CTA:

"XEM KẾT QUẢ"

Trust indicators may appear below.

Examples:

"Khách hàng thực tế"
"Quy trình chuyên nghiệp"
"Kết quả được ghi nhận"

IMPORTANT:

Do NOT invent numerical claims.

Do NOT write:

"5000+ customers"

unless the source actually confirms it.

========================================================
# 8. HERO THREE.JS
========================================================

Implement a premium abstract Three.js scene.

Preferred visual:

- organic translucent object
- soft liquid form
- subtle particles
- smooth movement
- sophisticated lighting
- minimal geometry
- subtle depth
- elegant motion

Do NOT create:

- rotating planets
- cubes
- sci-fi interfaces
- neon grids
- gaming effects
- complex mechanical objects

The visual should feel related to:

- skin
- softness
- beauty
- purity
- transformation
- organic forms

Animation:

- slow
- subtle
- smooth

Interaction:

Mouse movement:
small camera/object parallax.

Scroll:
very subtle movement.

No aggressive rotation.

========================================================
# 9. THREE.JS PERFORMANCE
========================================================

Three.js must be lazy-loaded.

Do not initialize WebGL before necessary.

Use dynamic import if appropriate.

Limit:

- geometry complexity
- particle count
- draw calls
- textures
- post-processing

Target:

60 FPS on modern desktop.

On mobile:

- reduce particle count
- reduce geometry
- simplify lighting
- disable expensive effects

If WebGL is unavailable:

show a static fallback visual.

Respect:

prefers-reduced-motion

If reduced motion is enabled:

- disable automatic rotation
- disable particle animation
- disable scroll-based animation
- keep content fully usable

========================================================
# 10. SOCIAL PROOF
========================================================

Immediately after Hero.

Use concise proof.

Possible layout:

04 metrics/cards.

BUT:

Only use factual information supported by source data.

Never fabricate:

- customer count
- rating
- years of experience
- success rate
- medical statistics
- certifications

If data is unavailable:

remove the metric rather than inventing it.

========================================================
# 11. SERVICES
========================================================

Create a premium service section.

Heading:

"GIẢI PHÁP CHO TỪNG TÌNH TRẠNG DA"

Services must come from the actual business content.

Do NOT invent services.

Each service card:

- index
- service name
- short description
- relevant image
- arrow

Interaction:

On hover:

- image scales slightly
- arrow moves
- subtle background transition

Keep animation under 400ms.

Cards should feel editorial,
not like SaaS feature cards.

========================================================
# 12. BEFORE / AFTER
========================================================

THIS IS THE MOST IMPORTANT SECTION.

Use real customer result images.

Heading:

"KẾT QUẢ THỰC TẾ"

Subheading:

"Những thay đổi được ghi nhận
qua từng khách hàng."

Create interactive Before / After slider.

Requirements:

- touch support
- mouse drag
- keyboard accessibility where possible
- smooth dragging
- visible divider
- clear BEFORE label
- clear AFTER label

Example:

BEFORE | AFTER

The user drags the divider.

Each result may include:

Case number
Condition
Treatment
Duration
Short description

Only display information that is actually known.

If information is unavailable:

do not fabricate it.

========================================================
# 13. IMAGE TREATMENT
========================================================

Real customer images are extremely important.

Do NOT apply heavy filters.

Do NOT over-process skin.

Do NOT artificially make results appear better.

Preserve authenticity.

Use:

next/image

with appropriate:

- width
- height
- sizes
- loading strategy
- object-fit

Hero images:

priority when appropriate.

Below-the-fold images:

lazy loading.

========================================================
# 14. RESULTS GALLERY
========================================================

Create an editorial gallery.

Do not simply create a boring grid.

Use varying image sizes.

Example:

large case
small case
large case
two-column case

However:

maintain visual rhythm.

Images should have consistent treatment.

Use subtle hover zoom.

No aggressive animation.

========================================================
# 15. TREATMENT PROCESS
========================================================

Show the customer journey.

Preferred structure:

01
TƯ VẤN

02
PHÂN TÍCH

03
CÁ NHÂN HÓA

04
THỰC HIỆN

05
THEO DÕI

BUT:

Only use these steps if supported by actual business
information.

Otherwise adapt to the real workflow.

Animation:

As user scrolls:

current step becomes active.

Use:

- opacity
- translation
- scale

Do not overanimate.

========================================================
# 16. REAL EXPERIENCE
========================================================

Use real images of:

- treatment rooms
- equipment
- staff
- treatment process
- customer experience

Goal:

Make visitors feel:

"This is a real business."

Not a stock-photo website.

Use horizontal image movement or editorial layout.

========================================================
# 17. TESTIMONIALS
========================================================

Use actual customer feedback.

Never fabricate reviews.

Never generate fake quotes.

Never create fake names.

If only partial identity is available:

use:

"Khách hàng thực tế"

or the exact available information.

Display:

quote
optional image
source/context if available

Keep testimonials concise.

========================================================
# 18. ABOUT
========================================================

Tell the brand story.

Use factual information only.

Possible structure:

LEFT:

Large image

RIGHT:

ABOUT US

Headline

Brand description

Trust elements

CTA

Do not make generic claims like:

"top beauty clinic"

"number one"

"world-class"

unless actually supported.

========================================================
# 19. FAQ
========================================================

Create FAQ from actual available information.

Potential questions:

- Liệu trình phù hợp với ai?
- Quy trình diễn ra như thế nào?
- Cần chuẩn bị gì?
- Bao lâu có thể quay lại sinh hoạt bình thường?
- Có cần đặt lịch trước không?

IMPORTANT:

Do not provide medical advice.

Do not make unsupported treatment promises.

If information is unknown:

do not fabricate an answer.

========================================================
# 20. FINAL CTA
========================================================

Strong conversion section.

Headline:

"SẴN SÀNG CHO
LÀN DA TỐT HƠN?"

Supporting text:

"Đặt lịch tư vấn để được
trao đổi về tình trạng da
và lựa chọn phù hợp."

Primary CTA:

"ĐẶT LỊCH TƯ VẤN"

Secondary:

"LIÊN HỆ NGAY"

Contact information:

Only use verified source information.

========================================================
# 21. FOOTER
========================================================

Include:

Logo
short description
navigation
contact
social links
address
copyright

Only include available data.

========================================================
# 22. RESPONSIVE
========================================================

Breakpoints:

Mobile:
320–767px

Tablet:
768–1199px

Desktop:
1200px+

Large desktop:
1440px+

Design mobile intentionally.

Do NOT simply shrink desktop.

Mobile priorities:

1. headline
2. CTA
3. trust
4. before/after
5. services
6. process

Hero:

desktop:
two-column

mobile:
stacked

Three.js:

desktop:
full visual

mobile:
simplified visual

If performance is poor:

disable Three.js on mobile.

========================================================
# 23. ANIMATION SYSTEM
========================================================

Use Framer Motion.

Animation philosophy:

"less but better"

Preferred:

- fade
- slide
- scale 0.98 → 1
- clip-path image reveal
- staggered text

Avoid:

- bouncing
- spinning
- excessive parallax
- long transitions
- attention-grabbing effects everywhere

Default duration:

200–500ms.

Hero entrance:

subtle.

Section entrance:

subtle.

Images:

slow reveal.

========================================================
# 24. SCROLL EXPERIENCE
========================================================

Use Lenis if compatible with the project.

Scrolling should feel:

- smooth
- premium
- controlled

Do not break:

- accessibility
- anchor navigation
- reduced motion
- browser scrolling behavior

========================================================
# 25. DESIGN TOKENS
========================================================

Create a centralized design system.

Example:

colors:

background:
#F8F6F2

surface:
#FFFFFF

text:
#1C1C1A

muted:
#77736B

border:
#E7E2DA

accent:
use one restrained brand accent.

IMPORTANT:

Do not hard-code colors randomly
throughout components.

Centralize them.

Typography:

Display:
large editorial heading

H1:
clamp responsive size

H2:
large section heading

Body:
comfortable reading size

Small:
metadata

Use consistent:

- letter spacing
- line height
- font weight

========================================================
# 26. SPACING
========================================================

Use a consistent spacing scale.

Avoid arbitrary:

margin-top: 37px
padding: 53px

unless genuinely required.

Prefer design tokens.

Sections should have generous vertical spacing.

Desktop:

~120–180px section spacing.

Tablet:

~90–130px.

Mobile:

~64–96px.

Adjust based on visual composition.

========================================================
# 27. COMPONENT ARCHITECTURE
========================================================

Do NOT create one giant page component.

Preferred:

components/

  navbar/
    Navbar.tsx
    MobileMenu.tsx

  hero/
    Hero.tsx
    HeroScene.tsx

  social-proof/
    SocialProof.tsx

  services/
    Services.tsx
    ServiceCard.tsx

  results/
    Results.tsx
    BeforeAfterSlider.tsx
    ResultCard.tsx
    ResultsGallery.tsx

  process/
    Process.tsx
    ProcessStep.tsx

  experience/
    Experience.tsx

  testimonials/
    Testimonials.tsx
    TestimonialCard.tsx

  about/
    About.tsx

  faq/
    FAQ.tsx

  cta/
    FinalCTA.tsx

  footer/
    Footer.tsx

  three/
    Scene.tsx
    OrganicObject.tsx
    Particles.tsx

========================================================
# 28. DATA ARCHITECTURE
========================================================

Separate content from UI.

Create:

data/

  brand.ts
  services.ts
  results.ts
  testimonials.ts
  process.ts
  faq.ts
  navigation.ts

OR:

data/landing-page.json

depending on project architecture.

Components must consume data.

Do not hard-code business content inside UI components.

Example:

const services = [...]

<Services services={services} />

========================================================
# 29. CONTENT SAFETY / FACTUALITY
========================================================

This is critical.

The source material contains customer photographs.

Never:

- invent customer identity
- invent treatment duration
- invent results
- invent medical claims
- invent certifications
- invent statistics
- invent pricing
- invent guarantees

When information is unavailable:

omit it.

Never fill gaps with AI assumptions.

========================================================
# 30. SEO
========================================================

Implement:

- title
- description
- canonical URL
- Open Graph
- Twitter metadata
- favicon
- semantic HTML
- heading hierarchy

Use:

H1:
exactly one primary H1.

Use H2:
for major sections.

Use descriptive image alt text.

Do NOT stuff keywords.

========================================================
# 31. STRUCTURED DATA
========================================================

If appropriate, implement Schema.org.

Potential types:

BeautySalon
LocalBusiness
Organization
FAQPage

ONLY use fields supported by actual business data.

Do not fabricate:

- rating
- review count
- price
- address
- opening hours

========================================================
# 32. ACCESSIBILITY
========================================================

Target WCAG-friendly implementation.

Requirements:

- semantic HTML
- keyboard navigation
- focus states
- alt text
- aria labels
- sufficient contrast
- button semantics
- form labels
- reduced motion support

Before/After slider must be accessible.

Mobile menu must be keyboard accessible.

========================================================
# 33. PERFORMANCE
========================================================

Target:

Lighthouse:

Performance >= 90
Accessibility >= 90
Best Practices >= 90
SEO >= 90

Optimize:

- images
- fonts
- JavaScript
- Three.js
- animations

Avoid:

- huge hero video
- massive textures
- unnecessary dependencies
- huge client bundles

Use:

next/image
dynamic imports
lazy loading

========================================================
# 34. IMAGE STRATEGY
========================================================

Use real business images.

Categorize them:

/public/images/

brand/
hero/
results/
services/
facility/
process/
testimonials/

Do not duplicate the same image unnecessarily.

Create meaningful filenames.

Example:

skin-before-after-01.webp

treatment-room-01.webp

facial-treatment-02.webp

========================================================
# 35. CONVERSION DESIGN
========================================================

CTA should appear at multiple logical points.

Hero:

ĐẶT LỊCH TƯ VẤN

After services:

TÌM HIỂU LIỆU TRÌNH

After results:

ĐẶT LỊCH TƯ VẤN

Final:

ĐẶT LỊCH TƯ VẤN

Do not spam CTA.

CTA should feel natural.

========================================================
# 36. MICROCOPY
========================================================

Language:

Vietnamese.

Tone:

- confident
- elegant
- warm
- professional
- concise

Avoid:

overly salesy language.

Avoid:

"100% guaranteed"
"best in Vietnam"
"miracle treatment"

unless explicitly verified.

========================================================
# 37. MOBILE CTA
========================================================

On mobile consider a fixed bottom CTA:

[ ĐẶT LỊCH TƯ VẤN ]

It should:

- not cover important content
- respect safe areas
- be dismissible if appropriate
- remain accessible

========================================================
# 38. FILE STRUCTURE
========================================================

Preferred:

app/
  layout.tsx
  page.tsx
  globals.css

components/
  navbar/
  hero/
  social-proof/
  services/
  results/
  process/
  experience/
  testimonials/
  about/
  faq/
  cta/
  footer/
  three/

data/
  brand.ts
  services.ts
  results.ts
  testimonials.ts
  process.ts
  faq.ts

lib/
  utils.ts

public/
  images/
    brand/
    hero/
    results/
    services/
    facility/
    process/

docs/
  DESIGN_SYSTEM.md
  LANDING_PAGE_SPEC.md

========================================================
# 39. DEVELOPMENT PROCESS
========================================================

Do NOT build everything at once.

Follow this order:

PHASE 1
Repository audit.

PHASE 2
Asset audit.

PHASE 3
Content extraction.

PHASE 4
Design system.

PHASE 5
Page architecture.

PHASE 6
Static UI.

PHASE 7
Before/After interaction.

PHASE 8
Three.js.

PHASE 9
Animation.

PHASE 10
Responsive.

PHASE 11
Performance.

PHASE 12
SEO/accessibility.

PHASE 13
Final QA.

========================================================
# 40. PHASE 1 — REPOSITORY AUDIT
========================================================

Before coding report:

- framework
- React version
- Next.js version
- styling system
- existing components
- dependencies
- existing assets
- existing routing
- build command
- lint command
- test command

Do not modify anything yet.

========================================================
# 41. PHASE 2 — ASSET AUDIT
========================================================

Inspect all provided images.

Categorize:

HERO
RESULTS
SERVICES
PROCESS
FACILITY
TESTIMONIAL
BRAND

Create an asset map.

Example:

assets/results/case-01-before.webp
assets/results/case-01-after.webp

Do not use random images.

========================================================
# 42. PHASE 3 — CONTENT EXTRACTION
========================================================

Create structured content.

Example:

{
  "brand": {
    "name": "",
    "description": "",
    "logo": ""
  },

  "services": [],

  "results": [
    {
      "before": "",
      "after": "",
      "condition": "",
      "treatment": "",
      "duration": ""
    }
  ],

  "testimonials": [],

  "contact": {
    "phone": "",
    "messenger": "",
    "address": ""
  }
}

Unknown values:

null

Never invent.

========================================================
# 43. PHASE 4 — DESIGN SYSTEM
========================================================

Create:

docs/DESIGN_SYSTEM.md

Include:

- colors
- typography
- spacing
- radius
- shadows
- buttons
- cards
- image rules
- animation rules
- Three.js rules
- responsive rules
- accessibility rules

========================================================
# 44. PHASE 5 — BUILD STATIC UI
========================================================

Build all sections without complex animation first.

Verify:

- hierarchy
- spacing
- typography
- responsive layout
- images
- content

Only after this is visually correct:

add animation.

========================================================
# 45. PHASE 6 — INTERACTIONS
========================================================

Implement:

- navbar scroll state
- mobile menu
- before/after slider
- service hover
- testimonial interaction
- FAQ accordion
- CTA interactions

========================================================
# 46. PHASE 7 — THREE.JS
========================================================

Only after the normal UI is stable.

Implement:

HeroScene

Then:

- desktop optimization
- mobile simplification
- reduced motion
- WebGL fallback

========================================================
# 47. PHASE 8 — ANIMATION
========================================================

Add Framer Motion.

Do not animate everything.

Animation must support hierarchy.

========================================================
# 48. PHASE 9 — QA
========================================================

Test:

Desktop:

1440
1920

Tablet:

768
1024

Mobile:

320
375
390
430

Check:

- overflow
- broken images
- typography
- spacing
- buttons
- menu
- slider
- animations
- Three.js
- CTA

========================================================
# 49. PERFORMANCE QA
========================================================

Check:

- Lighthouse
- bundle size
- image sizes
- client components
- Three.js initialization
- layout shift
- font loading

Remove unnecessary dependencies.

========================================================
# 50. FINAL ACCEPTANCE CRITERIA
========================================================

The project is NOT complete until:

[ ] Page looks premium.
[ ] Real images are used.
[ ] Before/After interaction works.
[ ] Three.js works.
[ ] Three.js has mobile fallback.
[ ] Reduced motion works.
[ ] Mobile layout is intentional.
[ ] No horizontal overflow.
[ ] Images optimized.
[ ] SEO implemented.
[ ] Accessibility implemented.
[ ] No fabricated business information.
[ ] CTA works.
[ ] Existing project tests pass.
[ ] Production build passes.
[ ] No TypeScript errors.
[ ] No lint errors.

========================================================
# 51. FINAL RULE
========================================================

When there is a conflict between:

visual effects
and
conversion/performance/accessibility,

ALWAYS prioritize:

1. correctness
2. conversion
3. performance
4. accessibility
5. maintainability
6. aesthetics
7. decorative effects

Three.js is optional.

A beautiful website without Three.js
is better than a slow website with Three.js.
```

---

# Nhưng mình khuyên thêm một thứ

Đừng chỉ đưa `CLAUDE.md` rồi bảo:

> "Build this website."

Với Claude Code, hiệu quả hơn rất nhiều nếu cho nó chạy theo **workflow nhiều bước**.

Tạo:

```text
docs/
├── DESIGN_SYSTEM.md
├── LANDING_PAGE_SPEC.md
├── CONTENT_SCHEMA.md
└── ASSET_MAP.md
```

và workflow:

```text
                    ┌─────────────────┐
                    │ Facebook Data   │
                    │ + Screenshots   │
                    └────────┬────────┘
                             ↓
                  ┌─────────────────────┐
                  │ 01 CONTENT AUDIT    │
                  └──────────┬──────────┘
                             ↓
                  CONTENT_SCHEMA.md
                             ↓
                  ┌─────────────────────┐
                  │ 02 ASSET AUDIT      │
                  └──────────┬──────────┘
                             ↓
                     ASSET_MAP.md
                             ↓
                  ┌─────────────────────┐
                  │ 03 DESIGN SYSTEM    │
                  └──────────┬──────────┘
                             ↓
                  DESIGN_SYSTEM.md
                             ↓
                  ┌─────────────────────┐
                  │ 04 PAGE SPEC        │
                  └──────────┬──────────┘
                             ↓
               LANDING_PAGE_SPEC.md
                             ↓
                  ┌─────────────────────┐
                  │ 05 IMPLEMENTATION   │
                  └──────────┬──────────┘
                             ↓
                         Next.js
                             ↓
                  ┌─────────────────────┐
                  │ 06 INTERACTIONS     │
                  │  Before/After       │
                  │  FAQ                │
                  │  Navigation         │
                  └──────────┬──────────┘
                             ↓
                  ┌─────────────────────┐
                  │ 07 THREE.JS         │
                  └──────────┬──────────┘
                             ↓
                  ┌─────────────────────┐
                  │ 08 ANIMATION        │
                  └──────────┬──────────┘
                             ↓
                  ┌─────────────────────┐
                  │ 09 QA               │
                  │ Performance         │
                  │ Mobile              │
                  │ SEO                 │
                  └──────────┬──────────┘
                             ↓
                       PRODUCTION
```

## Next.js vs HTML thuần

|                       | HTML thuần  | Next.js |
| --------------------- | ----------- | ------- |
| Landing page static   | ✅           | ✅       |
| SEO                   | ✅           | ⭐⭐⭐⭐⭐   |
| Three.js              | ✅           | ⭐⭐⭐⭐⭐   |
| React animation       | ❌           | ✅       |
| Before/After slider   | JS thêm     | ✅       |
| Responsive            | ✅           | ✅       |
| Image optimization    | ❌           | ⭐⭐⭐⭐⭐   |
| Lazy loading          | Tự làm      | ✅       |
| Form booking          | JS/API thêm | ⭐⭐⭐⭐⭐   |
| Messenger integration | ✅           | ✅       |
| Analytics             | ✅           | ✅       |
| Mở rộng thành website | ⚠️          | ⭐⭐⭐⭐⭐   |
| Maintainability       | ⚠️          | ⭐⭐⭐⭐⭐   |
| Production            | ⭐⭐⭐         | ⭐⭐⭐⭐⭐   |

### → Chọn **Next.js**.

Đặc biệt với landing page này, mình sẽ dùng **Next.js Server Components cho phần content + Client Components rất nhỏ cho Three.js/Before-After/animation**. Như vậy vừa đẹp vừa không biến toàn bộ website thành một SPA nặng.

---

## Một điểm rất quan trọng với 3 ảnh bạn gửi

Ảnh hiện tại là **screenshot Facebook rất dài và độ phân giải hiển thị khá nhỏ**. Nếu mục tiêu là lấy **ảnh before/after chất lượng cao từ Page**, screenshot không phải nguồn tốt nhất.

Nếu bạn có thể lấy **ảnh gốc/export media của Facebook Page**, hãy đưa cho Claude Code bộ ảnh gốc. AI sẽ dễ dàng phân loại:

```text
case-001
  before.jpg
  after.jpg

case-002
  before.jpg
  after.jpg

case-003
  before.jpg
  after.jpg

facility/
  room-01.jpg
  room-02.jpg

process/
  treatment-01.jpg
  treatment-02.jpg
```

Từ đó landing page sẽ **khác hoàn toàn** so với việc cắt ảnh từ screenshot Facebook.

Nếu bạn có **folder ảnh gốc của Page**, upload nó lên đây; mình có thể tiếp tục thiết kế cho bạn **`CONTENT_SCHEMA.md` + `ASSET_MAP.md` + `DESIGN_SYSTEM.md` + `LANDING_PAGE_SPEC.md` hoàn chỉnh**, trong đó mình sẽ chỉ rõ **ảnh nào vào section nào, thứ tự case Before/After, typography, màu, animation và Three.js scene** để Claude Code có thể triển khai gần như trực tiếp.

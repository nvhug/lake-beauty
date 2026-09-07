# Lake beauty Asset Map

Real photos from Lake beauty's own Facebook library have been added. Faces are already redacted/cropped by the
business in the source photos where the customer's identity isn't the point of the shot; keep that treatment when
adding new images.

| Asset | Path | Used by | Status |
| --- | --- | --- | --- |
| Result case 01 (mụn & lỗ chân lông) | `public/images/results/case-01-before.webp` / `case-01-after.webp` | Interactive before/after slider | Live |
| Result case 02 (nám - tàn nhang) | `public/images/results/case-02-before.webp` / `case-02-after.webp` | Interactive before/after slider | Live |
| Result case 03 (da nhạy cảm, viêm đỏ) | `public/images/results/case-03-before.webp` / `case-03-after.webp` | Interactive before/after slider | Live |
| Result case 04 (nám - sạm da) | `public/images/results/case-04-before.webp` / `case-04-after.webp` | Interactive before/after slider | Live |
| Results gallery (5 ảnh) | `public/images/results/gallery-01.webp` … `gallery-05.webp` | Editorial results gallery | Live |
| Facility / real experience (7 ảnh) | `public/images/facility/room-01.webp` … `room-07.webp` | Real Experience filmstrip | Live |
| Brand social image | `public/og-image.jpg` | OpenGraph | Live |
| Hero portrait | `public/images/hero/portrait.jpg` | Hero face mesh | Pending — no clean front-facing portrait yet, hero runs the point-mesh only |

Source photos live outside the repo at the business's own picture library. Every result photo carries the Lake
beauty watermark or was already cropped/redacted for privacy by the business — keep that convention for any new
case. Do not use raw Messenger/Facebook screenshots as page imagery; they're useful only as source evidence for
testimonial text and service facts (see `data/content.ts`).

When new cases arrive: crop/split with `sharp`, export to `.webp`, and add an entry to `resultCases` or
`resultGallery` in `data/content.ts` — condition can be described from what's visibly documented, but never
invent treatment names, durations, or numbers that aren't confirmed by Lake beauty.

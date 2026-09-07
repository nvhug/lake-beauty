# Lake beauty Content Schema

All unknown values must remain `null` until Lake beauty confirms them.

```ts
type Result = {
  before: string | null;
  after: string | null;
  condition: string | null;
  treatment: string | null;
  duration: string | null;
};

type Testimonial = {
  quote: string;
  source: string;
  image: string | null;
};
```

Current confirmed information:
- Brand: Lake beauty
- Specialist: Hồ Thủy
- Address: 16 Nguyễn Đình Chiểu, Buôn Hồ, Đắk Lắk
- Booking channel: Facebook Messenger at `facebook.com/lakebeauty47`
- Services (confirmed from real photos and customer messages): Chăm sóc da, điều trị mụn — sẹo rỗ — sẹo lồi — nám/tàn nhang — da tổn thương do corticoid, triệt lông, tư vấn da riêng
- Result conditions may be described from what's visibly documented in a photo (e.g. "nám - tàn nhang"); specific treatment names/durations are only included when the source photo or business copy states them explicitly

Phone number, opening hours, prices, customer counts, star ratings and certifications are not confirmed — do not add them.
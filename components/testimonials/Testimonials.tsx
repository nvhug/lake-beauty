import { Reveal } from "@/components/ui/Reveal";

type Testimonial = { quote: string; source: string };

export function Testimonials({ items }: { items: readonly Testimonial[] }) {
  return (
    <div className="testimonial-grid">
      {items.map((item, index) => (
        <Reveal key={item.source} delay={index * 0.08} className="testimonial-card">
          <span aria-hidden="true">“</span>
          <p>{item.quote}</p>
          <small>{item.source}</small>
        </Reveal>
      ))}
    </div>
  );
}

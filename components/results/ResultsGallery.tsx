import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

type GalleryItem = {
  id: string;
  image: string;
  condition: string;
  treatment: string | null;
};

export function ResultsGallery({ items }: { items: readonly GalleryItem[] }) {
  return (
    <div className="result-gallery">
      {items.map((item, index) => (
        <Reveal key={item.id} delay={index * 0.05} className="result-gallery-item">
          <Image
            src={item.image}
            alt={`Case ${item.id} — ${item.condition}, trước và sau`}
            fill
            sizes="(min-width: 1000px) 40vw, 90vw"
            className="result-gallery-photo"
          />
          <div className="result-gallery-caption">
            <span>Case / {item.id}</span>
            <strong>{item.condition}</strong>
            {item.treatment && <small>{item.treatment}</small>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

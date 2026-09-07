"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  before: string;
  after: string;
  alt: string;
};

export function BeforeAfterSlider({ before, after, alt }: Props) {
  const [position, setPosition] = useState(50);

  return (
    <div className="before-after" style={{ "--position": `${position}%` } as React.CSSProperties}>
      <div className="result-pane result-before">
        <Image src={before} alt={`${alt} — trước liệu trình`} fill sizes="(min-width: 1000px) 55vw, 100vw" className="result-photo" priority />
        <span>Before</span>
      </div>
      <div className="result-pane result-after">
        <Image src={after} alt={`${alt} — sau liệu trình`} fill sizes="(min-width: 1000px) 55vw, 100vw" className="result-photo" priority />
        <span>After</span>
      </div>
      <div className="result-divider" aria-hidden="true">
        <span>↔</span>
      </div>
      <input
        className="result-range"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`So sánh ảnh trước và sau — ${alt}`}
      />
    </div>
  );
}

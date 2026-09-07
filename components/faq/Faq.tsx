"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export function Faq({ items }: { items: readonly FaqItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return <div className="faq-list">
    {items.map((item, index) => {
      const isOpen = index === activeIndex;
      return <article className="faq-item" key={item.question}><button type="button" aria-expanded={isOpen} onClick={() => setActiveIndex(isOpen ? null : index)}><span>{item.question}</span><b aria-hidden="true">{isOpen ? "−" : "+"}</b></button>{isOpen && <p>{item.answer}</p>}</article>;
    })}
  </div>;
}
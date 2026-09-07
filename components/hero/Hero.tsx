"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/data/brand";

const HeroScene = dynamic(() => import("./HeroScene").then((module) => module.HeroScene), {
  ssr: false,
  loading: () => <div className="scene-fallback" />,
});

const line = {
  hidden: { opacity: 0, y: 26 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.12 * index, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const reduced = useReducedMotion();
  const animate = (index: number) => ({
    custom: index,
    variants: line,
    initial: reduced ? undefined : ("hidden" as const),
    animate: reduced ? undefined : ("show" as const),
  });

  return (
    <section className="hero" id="top">
      <div className="hero-stage" aria-hidden="true">
        <HeroScene />
      </div>
      <div className="hero-veil" aria-hidden="true" />

      <div className="hero-inner">
        <motion.p className="eyebrow" {...animate(0)}>
          <span />
          Chăm sóc da chuyên sâu
        </motion.p>

        <h1>
          <motion.span className="h1-line" {...animate(1)}>
            Đánh thức vẻ đẹp
          </motion.span>
          <motion.span className="h1-line" {...animate(2)}>
            <em>tự nhiên</em> của làn da.
          </motion.span>
        </h1>

        <motion.p className="hero-description" {...animate(3)}>
          Làn da khỏe đẹp bắt đầu từ một liệu trình đúng và phù hợp với tình trạng da thực tế.
        </motion.p>

        <motion.div className="hero-actions" {...animate(4)}>
          <a className="button button-coral" href={brand.messengerUrl} target="_blank" rel="noreferrer">
            Đặt lịch tư vấn <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link light-link" href="#ket-qua">
            Xem kết quả <span aria-hidden="true">↓</span>
          </a>
        </motion.div>

        <motion.ul className="hero-trust" {...animate(5)}>
          <li>Khách hàng thực tế</li>
          <li>Quy trình chuyên nghiệp</li>
          <li>Kết quả được ghi nhận</li>
        </motion.ul>
      </div>

      <div className="hero-foot">
        <span className="hero-place">Lake beauty — Buôn Hồ, Đắk Lắk</span>
        <span className="hero-scroll">
          <i />
          Scroll
        </span>
      </div>
    </section>
  );
}

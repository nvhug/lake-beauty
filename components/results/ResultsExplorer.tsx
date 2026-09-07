"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { brand } from "@/data/brand";

type ResultCase = {
  id: string;
  before: string;
  after: string;
  condition: string;
  treatment: string | null;
  duration: string | null;
};

export function ResultsExplorer({ cases }: { cases: readonly ResultCase[] }) {
  const [activeId, setActiveId] = useState(cases[0]?.id);
  const active = cases.find((item) => item.id === activeId) ?? cases[0];

  if (!active) return null;

  return (
    <div className="results-layout">
      <div>
        <div className="case-tabs" role="tablist" aria-label="Chọn case để xem trước / sau">
          {cases.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === active.id}
              className={item.id === active.id ? "case-tab case-tab-active" : "case-tab"}
              onClick={() => setActiveId(item.id)}
            >
              Case {item.id}
            </button>
          ))}
        </div>
        <BeforeAfterSlider before={active.before} after={active.after} alt={`Case ${active.id} — ${active.condition}`} />
      </div>

      <aside className="case-detail">
        <span>Case / {active.id}</span>
        <h3>{active.condition}</h3>
        <p>Kéo thanh trượt để so sánh ảnh trước và sau liệu trình của khách hàng thực tế tại Lake beauty.</p>
        <dl>
          <div>
            <dt>Tình trạng</dt>
            <dd>{active.condition}</dd>
          </div>
          <div>
            <dt>Liệu trình</dt>
            <dd>{active.treatment ?? "Chờ cập nhật"}</dd>
          </div>
          <div>
            <dt>Thời gian</dt>
            <dd>{active.duration ?? "Chờ cập nhật"}</dd>
          </div>
        </dl>
        <a className="text-link" href={brand.messengerUrl} target="_blank" rel="noreferrer">
          Xem thêm trên fanpage <span aria-hidden="true">↗</span>
        </a>
      </aside>
    </div>
  );
}

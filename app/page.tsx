import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ResultsExplorer } from "@/components/results/ResultsExplorer";
import { ResultsGallery } from "@/components/results/ResultsGallery";
import { FacilityFilmstrip } from "@/components/experience/FacilityFilmstrip";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Faq } from "@/components/faq/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { brand } from "@/data/brand";
import { faqs, facilityPhotos, process, resultCases, resultGallery, services, testimonials } from "@/data/content";

const bookingFaq = [
  {
    question: "Làm thế nào để đặt lịch tư vấn?",
    answer: "Bạn có thể nhắn tin trực tiếp cho Lake beauty qua Facebook để trao đổi và đặt lịch.",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: brand.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: "16 Nguyễn Đình Chiểu",
    addressLocality: "Buôn Hồ",
    addressRegion: "Đắk Lắk",
    addressCountry: "VN",
  },
  telephone: "+84364859599",
  sameAs: [brand.messengerUrl],
};

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />

      <main>
        <Hero />

        <section className="proof section" aria-label="Những giá trị của Lake beauty">
          <div>
            <p className="eyebrow">
              <span />
              Tin cậy bắt đầu từ sự thật
            </p>
            <p className="proof-copy">
              Mọi hình ảnh kết quả trên trang này đều là ảnh chụp khách hàng thực tế tại Lake beauty, không qua chỉnh sửa
              làm sai lệch.
            </p>
          </div>
          <div className="proof-grid">
            <div>
              <strong>01</strong>
              <span>
                Chăm sóc
                <br />
                cá nhân hóa
              </span>
            </div>
            <div>
              <strong>02</strong>
              <span>
                Đồng hành
                <br />
                cùng {brand.specialist}
              </span>
            </div>
            <div>
              <strong>03</strong>
              <span>
                16 Nguyễn Đình Chiểu
                <br />
                Buôn Hồ
              </span>
            </div>
          </div>
        </section>

        <section className="services section" id="dich-vu">
          <header className="section-header">
            <div>
              <p className="eyebrow">
                <span />
                01 / Dịch vụ
              </p>
              <h2>
                Giải pháp cho
                <br />
                <em>từng làn da.</em>
              </h2>
            </div>
            <p>Bốn nhóm dịch vụ chính đang được thực hiện tại Lake beauty, dựa trên nhu cầu thực tế của khách hàng.</p>
          </header>

          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.08}>
                <article className="service-card">
                  <span>{service.id}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <b aria-hidden="true">↗</b>
                </article>
              </Reveal>
            ))}
          </div>

          <a className="section-cta text-link" href={brand.messengerUrl} target="_blank" rel="noreferrer">
            Trao đổi về liệu trình <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section className="results section" id="ket-qua">
          <header className="section-header">
            <div>
              <p className="eyebrow">
                <span />
                02 / Kết quả thực tế
              </p>
              <h2>
                Những thay đổi
                <br />
                <em>được ghi nhận.</em>
              </h2>
            </div>
            <p>Ảnh before / after là ảnh gốc từ Lake beauty. Chúng mình không dùng ảnh stock hoặc chỉnh sửa làm sai lệch kết quả.</p>
          </header>

          <ResultsExplorer cases={resultCases} />

          <ResultsGallery items={resultGallery} />
        </section>

        <section className="process section" id="quy-trinh">
          <header className="section-header">
            <div>
              <p className="eyebrow">
                <span />
                03 / Quy trình
              </p>
              <h2>
                Mỗi liệu trình
                <br />
                <em>bắt đầu từ lắng nghe.</em>
              </h2>
            </div>
            <p>Quy trình 5 bước áp dụng cho mọi liệu trình tại Lake beauty, từ buổi tư vấn đầu tiên đến theo dõi sau chăm sóc.</p>
          </header>

          <div className="process-grid">
            {process.map((step, index) => (
              <Reveal key={step.id} delay={index * 0.06}>
                <article>
                  <span>{step.id}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="experience">
          <div className="experience-copy">
            <p className="eyebrow">
              <span />
              04 / Không gian thực tế
            </p>
            <h2>
              Một không gian
              <br />
              <em>để thở chậm.</em>
            </h2>
            <p>Ảnh chụp trực tiếp tại phòng chăm sóc của Lake beauty — không dùng ảnh minh hoạ hay ảnh stock.</p>
            <a className="text-link" href={brand.messengerUrl} target="_blank" rel="noreferrer">
              Xem Facebook <span aria-hidden="true">↗</span>
            </a>
          </div>
          <FacilityFilmstrip photos={facilityPhotos} />
        </section>

        <section className="testimonials section">
          <header className="section-header">
            <div>
              <p className="eyebrow">
                <span />
                05 / Customer stories
              </p>
              <h2>
                Cảm nhận
                <br />
                <em>từ khách hàng.</em>
              </h2>
            </div>
            <p>Feedback được khách hàng chia sẻ công khai trên Facebook, giữ nguyên nội dung.</p>
          </header>

          <Testimonials items={testimonials} />
        </section>

        <section className="about section" id="ve-chung-toi">
          <div className="about-sign">
            <p className="eyebrow">
              <span />
              06 / Về chúng tôi
            </p>
            <span aria-hidden="true">L</span>
          </div>
          <div>
            <h2>
              Không chỉ cải thiện
              <br />
              <em>làn da.</em>
            </h2>
            <p className="about-copy">
              Lake beauty là địa chỉ chăm sóc và điều trị da tại Buôn Hồ, đồng hành cùng chuyên viên {brand.specialist}.
              Dịch vụ tập trung vào chăm sóc da, điều trị mụn — sẹo — nám chuyên sâu, triệt lông và tư vấn riêng theo
              từng tình trạng da thực tế.
            </p>
            <a className="text-link" href={brand.messengerUrl} target="_blank" rel="noreferrer">
              Tìm hiểu thêm <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="faq section">
          <header className="section-header">
            <div>
              <p className="eyebrow">
                <span />
                07 / FAQ
              </p>
              <h2>
                Điều bạn cần
                <br />
                <em>biết trước khi ghé.</em>
              </h2>
            </div>
            <p>Thông tin được trả lời từ các kênh liên hệ đã xác nhận của Lake beauty.</p>
          </header>

          <Faq items={[...bookingFaq, ...faqs]} />
        </section>

        <section className="final-cta" id="visit">
          <div>
            <p className="eyebrow">
              <span />
              Ready when you are
            </p>
            <h2>
              Sẵn sàng cho
              <br />
              <em>làn da tốt hơn?</em>
            </h2>
            <p>Đặt lịch tư vấn để trao đổi về tình trạng da và lựa chọn phù hợp.</p>
            <a className="button button-dark" href={brand.messengerUrl} target="_blank" rel="noreferrer">
              Đặt lịch tư vấn <span aria-hidden="true">↗</span>
            </a>
          </div>
          <aside>
            <span>Lake beauty</span>
            <strong>Buôn Hồ</strong>
            <small>{brand.address}</small>
            <a className="final-cta-phone" href={`tel:${brand.phone.replace(/\s+/g, "")}`}>
              {brand.phone}
            </a>
          </aside>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#top">
          <span className="brand-mark">L</span>
          <span>
            <strong>Lake</strong> beauty
          </span>
        </a>
        <p>{brand.description}</p>
        <div className="footer-links">
          <a href={brand.messengerUrl} target="_blank" rel="noreferrer">
            Facebook ↗
          </a>
          <a href={`tel:${brand.phone.replace(/\s+/g, "")}`}>{brand.phone}</a>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </>
  );
}

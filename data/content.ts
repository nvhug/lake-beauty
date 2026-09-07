export const services = [
  {
    id: "01",
    title: "Chăm sóc da",
    description: "Làm sạch sâu, nặn mụn đúng kỹ thuật và phục hồi nền da theo tình trạng thực tế.",
  },
  {
    id: "02",
    title: "Điều trị chuyên sâu",
    description: "Mụn, sẹo rỗ, sẹo lồi, nám - tàn nhang và da tổn thương do corticoid.",
  },
  {
    id: "03",
    title: "Triệt lông",
    description: "Triệt lông nách, tay, chân theo liệu trình hoặc từng buổi lẻ.",
  },
  {
    id: "04",
    title: "Tư vấn riêng",
    description: "Trao đổi 1:1 về tình trạng da trước khi chọn hướng chăm sóc phù hợp.",
  },
] as const;

export const process = [
  { id: "01", title: "Tư vấn", description: "Hiểu điều bạn đang cần." },
  { id: "02", title: "Phân tích", description: "Nhìn đúng tình trạng da." },
  { id: "03", title: "Cá nhân hóa", description: "Chọn hướng chăm sóc phù hợp." },
  { id: "04", title: "Thực hiện", description: "Chăm sóc trong không gian riêng tư." },
  { id: "05", title: "Theo dõi", description: "Đồng hành cùng tiến trình." },
] as const;

/** Case ảnh cho slider tương tác — kéo để so sánh trước / sau. */
export const resultCases = [
  {
    id: "01",
    before: "/images/results/case-02-before.webp",
    after: "/images/results/case-02-after.webp",
    condition: "Nám - tàn nhang",
    treatment: null,
    duration: null,
  },
  {
    id: "02",
    before: "/images/results/case-03-before.webp",
    after: "/images/results/case-03-after.webp",
    condition: "Da nhạy cảm, viêm đỏ",
    treatment: null,
    duration: null,
  },
  {
    id: "03",
    before: "/images/results/case-04-before.webp",
    after: "/images/results/case-04-after.webp",
    condition: "Nám - sạm da",
    treatment: null,
    duration: null,
  },
  {
    id: "04",
    before: "/images/results/case-01-before.webp",
    after: "/images/results/case-01-after.webp",
    condition: "Mụn & lỗ chân lông",
    treatment: null,
    duration: null,
  },
] as const;

/** Ảnh gallery tĩnh (before/after đã ghép sẵn) cho bố cục biên tập bên dưới slider. */
export const resultGallery = [
  { id: "05", image: "/images/results/gallery-03.webp", condition: "Nám - tàn nhang", treatment: "Meso, laser tàn nhang, bắn nám mảng" },
  { id: "06", image: "/images/results/gallery-01.webp", condition: "Da nhạy cảm, viêm đỏ", treatment: null },
  { id: "07", image: "/images/results/gallery-04.webp", condition: "Sẹo & thâm vùng mắt", treatment: null },
  { id: "08", image: "/images/results/gallery-02.webp", condition: "Mụn & da không đều màu", treatment: null },
] as const;

/** Ảnh không gian trị liệu thực tế. */
export const facilityPhotos = Array.from({ length: 7 }, (_, index) => ({
  id: String(index + 1).padStart(2, "0"),
  image: `/images/facility/room-${String(index + 1).padStart(2, "0")}.webp`,
})) as readonly { id: string; image: string }[];

export const testimonials = [
  {
    quote:
      "Trộm vía, 3 tháng theo hướng chăm da khoa học ở đây da mình sáng dần đều. Mụn giờ có lên cũng chỉ 1-2 cái, không còn nổi cả mặt như trước.",
    source: "Chị Ngọc Thuỳ",
    image: null,
  },
  {
    quote: "Da của em sau 8 tháng điều trị theo phác đồ của chị Hồ Thủy, giờ đã đẹp và khoẻ hơn nhiều.",
    source: "Chị Lý",
    image: null,
  },
] as const;

export const faqs = [
  {
    question: "Lake beauty có những dịch vụ gì?",
    answer:
      "Chăm sóc da, điều trị chuyên sâu (mụn, sẹo rỗ, sẹo lồi, nám - tàn nhang, da tổn thương do corticoid), triệt lông và tư vấn da riêng.",
  },
  {
    question: "Lake beauty ở đâu?",
    answer: "16 Nguyễn Đình Chiểu, Buôn Hồ, Đắk Lắk.",
  },
] as const;

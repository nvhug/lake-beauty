export const brand = {
  name: "Lake beauty",
  specialist: "Hồ Thụy",
  location: "Buôn Hồ, Đắk Lắk",
  address: "16 Nguyễn Đình Chiểu, Buôn Hồ, Đắk Lắk",
  messengerUrl: "https://www.facebook.com/lakebeauty47",
  phone: null,
  openingHours: null,
  description: "Chăm sóc và điều trị da cùng chuyên viên Hồ Thụy tại Buôn Hồ.",
} as const;

export const navigation = [
  { label: "Dịch vụ", href: "#dich-vu" },
  { label: "Kết quả", href: "#ket-qua" },
  { label: "Quy trình", href: "#quy-trinh" },
  { label: "Về chúng tôi", href: "#ve-chung-toi" },
] as const;

/**
 * Ảnh chân dung cho hero. Chỉ dùng ảnh Lake beauty sở hữu hoặc có quyền sử dụng.
 * Ảnh nên chụp chính diện, mặt ở giữa khung. Đặt file trong public/images/hero/.
 * Để src = null thì hero chạy thuần lưới điểm, không có ảnh.
 */
export const heroPortrait: {
  src: string | null;
  alt: string;
  zoom: number;
  offset: [number, number];
  opacity: number;
} = {
  src: null,
  alt: "Chân dung minh hoạ cho lưới phân tích da",
  zoom: 1.2,
  offset: [0, 0],
  opacity: 0.62,
};

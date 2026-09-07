import type { Metadata } from "next";
import { Manrope, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const sans = Manrope({ subsets: ["latin", "vietnamese"], variable: "--font-sans" });
const serif = Bodoni_Moda({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Lake beauty | Chăm sóc da tại Buôn Hồ",
  description: "Lake beauty tại Buôn Hồ - chăm sóc và điều trị da cùng chuyên viên Hồ Thụy.",
  openGraph: {
    title: "Lake beauty | Chăm sóc da tại Buôn Hồ",
    description: "Chăm sóc và điều trị da cùng chuyên viên Hồ Thụy tại Buôn Hồ.",
    type: "website",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" className={`${sans.variable} ${serif.variable}`}><body>{children}</body></html>;
}
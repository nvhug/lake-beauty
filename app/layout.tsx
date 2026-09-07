import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Lake beauty | Chăm sóc da tại Buôn Hồ",
  description: "Lake beauty tại Buôn Hồ - chăm sóc và điều trị da cùng chuyên viên Hồ Thủy.",
  openGraph: {
    title: "Lake beauty | Chăm sóc da tại Buôn Hồ",
    description: "Chăm sóc và điều trị da cùng chuyên viên Hồ Thủy tại Buôn Hồ.",
    type: "website",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" className={sans.variable}><body>{children}</body></html>;
}
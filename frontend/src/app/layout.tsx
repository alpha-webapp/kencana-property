import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatingButton from "@/components/layout/WhatsAppFloatingButton";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kencana Property - Properti Terpercaya di Yogyakarta",
  description:
    "Temukan rumah, tanah, villa, kos, dan properti impian Anda di Yogyakarta. Platform properti terpercaya untuk beli, sewa, dan jual properti.",
  keywords: [
    "properti yogyakarta",
    "rumah dijual jogja",
    "tanah dijual sleman",
    "kos jogja",
    "villa jogja",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonatePopup from "@/components/DonatePopup";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
  openGraph: {
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    images: [{ url: siteConfig.portraitImage }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <DonatePopup />
      </body>
    </html>
  );
}

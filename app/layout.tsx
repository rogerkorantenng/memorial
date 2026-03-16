import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonatePopup from "@/components/DonatePopup";
import FloatingParticles from "@/components/FloatingParticles";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        <FloatingParticles />
        <Header />
        <main>{children}</main>
        <Footer />
        <DonatePopup />
      </body>
    </html>
  );
}

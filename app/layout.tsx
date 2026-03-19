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
  metadataBase: new URL("https://stanakai.vercel.app"),
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
  openGraph: {
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    type: "website",
    url: "https://stanakai.vercel.app",
    images: [
      {
        url: "/portrait.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    images: ["/portrait.jpg"],
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
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <Footer />
          <DonatePopup />
        </div>
      </body>
    </html>
  );
}

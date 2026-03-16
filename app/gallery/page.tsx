import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: `Gallery — ${siteConfig.siteTitle}`,
  description: `Photos and videos in memory of ${siteConfig.name}`,
  openGraph: {
    title: `Gallery — ${siteConfig.siteTitle}`,
    description: `Photos and videos in memory of ${siteConfig.name}`,
    images: [{ url: siteConfig.portraitImage }],
  },
};

export default function GalleryPage() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-content mx-auto">
        <div className="ornamental-heading mb-10">
          <h1>Gallery</h1>
          <div className="section-divider">
            <span className="text-gold/40 text-xs">✦</span>
          </div>
          <p className="subtitle-text">Cherished moments and memories</p>
        </div>
        <GalleryGrid />
      </div>
    </section>
  );
}

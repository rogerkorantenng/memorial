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
    <section className="py-12 sm:py-16 px-4 pt-32">
      <div className="max-w-content mx-auto">
        <div className="section-heading mb-12">
          <h1>Gallery</h1>
          <div className="divider"><span>✦</span></div>
          <p className="subtitle">Cherished moments and memories</p>
        </div>
        <GalleryGrid />
      </div>
    </section>
  );
}

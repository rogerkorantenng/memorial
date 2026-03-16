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
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-content mx-auto">
        <h1 className="font-serif text-2xl sm:text-3xl text-text-primary uppercase tracking-[3px] mb-2 text-center">
          Gallery
        </h1>
        <p className="text-text-body text-sm text-center mb-10">
          Cherished moments and memories
        </p>
        <GalleryGrid />
      </div>
    </section>
  );
}

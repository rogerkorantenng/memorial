import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import GuestbookList from "@/components/GuestbookList";

export const metadata: Metadata = {
  title: `Guestbook — ${siteConfig.siteTitle}`,
  description: `Share your memories and condolences for ${siteConfig.name}`,
  openGraph: {
    title: `Guestbook — ${siteConfig.siteTitle}`,
    description: `Share your memories and condolences for ${siteConfig.name}`,
    images: [{ url: siteConfig.portraitImage }],
  },
};

export default function GuestbookPage() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="ornamental-heading mb-10">
          <h1>Guestbook</h1>
          <div className="section-divider">
            <span className="text-gold/40 text-xs">✦</span>
          </div>
          <p className="subtitle-text">Share your memories, stories, and condolences</p>
        </div>
        <GuestbookList />
      </div>
    </section>
  );
}

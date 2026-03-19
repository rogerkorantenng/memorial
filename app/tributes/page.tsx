import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import GuestbookList from "@/components/GuestbookList";

export const metadata: Metadata = {
  title: `Tributes — ${siteConfig.siteTitle}`,
  description: `Share your tributes and memories of ${siteConfig.name}`,
  openGraph: {
    title: `Tributes — ${siteConfig.siteTitle}`,
    description: `Share your tributes and memories of ${siteConfig.name}`,
    images: [{ url: siteConfig.portraitImage }],
  },
};

export default function TributesPage() {
  return (
    <section className="py-12 sm:py-16 px-4 pt-32">
      <div className="max-w-2xl mx-auto">
        <div className="section-heading mb-12">
          <h1>Tributes</h1>
          <div className="divider"><span>✦</span></div>
          <p className="subtitle">Share your memories and tributes</p>
        </div>
        <GuestbookList />
      </div>
    </section>
  );
}

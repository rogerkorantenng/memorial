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
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-2xl sm:text-3xl text-text-primary uppercase tracking-[3px] mb-2 text-center">
          Guestbook
        </h1>
        <p className="text-text-body text-sm text-center mb-10">
          Share your memories, stories, and condolences
        </p>
        <GuestbookList />
      </div>
    </section>
  );
}

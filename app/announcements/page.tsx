import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import AnnouncementsList from "@/components/AnnouncementsList";

export const metadata: Metadata = {
  title: `Announcements — ${siteConfig.siteTitle}`,
  description: `Funeral notices and updates for ${siteConfig.name}`,
  openGraph: {
    title: `Announcements — ${siteConfig.siteTitle}`,
    description: `Funeral notices and updates for ${siteConfig.name}`,
    images: [{ url: siteConfig.portraitImage }],
  },
};

export default function AnnouncementsPage() {
  return (
    <section className="py-12 sm:py-16 px-4 pt-32">
      <div className="max-w-2xl mx-auto">
        <div className="section-heading mb-12">
          <h1>Announcements</h1>
          <div className="divider"><span>✦</span></div>
          <p className="subtitle">Funeral notices and updates</p>
        </div>
        <AnnouncementsList />
      </div>
    </section>
  );
}

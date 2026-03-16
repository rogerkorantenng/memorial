import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { events } from "@/data/events";
import EventCard from "@/components/EventCard";

export const metadata: Metadata = {
  title: `Events — ${siteConfig.siteTitle}`,
  description: `Memorial events and services for ${siteConfig.name}`,
  openGraph: {
    title: `Events — ${siteConfig.siteTitle}`,
    description: `Memorial events and services for ${siteConfig.name}`,
    images: [{ url: siteConfig.portraitImage }],
  },
};

export default function EventsPage() {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="ornamental-heading mb-10">
          <h1>Events</h1>
          <div className="section-divider">
            <span className="text-gold/40 text-xs">✦</span>
          </div>
          <p className="subtitle-text">Memorial services and gatherings</p>
        </div>
        <div className="space-y-4">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

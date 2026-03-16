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
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-2xl sm:text-3xl text-text-primary uppercase tracking-[3px] mb-2 text-center">
          Events
        </h1>
        <p className="text-text-body text-sm text-center mb-10">
          Memorial services and gatherings
        </p>
        <div className="space-y-4">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

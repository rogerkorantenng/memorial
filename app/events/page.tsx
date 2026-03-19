import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { events } from "@/data/events";
import EventCard from "@/components/EventCard";
import RsvpForm from "@/components/RsvpForm";

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
    <section className="py-12 sm:py-16 px-4 pt-32">
      <div className="max-w-2xl mx-auto">
        <div className="section-heading mb-12">
          <h1>Events</h1>
          <div className="divider"><span>✦</span></div>
          <p className="subtitle">Memorial services and gatherings</p>
        </div>

        <div className="space-y-4 mb-12">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* RSVP Section */}
        <div className="section-heading mb-10">
          <h2>RSVP</h2>
          <div className="divider"><span>✦</span></div>
          <p className="subtitle">Let us know you are coming</p>
        </div>

        <RsvpForm />
      </div>
    </section>
  );
}

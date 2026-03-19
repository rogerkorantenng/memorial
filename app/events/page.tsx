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

        {/* Map Section */}
        <div className="section-heading mb-6">
          <h2>Location</h2>
          <div className="divider"><span>✝</span></div>
          <p className="subtitle">Find your way to the venue</p>
        </div>

        <div className="glass-card overflow-hidden mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127066.69734050518!2d-0.2630578!3d5.6037168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2s!4v1710000000000"
            className="w-full h-64 sm:h-80 border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Event Location"
          />
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

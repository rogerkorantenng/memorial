import Link from "next/link";
import Hero from "@/components/Hero";
import Biography from "@/components/Biography";
import GalleryCarousel from "@/components/GalleryCarousel";
import GuestbookPreview from "@/components/GuestbookPreview";
import EventCard from "@/components/EventCard";
import RsvpForm from "@/components/RsvpForm";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { events } from "@/data/events";

export const revalidate = 60;

export default function Home() {
  const now = new Date();
  const upcomingEvent = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <>
      <Hero />
      <Biography />
      <GalleryCarousel />
      <GuestbookPreview />

      {upcomingEvent && (
        <ScrollFadeIn>
          <section className="py-12 sm:py-16 px-4">
            <div className="max-w-content mx-auto">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-gold/70 text-xs font-sans uppercase tracking-[4px] mb-2">Upcoming</p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-text-bright tracking-wider">Events</h2>
                </div>
                <Link href="/events" className="view-all-link">
                  View All
                </Link>
              </div>
              <EventCard event={upcomingEvent} />
            </div>
          </section>
        </ScrollFadeIn>
      )}

      {/* RSVP */}
      <ScrollFadeIn>
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-content mx-auto max-w-2xl">
            <div className="section-heading mb-6">
              <h2>RSVP</h2>
              <div className="divider"><span>✝</span></div>
              <p className="subtitle">Let us know you are coming</p>
            </div>
            <RsvpForm />
          </div>
        </section>
      </ScrollFadeIn>

      {/* Map — last section */}
      <ScrollFadeIn>
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-content mx-auto">
            <div className="section-heading mb-6">
              <h2>Location</h2>
              <div className="divider"><span>✝</span></div>
              <p className="subtitle">Find your way to the venue</p>
            </div>
            <div className="glass-card overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=Wegbe+Kpalime,+Volta+Region,+Ghana&output=embed"
                className="w-full h-64 sm:h-80 border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location"
              />
            </div>
          </div>
        </section>
      </ScrollFadeIn>
    </>
  );
}

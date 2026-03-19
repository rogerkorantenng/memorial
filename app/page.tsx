import Link from "next/link";
import Hero from "@/components/Hero";
import Biography from "@/components/Biography";
import GalleryCarousel from "@/components/GalleryCarousel";
import GuestbookPreview from "@/components/GuestbookPreview";
import EventCard from "@/components/EventCard";
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
                  <p className="text-gold/40 text-[10px] font-sans uppercase tracking-[4px] mb-2">Upcoming</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127066.69734050518!2d-0.2630578!3d5.6037168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2s!4v1710000000000"
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

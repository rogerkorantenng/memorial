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
    </>
  );
}

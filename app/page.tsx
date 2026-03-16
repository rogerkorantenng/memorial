import Link from "next/link";
import Hero from "@/components/Hero";
import Biography from "@/components/Biography";
import GalleryCarousel from "@/components/GalleryCarousel";
import GuestbookPreview from "@/components/GuestbookPreview";
import EventCard from "@/components/EventCard";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { events } from "@/data/events";

// Revalidate guestbook preview data every 60 seconds
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
          <section className="py-12 sm:py-16 px-4 border-t border-bg-subtle">
            <div className="max-w-content mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="section-label">Upcoming Events</h2>
                <Link href="/events" className="view-all-link">
                  View All →
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

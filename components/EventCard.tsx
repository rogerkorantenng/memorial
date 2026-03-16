import { MemorialEvent } from "@/data/events";

interface EventCardProps {
  event: MemorialEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(event.date);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();

  return (
    <div className="glass-card p-6 sm:p-8 flex gap-6 items-start">
      {/* Date badge */}
      <div className="text-center min-w-[70px] py-3 rounded-xl bg-bg-deep/50 border border-gold/8">
        <div className="text-gold/60 text-[10px] uppercase tracking-[3px] mb-1">{month}</div>
        <div className="text-3xl font-serif font-light text-text-bright leading-none">{day}</div>
      </div>

      <div className="flex-1">
        <h3 className="font-serif text-lg text-text-bright font-light mb-3">{event.name}</h3>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-text-body text-xs">
            <svg className="w-3.5 h-3.5 text-gold/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-text-body text-xs">
            <svg className="w-3.5 h-3.5 text-gold/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}, {event.address}</span>
          </div>
        </div>

        {event.dressCode && (
          <span className="inline-block text-[10px] tracking-[2px] uppercase px-3 py-1 rounded-full border border-gold/10 text-gold/60">
            {event.dressCode}
          </span>
        )}

        {event.description && (
          <p className="text-text-muted text-xs mt-3 leading-relaxed">{event.description}</p>
        )}
      </div>
    </div>
  );
}

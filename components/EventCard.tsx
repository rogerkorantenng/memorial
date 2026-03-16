import { MemorialEvent } from "@/data/events";

interface EventCardProps {
  event: MemorialEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(event.date);
  const day = date.getDate();
  const month = date
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const year = date.getFullYear();

  return (
    <div className="bg-bg-card/60 rounded-xl p-5 sm:p-6 flex gap-5 items-start card-glow">
      {/* Calendar badge */}
      <div className="text-center min-w-[60px] bg-bg-primary/50 rounded-lg py-3 px-2 border border-gold/10">
        <div className="text-gold/70 text-[10px] uppercase tracking-wider mb-0.5">{month}</div>
        <div className="text-2xl font-semibold text-text-primary leading-none">{day}</div>
        <div className="text-text-muted text-[10px] mt-0.5">{year}</div>
      </div>

      <div className="flex-1">
        <h3 className="text-text-primary font-serif font-medium text-base mb-2">
          {event.name}
        </h3>
        <div className="flex items-center gap-1.5 text-text-body text-xs mb-1">
          <svg className="w-3.5 h-3.5 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-1.5 text-text-body text-xs mb-1">
          <svg className="w-3.5 h-3.5 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}, {event.address}</span>
        </div>
        {event.dressCode && (
          <div className="inline-flex items-center gap-1.5 mt-2 bg-bg-primary/50 rounded-full px-3 py-1 text-[11px]">
            <span className="text-gold/60">Dress code:</span>
            <span className="text-text-primary">{event.dressCode}</span>
          </div>
        )}
        {event.description && (
          <p className="text-text-body/80 text-xs mt-3 leading-relaxed">{event.description}</p>
        )}
      </div>
    </div>
  );
}

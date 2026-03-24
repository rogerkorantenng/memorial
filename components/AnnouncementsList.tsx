import { events } from "@/data/events";

export default function AnnouncementsList() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="glass-card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-serif text-xl text-text-bright font-light">{event.name}</h3>
            {event.dressCode && (
              <span className="text-xs tracking-[2px] uppercase px-2 py-0.5 rounded-full border border-gold/20 text-gold/60 flex-shrink-0">
                {event.dressCode}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-text-muted text-xs uppercase tracking-[2px] mb-4">
            <span>{formatDate(event.date)}</span>
            <span>{event.time}</span>
          </div>
          <div className="space-y-2">
            <p className="text-text-body text-sm">
              <span className="text-gold/60">Location:</span> {event.location}
            </p>
            <p className="text-text-body text-sm">
              <span className="text-gold/60">Address:</span> {event.address}
            </p>
            {event.description && (
              <p className="text-text-body text-base leading-relaxed mt-3">{event.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

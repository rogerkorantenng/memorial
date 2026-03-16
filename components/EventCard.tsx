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

  return (
    <div className="bg-bg-card rounded-lg p-4 sm:p-5 flex gap-4 items-start">
      <div className="text-center min-w-[50px]">
        <div className="text-2xl font-semibold text-text-primary">{day}</div>
        <div className="text-xs text-text-body">{month}</div>
      </div>
      <div className="border-l border-bg-subtle pl-4">
        <h3 className="text-text-primary font-medium text-sm mb-1">
          {event.name}
        </h3>
        <p className="text-text-body text-xs mb-0.5">
          {event.time} &middot; {event.location}, {event.address}
        </p>
        {event.dressCode && (
          <p className="text-text-muted text-xs">
            Dress code: {event.dressCode}
          </p>
        )}
        {event.description && (
          <p className="text-text-body text-xs mt-2">{event.description}</p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  pinned: boolean;
}

export default function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/announcements");
        const data = await res.json();
        setAnnouncements(data.announcements || []);
      } catch {
        console.error("Failed to fetch announcements");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block w-5 h-5 border border-gold/20 border-t-gold/60 rounded-full animate-spin mb-4" />
        <p className="text-text-muted text-xs tracking-wider uppercase">Loading announcements</p>
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 bg-gold/10" />
          <span className="text-gold/20 text-sm">✦</span>
          <div className="h-px w-8 bg-gold/10" />
        </div>
        <p className="text-text-muted text-sm font-serif italic">No announcements yet. Check back for updates.</p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {announcements.map((a) => (
        <div key={a.id} className="glass-card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-serif text-lg text-text-bright font-light">{a.title}</h3>
            {a.pinned && (
              <span className="text-[9px] tracking-[2px] uppercase px-2 py-0.5 rounded-full border border-gold/20 text-gold/60 flex-shrink-0">
                Pinned
              </span>
            )}
          </div>
          <p className="text-text-muted text-[10px] uppercase tracking-[2px] mb-4">{formatDate(a.date)}</p>
          <p className="text-text-body text-sm leading-relaxed whitespace-pre-line">{a.content}</p>
        </div>
      ))}
    </div>
  );
}

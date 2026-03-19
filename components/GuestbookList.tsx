"use client";

import { useState, useEffect, useCallback } from "react";
import GuestbookForm from "@/components/GuestbookForm";
import { timeAgo } from "@/lib/utils";

interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  message: string;
  personal_experience: string | null;
  image_url: string | null;
  created_at: string;
}

export default function GuestbookList() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchEntries = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/guestbook?page=${pageNum}&limit=${limit}`);
      const data = await res.json();
      setEntries(data.entries || []);
      setTotal(data.total || 0);
    } catch {
      console.error("Failed to fetch guestbook entries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries(page);
  }, [page, fetchEntries]);

  const totalPages = Math.ceil(total / limit);

  const handleEntryAdded = (entry: GuestbookEntry) => {
    setEntries((prev) => [entry, ...prev.slice(0, limit - 1)]);
    setTotal((prev) => prev + 1);
  };

  return (
    <>
      <GuestbookForm onEntryAdded={handleEntryAdded} />

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block w-5 h-5 border border-gold/20 border-t-gold/60 rounded-full animate-spin mb-4" />
          <p className="text-text-muted text-xs tracking-wider uppercase">Loading messages</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/10" />
            <span className="text-gold/20 text-sm">✦</span>
            <div className="h-px w-8 bg-gold/10" />
          </div>
          <p className="text-text-muted text-sm font-serif italic">No messages yet. Be the first to leave one.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="glass-card p-6">
                <div className="flex gap-4">
                  <div className="initial-avatar mt-0.5">
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <span className="text-gold font-medium tracking-wide">{entry.name}</span>
                      <span className="text-text-muted/30">&middot;</span>
                      <span className="text-text-muted tracking-wider uppercase">{entry.relationship}</span>
                      <span className="text-text-muted/30">&middot;</span>
                      <span className="text-text-muted">{timeAgo(entry.created_at)}</span>
                    </div>
                    <p className="font-serif text-base text-text-primary italic leading-relaxed mb-2">
                      &ldquo;{entry.message}&rdquo;
                    </p>
                    {entry.personal_experience && (
                      <div className="mt-3 pt-3 border-t border-gold/5">
                        <p className="text-xs text-gold/40 uppercase tracking-[2px] mb-1">Personal Experience</p>
                        <p className="text-text-body text-sm leading-relaxed">{entry.personal_experience}</p>
                      </div>
                    )}
                  </div>
                </div>
                {entry.image_url && (
                  <div className="mt-4 rounded-xl overflow-hidden">
                    <img src={entry.image_url} alt={`Photo shared by ${entry.name}`} className="w-full h-48 object-cover rounded-xl" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-xs tracking-[2px] uppercase px-5 py-2 border border-gold/10 text-text-muted rounded-full disabled:opacity-20 hover:border-gold/30 hover:text-gold transition-all duration-300"
              >
                Previous
              </button>
              <span className="text-text-muted/40 text-xs font-sans">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-xs tracking-[2px] uppercase px-5 py-2 border border-gold/10 text-text-muted rounded-full disabled:opacity-20 hover:border-gold/30 hover:text-gold transition-all duration-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import GuestbookForm from "@/components/GuestbookForm";
import { timeAgo } from "@/lib/utils";

interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  message: string;
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
        <div className="text-text-muted text-sm text-center py-12">
          <div className="inline-block w-5 h-5 border-2 border-gold/30 border-t-gold/70 rounded-full animate-spin mb-3" />
          <p>Loading messages...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-text-muted text-sm text-center py-12">
          <p className="text-gold/40 text-2xl mb-2">🕊</p>
          <p>No messages yet. Be the first to leave one.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-bg-card/60 rounded-xl p-5 card-glow flex gap-4"
              >
                <div className="initial-avatar mt-1">
                  {entry.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/85 text-sm leading-relaxed mb-2">
                    &ldquo;{entry.message}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gold/70 font-medium">{entry.name}</span>
                    <span className="text-text-muted">&middot;</span>
                    <span className="text-text-muted">{entry.relationship}</span>
                    <span className="text-text-muted">&middot;</span>
                    <span className="text-text-muted">{timeAgo(entry.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm rounded-lg bg-bg-card border border-bg-subtle text-text-body disabled:opacity-30 hover:border-gold/30 transition-all"
              >
                Previous
              </button>
              <span className="text-text-muted text-sm px-2">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm rounded-lg bg-bg-card border border-bg-subtle text-text-body disabled:opacity-30 hover:border-gold/30 transition-all"
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

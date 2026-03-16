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
        <div className="text-text-muted text-sm text-center py-8">Loading messages...</div>
      ) : entries.length === 0 ? (
        <div className="text-text-muted text-sm text-center py-8">No messages yet. Be the first to leave one.</div>
      ) : (
        <>
          <div className="space-y-3">
            {entries.map((entry) => (
              <div key={entry.id} className="bg-bg-card rounded-lg p-4 border-l-[3px] border-accent">
                <p className="text-white/90 text-sm mb-2">&ldquo;{entry.message}&rdquo;</p>
                <p className="text-text-muted text-xs">
                  — {entry.name} &middot; {entry.relationship} &middot; {timeAgo(entry.created_at)}
                </p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-sm rounded bg-bg-subtle text-text-body disabled:opacity-30 hover:bg-bg-card transition-colors"
              >
                Previous
              </button>
              <span className="text-text-muted text-sm">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm rounded bg-bg-subtle text-text-body disabled:opacity-30 hover:bg-bg-card transition-colors"
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

"use client";

import { useState, useEffect } from "react";

interface RsvpEntry {
  id: string;
  full_name: string;
  phone: string | null;
  number_attending: number;
  message: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [totalAttending, setTotalAttending] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/rsvp?password=${encodeURIComponent(password)}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Unauthorized");
      }
      const data = await res.json();
      setEntries(data.entries || []);
      setTotalAttending(data.totalAttending || 0);
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Full Name", "Phone", "Number Attending", "Notes", "Date"];
    const rows = entries.map((e) => [
      e.full_name,
      e.phone || "",
      e.number_attending.toString(),
      (e.message || "").replace(/,/g, ";"),
      new Date(e.created_at).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvp-list-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 sm:p-10 max-w-sm w-full">
          <div className="text-center mb-8">
            <span className="text-gold/20 text-2xl">✝</span>
            <h1 className="font-serif text-xl text-text-bright font-light tracking-wider mt-4">
              Admin Access
            </h1>
            <p className="text-text-muted text-xs mt-2">Enter password to view RSVPs</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-bg-deep/50 border border-bg-subtle/50 rounded-xl px-4 py-3 text-text-primary text-sm font-sans focus:outline-none focus:border-gold/30 transition-colors duration-300 placeholder:text-text-muted/40 mb-4"
              required
            />
            {error && <p className="text-red-400/80 text-xs mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-[11px] tracking-[2px] uppercase px-8 py-3 bg-accent/80 text-white rounded-full hover:bg-accent transition-all duration-300 disabled:opacity-40 cursor-pointer"
            >
              {loading ? "Verifying..." : "View RSVPs"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="py-12 sm:py-16 px-4 pt-28">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl text-text-bright font-light tracking-wider">
              RSVP List
            </h1>
            <p className="text-text-muted text-xs mt-1">
              {entries.length} {entries.length === 1 ? "reservation" : "reservations"} &middot; {totalAttending} {totalAttending === 1 ? "person" : "people"} attending
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="text-[10px] tracking-[2px] uppercase px-5 py-2 border border-gold/15 text-gold/60 rounded-full hover:border-gold/30 hover:text-gold/80 transition-all duration-300 cursor-pointer"
          >
            Export CSV
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="glass-card p-10 text-center">
            <p className="text-text-muted text-sm font-serif italic">No RSVPs yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, i) => (
              <div key={entry.id} className="glass-card p-5 flex items-start gap-5">
                <div className="text-center min-w-[36px]">
                  <span className="text-gold/40 text-lg font-serif">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-text-bright text-sm font-medium">{entry.full_name}</h3>
                    <span className="text-[9px] tracking-[2px] uppercase px-2 py-0.5 rounded-full border border-gold/10 text-gold/50">
                      {entry.number_attending} {entry.number_attending === 1 ? "person" : "people"}
                    </span>
                  </div>
                  {entry.phone && (
                    <p className="text-text-body text-xs mt-1">
                      <a href={`tel:${entry.phone}`} className="hover:text-gold/70 transition-colors cursor-pointer">{entry.phone}</a>
                    </p>
                  )}
                  {entry.message && (
                    <p className="text-text-muted text-xs mt-2 italic">{entry.message}</p>
                  )}
                  <p className="text-text-muted/40 text-[10px] mt-2">{formatDate(entry.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary card */}
        <div className="glass-card p-6 mt-8 text-center">
          <div className="flex items-center justify-center gap-8">
            <div>
              <p className="text-2xl font-serif text-text-bright font-light">{entries.length}</p>
              <p className="text-text-muted text-[10px] uppercase tracking-[2px] mt-1">Reservations</p>
            </div>
            <div className="h-8 w-px bg-gold/10" />
            <div>
              <p className="text-2xl font-serif text-text-bright font-light">{totalAttending}</p>
              <p className="text-text-muted text-[10px] uppercase tracking-[2px] mt-1">Total People</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

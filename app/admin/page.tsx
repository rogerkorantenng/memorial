"use client";

import { useState } from "react";

interface RsvpEntry {
  id: string;
  full_name: string;
  phone: string | null;
  number_attending: number;
  message: string | null;
  created_at: string;
}

interface TributeEntry {
  id: string;
  name: string;
  relationship: string;
  message: string;
  personal_experience: string | null;
  image_url: string | null;
  created_at: string;
}

type Tab = "overview" | "rsvp" | "tributes";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [rsvpEntries, setRsvpEntries] = useState<RsvpEntry[]>([]);
  const [tributeEntries, setTributeEntries] = useState<TributeEntry[]>([]);
  const [totalAttending, setTotalAttending] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedRsvp, setSelectedRsvp] = useState<RsvpEntry | null>(null);
  const [selectedTribute, setSelectedTribute] = useState<TributeEntry | null>(null);
  const [storedPassword, setStoredPassword] = useState("");

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
      setRsvpEntries(data.rsvpEntries || []);
      setTributeEntries(data.tributeEntries || []);
      setTotalAttending(data.totalAttending || 0);
      setStoredPassword(password);
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = (type: "rsvp" | "tributes") => {
    if (type === "rsvp") {
      const headers = ["Full Name", "Phone", "Number Attending", "Notes", "Date"];
      const rows = rsvpEntries.map((e) => [
        e.full_name,
        e.phone || "",
        e.number_attending.toString(),
        (e.message || "").replace(/"/g, '""'),
        new Date(e.created_at).toLocaleDateString(),
      ]);
      downloadCSV([headers, ...rows], `rsvp-list-${new Date().toISOString().split("T")[0]}.csv`);
    } else {
      const headers = ["Name", "Relationship", "Tribute", "Personal Experience", "Image", "Date"];
      const rows = tributeEntries.map((e) => [
        e.name,
        e.relationship,
        (e.message || "").replace(/"/g, '""'),
        (e.personal_experience || "").replace(/"/g, '""'),
        e.image_url || "",
        new Date(e.created_at).toLocaleDateString(),
      ]);
      downloadCSV([headers, ...rows], `tributes-${new Date().toISOString().split("T")[0]}.csv`);
    }
  };

  const downloadCSV = (data: string[][], filename: string) => {
    const csv = data.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  // Login screen
  if (!authenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 sm:p-10 max-w-sm w-full">
          <div className="text-center mb-8">
            <span className="text-gold/20 text-2xl">✝</span>
            <h1 className="font-serif text-xl text-text-bright font-light tracking-wider mt-4">Admin Access</h1>
            <p className="text-text-muted text-xs mt-2">Enter password to view dashboard</p>
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
            <button type="submit" disabled={loading} className="w-full text-[11px] tracking-[2px] uppercase px-8 py-3 bg-accent/80 text-white rounded-full hover:bg-accent transition-all duration-300 disabled:opacity-40 cursor-pointer">
              {loading ? "Verifying..." : "Enter Dashboard"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  // RSVP detail modal
  if (selectedRsvp) {
    return (
      <section className="py-12 sm:py-16 px-4 pt-28">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setSelectedRsvp(null)} className="text-gold/50 text-[10px] uppercase tracking-[2px] mb-6 hover:text-gold/80 transition-colors cursor-pointer">← Back to list</button>
          <div className="glass-card p-8">
            <h2 className="font-serif text-2xl text-text-bright font-light tracking-wider mb-6">{selectedRsvp.full_name}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-text-muted text-[10px] uppercase tracking-[2px] mb-1">Phone</p>
                <p className="text-text-body text-sm">{selectedRsvp.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-text-muted text-[10px] uppercase tracking-[2px] mb-1">Number Attending</p>
                <p className="text-text-bright text-2xl font-serif font-light">{selectedRsvp.number_attending}</p>
              </div>
              <div>
                <p className="text-text-muted text-[10px] uppercase tracking-[2px] mb-1">Additional Notes</p>
                <p className="text-text-body text-sm italic">{selectedRsvp.message || "None"}</p>
              </div>
              <div>
                <p className="text-text-muted text-[10px] uppercase tracking-[2px] mb-1">Submitted</p>
                <p className="text-text-body text-sm">{formatDate(selectedRsvp.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Tribute detail modal
  if (selectedTribute) {
    return (
      <section className="py-12 sm:py-16 px-4 pt-28">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setSelectedTribute(null)} className="text-gold/50 text-[10px] uppercase tracking-[2px] mb-6 hover:text-gold/80 transition-colors cursor-pointer">← Back to list</button>
          <div className="glass-card p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="initial-avatar w-12 h-12 text-lg">{selectedTribute.name.charAt(0).toUpperCase()}</div>
              <div>
                <h2 className="font-serif text-xl text-text-bright font-light">{selectedTribute.name}</h2>
                <p className="text-text-muted text-xs">{selectedTribute.relationship}</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <p className="text-text-muted text-[10px] uppercase tracking-[2px] mb-2">Tribute Message</p>
                <p className="text-text-body text-sm leading-relaxed italic">&ldquo;{selectedTribute.message}&rdquo;</p>
              </div>
              {selectedTribute.personal_experience && (
                <div>
                  <p className="text-text-muted text-[10px] uppercase tracking-[2px] mb-2">Personal Experience</p>
                  <p className="text-text-body text-sm leading-relaxed">{selectedTribute.personal_experience}</p>
                </div>
              )}
              {selectedTribute.image_url && (
                <div>
                  <p className="text-text-muted text-[10px] uppercase tracking-[2px] mb-2">Photo</p>
                  <img src={selectedTribute.image_url} alt={`Shared by ${selectedTribute.name}`} className="w-full rounded-xl max-h-80 object-cover" />
                </div>
              )}
              <div>
                <p className="text-text-muted text-[10px] uppercase tracking-[2px] mb-1">Submitted</p>
                <p className="text-text-body text-sm">{formatDate(selectedTribute.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Dashboard
  return (
    <section className="py-12 sm:py-16 px-4 pt-28">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-2xl text-text-bright font-light tracking-wider mb-8">Admin Dashboard</h1>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <p className="text-3xl font-serif text-text-bright font-light">{totalAttending}</p>
            <p className="text-text-muted text-[9px] uppercase tracking-[2px] mt-1">People Attending</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-3xl font-serif text-text-bright font-light">{rsvpEntries.length}</p>
            <p className="text-text-muted text-[9px] uppercase tracking-[2px] mt-1">Reservations</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-3xl font-serif text-text-bright font-light">{tributeEntries.length}</p>
            <p className="text-text-muted text-[9px] uppercase tracking-[2px] mt-1">Tributes</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-bg-card/50 rounded-full p-1 w-fit">
          {(["overview", "rsvp", "tributes"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] tracking-[2px] uppercase px-5 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-gold/15 text-gold"
                  : "text-text-muted hover:text-text-body"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-text-body text-xs uppercase tracking-[2px]">Recent RSVPs</h3>
                <button onClick={() => setActiveTab("rsvp")} className="text-gold/50 text-[10px] tracking-[1px] hover:text-gold/80 cursor-pointer">View all →</button>
              </div>
              {rsvpEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="glass-card p-4 mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-text-bright text-sm">{entry.full_name}</p>
                    <p className="text-text-muted text-[10px]">{entry.number_attending} attending &middot; {formatDate(entry.created_at)}</p>
                  </div>
                  <button onClick={() => setSelectedRsvp(entry)} className="text-gold/40 text-[10px] tracking-[2px] uppercase hover:text-gold/70 cursor-pointer">View</button>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-text-body text-xs uppercase tracking-[2px]">Recent Tributes</h3>
                <button onClick={() => setActiveTab("tributes")} className="text-gold/50 text-[10px] tracking-[1px] hover:text-gold/80 cursor-pointer">View all →</button>
              </div>
              {tributeEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="glass-card p-4 mb-2 flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-text-bright text-sm">{entry.name} <span className="text-text-muted text-[10px]">({entry.relationship})</span></p>
                    <p className="text-text-muted text-[10px] truncate">{entry.message}</p>
                  </div>
                  <button onClick={() => setSelectedTribute(entry)} className="text-gold/40 text-[10px] tracking-[2px] uppercase hover:text-gold/70 cursor-pointer flex-shrink-0">View</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RSVP tab */}
        {activeTab === "rsvp" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-xs">{rsvpEntries.length} reservations &middot; {totalAttending} people</p>
              <button onClick={() => exportCSV("rsvp")} className="text-[10px] tracking-[2px] uppercase px-4 py-1.5 border border-gold/10 text-gold/50 rounded-full hover:border-gold/25 hover:text-gold/70 transition-all cursor-pointer">Export CSV</button>
            </div>
            {rsvpEntries.length === 0 ? (
              <div className="glass-card p-10 text-center">
                <p className="text-text-muted text-sm font-serif italic">No RSVPs yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {rsvpEntries.map((entry, i) => (
                  <div key={entry.id} className="glass-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-gold/30 text-sm font-serif min-w-[24px] text-center">{i + 1}</span>
                      <div>
                        <p className="text-text-bright text-sm">{entry.full_name}</p>
                        <p className="text-text-muted text-[10px]">
                          {entry.number_attending} {entry.number_attending === 1 ? "person" : "people"} &middot; {entry.phone || "No phone"} &middot; {formatDate(entry.created_at)}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedRsvp(entry)} className="text-gold/40 text-[10px] tracking-[2px] uppercase hover:text-gold/70 cursor-pointer">View</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tributes tab */}
        {activeTab === "tributes" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-xs">{tributeEntries.length} tributes</p>
              <button onClick={() => exportCSV("tributes")} className="text-[10px] tracking-[2px] uppercase px-4 py-1.5 border border-gold/10 text-gold/50 rounded-full hover:border-gold/25 hover:text-gold/70 transition-all cursor-pointer">Export CSV</button>
            </div>
            {tributeEntries.length === 0 ? (
              <div className="glass-card p-10 text-center">
                <p className="text-text-muted text-sm font-serif italic">No tributes yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tributeEntries.map((entry) => (
                  <div key={entry.id} className="glass-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
                      <div className="initial-avatar flex-shrink-0">{entry.name.charAt(0).toUpperCase()}</div>
                      <div className="min-w-0">
                        <p className="text-text-bright text-sm">{entry.name} <span className="text-text-muted text-[10px]">({entry.relationship})</span></p>
                        <p className="text-text-muted text-[10px] truncate">{entry.message}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedTribute(entry)} className="text-gold/40 text-[10px] tracking-[2px] uppercase hover:text-gold/70 cursor-pointer flex-shrink-0">View</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

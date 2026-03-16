"use client";

import { useState, FormEvent } from "react";

interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  message: string;
  created_at: string;
}

interface GuestbookFormProps {
  onEntryAdded: (entry: GuestbookEntry) => void;
}

const RELATIONSHIPS = ["Family", "Friend", "Colleague", "Community", "Other"];

export default function GuestbookForm({ onEntryAdded }: GuestbookFormProps) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Family");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, relationship, message, honeypot }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await res.json();
      if (data.entry) {
        onEntryAdded(data.entry);
      }

      setName("");
      setMessage("");
      setRelationship("Family");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-bg-card rounded-lg p-6 mb-8">
      <h3 className="font-serif text-text-primary text-lg mb-4">
        Leave a Message
      </h3>

      {/* Honeypot — hidden from humans */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-text-body text-sm mb-1">
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-bg-primary border border-bg-subtle rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="relationship" className="block text-text-body text-sm mb-1">
            Relationship
          </label>
          <select
            id="relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="w-full bg-bg-primary border border-bg-subtle rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
          >
            {RELATIONSHIPS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-text-body text-sm mb-1">
            Your Message *
          </label>
          <textarea
            id="message"
            required
            maxLength={2000}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-bg-primary border border-bg-subtle rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors resize-vertical"
            placeholder="Share a memory, story, or condolence..."
          />
          <p className="text-text-muted text-xs mt-1">
            {message.length}/2000 characters
          </p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-accent text-sm">Thank you for your message.</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent text-white px-6 py-2 rounded text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Message"}
        </button>
      </div>
    </form>
  );
}

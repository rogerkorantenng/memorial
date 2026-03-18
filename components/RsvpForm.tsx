"use client";

import { useState, FormEvent } from "react";

export default function RsvpForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberAttending, setNumberAttending] = useState("1");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          number_attending: numberAttending,
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setFullName("");
      setPhone("");
      setNumberAttending("1");
      setMessage("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-bg-deep/50 border border-bg-subtle/50 rounded-xl px-4 py-3 text-text-primary text-sm font-sans focus:outline-none focus:border-gold/30 transition-colors duration-300 placeholder:text-text-muted/40";

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="rsvp-name" className="block text-text-muted text-[10px] uppercase tracking-[2px] mb-2">
            Full Name *
          </label>
          <input
            id="rsvp-name"
            type="text"
            required
            maxLength={100}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClass}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="rsvp-phone" className="block text-text-muted text-[10px] uppercase tracking-[2px] mb-2">
            Phone Number
          </label>
          <input
            id="rsvp-phone"
            type="tel"
            maxLength={20}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="Your phone number"
          />
        </div>

        <div>
          <label htmlFor="rsvp-count" className="block text-text-muted text-[10px] uppercase tracking-[2px] mb-2">
            Number Attending *
          </label>
          <select
            id="rsvp-count"
            value={numberAttending}
            onChange={(e) => setNumberAttending(e.target.value)}
            className={inputClass}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rsvp-message" className="block text-text-muted text-[10px] uppercase tracking-[2px] mb-2">
            Additional Notes
          </label>
          <textarea
            id="rsvp-message"
            maxLength={500}
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="Any additional information..."
          />
        </div>

        {error && <p className="text-red-400/80 text-xs">{error}</p>}
        {success && (
          <div className="glass-card p-4 text-center border border-accent/20">
            <p className="text-gold/70 text-sm font-serif italic mb-1">Thank you for your RSVP!</p>
            <p className="text-text-muted text-xs">We look forward to seeing you.</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="text-[11px] tracking-[2px] uppercase px-8 py-3 bg-accent/80 text-white rounded-full hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 disabled:opacity-40"
        >
          {isSubmitting ? "Sending..." : "Confirm RSVP"}
        </button>
      </div>
    </form>
  );
}

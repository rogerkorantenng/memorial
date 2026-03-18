"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  message: string;
  personal_experience: string | null;
  image_url: string | null;
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
  const [personalExperience, setPersonalExperience] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showDonatePopup, setShowDonatePopup] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          relationship,
          message,
          personal_experience: personalExperience,
          image_url: imageUrl,
          honeypot,
        }),
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
      setPersonalExperience("");
      setImageUrl("");
      setRelationship("Family");
      setSuccess(true);

      if (!sessionStorage.getItem("donateAfterGuestbook")) {
        sessionStorage.setItem("donateAfterGuestbook", "true");
        setTimeout(() => {
          setShowDonatePopup(true);
          setSuccess(false);
        }, 1500);
      } else {
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-bg-deep/50 border border-bg-subtle/50 rounded-xl px-4 py-3 text-text-primary text-sm font-sans focus:outline-none focus:border-gold/30 transition-colors duration-300 placeholder:text-text-muted/40";

  return (
    <>
      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 mb-10">
        <h3 className="font-serif text-xl text-text-bright font-light tracking-wider mb-6">
          Leave a Tribute
        </h3>

        <div className="hidden" aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-text-muted text-[10px] uppercase tracking-[2px] mb-2">
              Full Name *
            </label>
            <input id="name" type="text" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Enter your full name" />
          </div>

          <div>
            <label htmlFor="relationship" className="block text-text-muted text-[10px] uppercase tracking-[2px] mb-2">
              Relationship to {siteConfig.name}
            </label>
            <select id="relationship" value={relationship} onChange={(e) => setRelationship(e.target.value)} className={inputClass}>
              {RELATIONSHIPS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-text-muted text-[10px] uppercase tracking-[2px] mb-2">
              Tribute Message *
            </label>
            <textarea id="message" required maxLength={2000} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass} resize-none`} placeholder="Share a tribute message..." />
            <p className="text-text-muted/30 text-[10px] mt-2 text-right tracking-wider">
              {message.length} / 2000
            </p>
          </div>

          <div>
            <label htmlFor="experience" className="block text-text-muted text-[10px] uppercase tracking-[2px] mb-2">
              Personal Experience
            </label>
            <textarea id="experience" maxLength={2000} rows={3} value={personalExperience} onChange={(e) => setPersonalExperience(e.target.value)} className={`${inputClass} resize-none`} placeholder="Share a personal experience or memory with him..." />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-text-muted text-[10px] uppercase tracking-[2px] mb-2">
              Photo URL (optional)
            </label>
            <input id="imageUrl" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputClass} placeholder="Paste a link to a photo with him" />
            <p className="text-text-muted/30 text-[10px] mt-2 tracking-wider">
              Upload your photo to Google Drive or Imgur and paste the link here
            </p>
          </div>

          {error && <p className="text-red-400/80 text-xs">{error}</p>}
          {success && (
            <p className="text-gold/70 text-xs font-serif italic">Thank you for your beautiful tribute.</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-[11px] tracking-[2px] uppercase px-8 py-3 bg-accent/80 text-white rounded-full hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 disabled:opacity-40"
          >
            {isSubmitting ? "Sending..." : "Submit Tribute"}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showDonatePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
            onClick={() => setShowDonatePopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="glass-card gold-border-animated p-10 max-w-md w-full text-center relative z-[101]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDonatePopup(false)}
                className="absolute top-4 right-4 text-text-muted/40 hover:text-text-body transition-colors"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold/15" />
                <span className="text-gold/30 text-xs">✦</span>
                <div className="h-px w-8 bg-gold/15" />
              </div>

              <h3 className="font-serif text-2xl text-text-bright font-light tracking-wider mb-3">
                Thank You
              </h3>
              <p className="text-text-body text-sm leading-relaxed mb-8">
                Your tribute means so much to the family. If you&apos;d like to support them further, every contribution helps.
              </p>
              <a
                href={siteConfig.paystackLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] tracking-[2px] uppercase px-8 py-3 bg-accent/80 text-white rounded-full hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
              >
                Donate to the Family
              </a>
              <button
                onClick={() => setShowDonatePopup(false)}
                className="block mx-auto mt-4 text-text-muted/40 text-[10px] uppercase tracking-[2px] hover:text-text-muted transition-colors"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

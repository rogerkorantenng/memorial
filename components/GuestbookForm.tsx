"use client";

import { useState, useRef, FormEvent } from "react";
import Image from "next/image";
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      // Upload image first if provided
      let uploadedImageUrl: string | null = null;
      if (imageFile) {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) {
          const uploadData = await uploadRes.json();
          throw new Error(uploadData.error || "Image upload failed");
        }
        const uploadData = await uploadRes.json();
        uploadedImageUrl = uploadData.url;
        setUploadingImage(false);
      }

      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          relationship,
          message,
          personal_experience: personalExperience,
          image_url: uploadedImageUrl,
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
      setImageFile(null);
      setImagePreview(null);
      setRelationship("Family");
      setSuccess(true);
      sessionStorage.setItem("tributeSubmitted", "true");

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
    "w-full bg-bg-deep/50 border border-bg-subtle/50 rounded-xl px-4 py-3 text-text-primary text-base font-sans focus:outline-none focus:border-gold/30 transition-colors duration-300 placeholder:text-text-muted/40";

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
            <label htmlFor="name" className="block text-text-muted text-xs uppercase tracking-[2px] mb-2">
              Full Name *
            </label>
            <input id="name" type="text" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Enter your full name" />
          </div>

          <div>
            <label htmlFor="relationship" className="block text-text-muted text-xs uppercase tracking-[2px] mb-2">
              Relationship to {siteConfig.name}
            </label>
            <select id="relationship" value={relationship} onChange={(e) => setRelationship(e.target.value)} className={inputClass}>
              {RELATIONSHIPS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-text-muted text-xs uppercase tracking-[2px] mb-2">
              Tribute Message *
            </label>
            <textarea id="message" required maxLength={2000} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass} resize-none`} placeholder="Share a tribute message..." />
            <p className="text-text-muted/30 text-xs mt-2 text-right tracking-wider">
              {message.length} / 2000
            </p>
          </div>

          <div>
            <label htmlFor="experience" className="block text-text-muted text-xs uppercase tracking-[2px] mb-2">
              Personal Experience
            </label>
            <textarea id="experience" maxLength={2000} rows={3} value={personalExperience} onChange={(e) => setPersonalExperience(e.target.value)} className={`${inputClass} resize-none`} placeholder="Share a personal experience or memory with him..." />
          </div>

          <div>
            <label className="block text-text-muted text-xs uppercase tracking-[2px] mb-2">
              Upload a Photo (optional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 5 * 1024 * 1024) {
                    setError("Image must be less than 5MB");
                    return;
                  }
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                  setError("");
                }
              }}
            />
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden">
                <Image src={imagePreview} alt="Preview" width={400} height={250} className="w-full h-48 object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`${inputClass} flex items-center justify-center gap-3 cursor-pointer hover:border-gold/30 py-8`}
              >
                <svg className="w-5 h-5 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-text-muted/50 text-sm">Click to upload a photo with him</span>
              </button>
            )}
            <p className="text-text-muted/30 text-xs mt-2 tracking-wider">
              JPEG, PNG, WebP or GIF &middot; Max 5MB
            </p>
          </div>

          {error && <p className="text-red-400/80 text-xs">{error}</p>}
          {success && (
            <p className="text-gold/70 text-xs font-serif italic">Thank you for your beautiful tribute.</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-sm tracking-[2px] uppercase px-8 py-3 bg-accent/80 text-white rounded-full hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 disabled:opacity-40"
          >
            {isSubmitting ? (uploadingImage ? "Uploading image..." : "Sending...") : "Submit Tribute"}
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
                className="inline-block text-sm tracking-[2px] uppercase px-8 py-3 bg-accent/80 text-white rounded-full hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
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

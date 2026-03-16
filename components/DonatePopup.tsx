"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    __guestbookTimerStarted?: boolean;
  }
}

export default function DonatePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__guestbookTimerStarted) return;
    if (sessionStorage.getItem("guestbookPopupShown")) return;

    window.__guestbookTimerStarted = true;

    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("guestbookPopupShown")) {
        setIsVisible(true);
        sessionStorage.setItem("guestbookPopupShown", "true");
      }
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsVisible(false);

  const handleGoToGuestbook = () => {
    setIsVisible(false);
    router.push("/guestbook");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="glass-card gold-border-animated p-10 max-w-md w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
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
              Share a Memory
            </h3>
            <p className="text-text-body text-sm leading-relaxed mb-8">
              Leave a message for the family — a memory, a story, or words of comfort. Your words mean the world.
            </p>
            <button
              onClick={handleGoToGuestbook}
              className="inline-block text-[11px] tracking-[2px] uppercase px-8 py-3 bg-accent/80 text-white rounded-full hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
            >
              Write a Message
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

declare global {
  interface Window {
    __donateTimerStarted?: boolean;
  }
}

export default function DonatePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__donateTimerStarted) return;
    if (sessionStorage.getItem("donatePopupShown")) return;

    window.__donateTimerStarted = true;

    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("donatePopupShown")) {
        setIsVisible(true);
        sessionStorage.setItem("donatePopupShown", "true");
      }
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-bg-card border border-bg-subtle rounded-lg p-8 max-w-md w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-text-muted hover:text-text-body transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-4 text-4xl">🕊️</div>
            <h3 className="font-serif text-text-primary text-xl mb-2">
              Support the Family
            </h3>
            <p className="text-text-body text-sm mb-6">
              Every contribution helps during this difficult time. Your generosity is deeply appreciated.
            </p>
            <a
              href={siteConfig.paystackLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white px-8 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
            >
              Donate Now
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

declare global {
  interface Window {
    __popupTimerStarted?: boolean;
  }
}

type PopupType = "tribute" | "donate" | null;

export default function DonatePopup() {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__popupTimerStarted) return;

    window.__popupTimerStarted = true;

    const timer = setTimeout(() => {
      const hasWrittenTribute = sessionStorage.getItem("tributeSubmitted");
      const tributePopupShown = sessionStorage.getItem("tributePopupShown");
      const donatePopupShown = sessionStorage.getItem("donatePopupShown");
      const isOnTributesPage = window.location.pathname === "/tributes";

      // Show tribute popup if: not on tributes page, hasn't written one, hasn't seen this popup
      if (!isOnTributesPage && !hasWrittenTribute && !tributePopupShown) {
        setActivePopup("tribute");
        sessionStorage.setItem("tributePopupShown", "true");
      }
      // Otherwise show donate popup if hasn't seen it
      else if (!donatePopupShown) {
        setActivePopup("donate");
        sessionStorage.setItem("donatePopupShown", "true");
      }
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setActivePopup(null);

  const handleGoToTributes = () => {
    setActivePopup(null);
    router.push("/tributes");
  };

  return (
    <AnimatePresence>
      {activePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="glass-card gold-border-animated p-10 max-w-md w-full text-center relative z-[201]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-text-muted/40 hover:text-text-body transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold/15" />
              <span className="text-gold/20 text-lg">✝</span>
              <div className="h-px w-8 bg-gold/15" />
            </div>

            {activePopup === "tribute" ? (
              <>
                <h3 className="font-serif text-2xl text-text-bright font-light tracking-wider mb-3">
                  Leave a Tribute
                </h3>
                <p className="text-text-body text-sm leading-relaxed mb-8">
                  Share a memory, story, or words of comfort for the family of {siteConfig.name}. Your words mean the world.
                </p>
                <button
                  onClick={handleGoToTributes}
                  className="inline-block text-[11px] tracking-[2px] uppercase px-8 py-3 bg-accent/80 text-white rounded-full hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 cursor-pointer"
                >
                  Write a Tribute
                </button>
              </>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-text-bright font-light tracking-wider mb-3">
                  Support the Family
                </h3>
                <p className="text-text-body text-sm leading-relaxed mb-8">
                  Every contribution helps during this difficult time. Your generosity is deeply appreciated by the family.
                </p>
                <a
                  href={siteConfig.paystackLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[11px] tracking-[2px] uppercase px-8 py-3 bg-accent/80 text-white rounded-full hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 cursor-pointer"
                >
                  Donate to the Family
                </a>
              </>
            )}

            <button
              onClick={handleClose}
              className="block mx-auto mt-4 text-text-muted/40 text-[10px] uppercase tracking-[2px] hover:text-text-muted transition-colors cursor-pointer"
            >
              Maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

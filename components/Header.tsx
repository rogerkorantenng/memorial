"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/tributes", label: "Tributes" },
    { href: "/announcements", label: "Announcements" },
    { href: "/events", label: "Events" },
    { href: "/donations", label: "Donations" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg-deep/80 backdrop-blur-xl border-b border-gold/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-text-bright text-sm tracking-[3px] uppercase font-light hover:text-gold transition-colors duration-300"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-muted text-xs tracking-[2px] uppercase hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.paystackLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[2px] uppercase px-5 py-2 border border-accent/60 text-accent hover:bg-accent hover:text-white rounded-full transition-all duration-300"
          >
            Donate
          </a>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <a
            href={siteConfig.paystackLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[2px] uppercase px-4 py-1.5 border border-accent/60 text-accent rounded-full"
          >
            Donate
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-text-muted p-1"
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1.5">
              <div className={`h-px bg-current transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <div className={`h-px bg-current transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-bg-deep/95 backdrop-blur-xl border-t border-gold/5"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block text-text-muted text-xs tracking-[2px] uppercase hover:text-gold transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

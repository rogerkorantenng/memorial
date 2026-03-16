"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-bg-primary via-bg-card to-bg-primary text-center py-20 sm:py-32 px-4 overflow-hidden"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-card to-bg-primary -z-10"
      />

      {/* Decorative top ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="flex items-center justify-center gap-4 mb-10"
      >
        <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-gold/60 text-lg">✦</span>
        <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-gold/40" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-36 h-36 sm:w-48 sm:h-48 mx-auto mb-8 rounded-full border-2 border-gold/30 overflow-hidden relative portrait-glow">
          <Image
            src={siteConfig.portraitImage}
            alt={siteConfig.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <p className="text-gold/50 text-xs uppercase tracking-[4px] mb-3">In Loving Memory Of</p>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text-primary uppercase tracking-[4px] mb-3">
          {siteConfig.name}
        </h1>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-gold/30" />
          <p className="text-text-body text-sm sm:text-base">
            {siteConfig.birthDate} — {siteConfig.deathDate}
          </p>
          <div className="h-px w-8 bg-gold/30" />
        </div>

        <p className="text-text-body/70 italic text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          &ldquo;{siteConfig.quote}&rdquo;
        </p>
      </motion.div>

      {/* Decorative bottom ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="flex items-center justify-center gap-4 mt-10"
      >
        <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold/30" />
        <span className="text-gold/40 text-xs">🕊</span>
        <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold/30" />
      </motion.div>
    </section>
  );
}

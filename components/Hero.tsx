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
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-primary to-bg-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(92,32,40,0.06)_0%,_transparent_60%)]" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4"
      >
        {/* Cross */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="mb-3 sm:mb-8 mt-12 sm:mt-20"
        >
          <span className="text-gold/25 text-2xl sm:text-4xl leading-none">&#10013;</span>
        </motion.div>

        {/* Sunrise label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-gold/70 text-xs sm:text-[10px] font-sans uppercase tracking-[5px] mb-3 sm:mb-8"
        >
          In Loving Memory
        </motion.p>

        {/* Portrait — large, prominent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="w-36 h-36 sm:w-56 sm:h-56 mx-auto mb-4 sm:mb-8 rounded-full overflow-hidden relative portrait-glow border-2 border-gold/15">
            <Image
              src={siteConfig.portraitImage}
              alt={siteConfig.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-text-bright uppercase tracking-[3px] sm:tracking-[6px] mb-4 sm:mb-6"
        >
          {siteConfig.name}
        </motion.h1>

        {/* Sunrise — Sunset dates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-text-body/70">
            <div className="text-center">
              <p className="text-gold/60 text-xs sm:text-[9px] uppercase tracking-[3px] mb-1">Sunrise</p>
              <p className="font-serif text-base sm:text-lg text-text-primary">{siteConfig.birthDate}</p>
            </div>
            <span className="text-gold/40 text-lg">&mdash;</span>
            <div className="text-center">
              <p className="text-gold/60 text-xs sm:text-[9px] uppercase tracking-[3px] mb-1">Sunset</p>
              <p className="font-serif text-base sm:text-lg text-text-primary">{siteConfig.deathDate}</p>
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-serif text-lg sm:text-xl italic text-text-body max-w-md mx-auto leading-relaxed font-light"
        >
          &ldquo;{siteConfig.quote}&rdquo;
        </motion.p>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-10"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-6 bg-gold/10" />
            <span className="text-gold/15 text-xs">&#10013;</span>
            <div className="h-px w-6 bg-gold/10" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-7 mx-auto rounded-full border border-gold/10 flex items-start justify-center p-1"
          >
            <div className="w-0.5 h-1.5 bg-gold/20 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

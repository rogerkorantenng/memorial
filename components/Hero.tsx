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
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-primary to-bg-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.04)_0%,_transparent_70%)]" />

      {/* Horizontal gold lines */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4"
      >
        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 border border-gold/40" />
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="text-gold/50 text-[10px] sm:text-xs font-sans uppercase tracking-[6px] mb-8"
        >
          In Loving Memory
        </motion.p>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ scale: imageScale }}
        >
          <div className="w-40 h-40 sm:w-52 sm:h-52 mx-auto mb-10 rounded-full overflow-hidden relative portrait-glow gold-border-animated">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl font-light text-text-bright uppercase tracking-[6px] sm:tracking-[10px] mb-4"
        >
          {siteConfig.name}
        </motion.h1>

        {/* Dates with gold dividers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-10 sm:w-16 bg-gold/20" />
          <p className="text-text-body/80 text-sm sm:text-base font-sans tracking-wider">
            {siteConfig.birthDate} &mdash; {siteConfig.deathDate}
          </p>
          <div className="h-px w-10 sm:w-16 bg-gold/20" />
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-serif text-lg sm:text-xl italic text-text-body/50 max-w-xl mx-auto leading-relaxed font-light"
        >
          &ldquo;{siteConfig.quote}&rdquo;
        </motion.p>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-gold/15" />
            <span className="text-gold/25 text-sm">✦</span>
            <div className="h-px w-8 bg-gold/15" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-gold/20 flex items-start justify-center p-1.5"
          >
            <div className="w-0.5 h-2 bg-gold/40 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

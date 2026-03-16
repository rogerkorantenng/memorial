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
      className="relative bg-gradient-to-b from-bg-primary to-bg-card text-center py-16 sm:py-24 px-4 overflow-hidden"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-card -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full border-[3px] border-text-primary overflow-hidden relative">
          <Image
            src={siteConfig.portraitImage}
            alt={siteConfig.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl text-text-primary uppercase tracking-[3px] mb-2">
          {siteConfig.name}
        </h1>

        <p className="text-text-body text-sm sm:text-base mb-4">
          {siteConfig.birthDate} — {siteConfig.deathDate}
        </p>

        <p className="text-text-body/80 italic text-sm sm:text-base max-w-md mx-auto">
          &ldquo;{siteConfig.quote}&rdquo;
        </p>
      </motion.div>
    </section>
  );
}

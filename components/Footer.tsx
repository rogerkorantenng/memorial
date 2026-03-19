import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="relative py-14 text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <span className="text-gold/15 text-2xl leading-none">&#10013;</span>

      <p className="font-serif text-base text-text-primary/50 font-light tracking-wider mt-4 mb-1">
        In loving memory of {siteConfig.name}
      </p>
      <p className="font-serif text-sm italic text-text-muted/30 mb-1">
        Forever in our hearts
      </p>
      <p className="font-serif text-xs text-text-muted/20 mt-1">
        Rest in perfect peace
      </p>
      <p className="text-[9px] text-text-muted/20 uppercase tracking-[3px] mt-6">
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

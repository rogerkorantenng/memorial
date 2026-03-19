import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="relative py-14 text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <span className="text-gold/15 text-2xl leading-none">&#10013;</span>

      <p className="font-serif text-lg text-text-primary font-light tracking-wider mt-4 mb-1">
        In loving memory of {siteConfig.name}
      </p>
      <p className="font-serif text-base italic text-text-muted mb-1">
        Forever in our hearts
      </p>
      <p className="font-serif text-sm text-text-muted mt-1">
        Rest in perfect peace
      </p>
      <p className="text-xs text-text-muted/20 uppercase tracking-[3px] mt-6">
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

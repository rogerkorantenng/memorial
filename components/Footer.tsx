import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="relative py-16 text-center">
      {/* Top border with gold gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="flex items-center justify-center gap-5 mb-8">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/15" />
        <div className="w-1 h-1 rotate-45 border border-gold/20" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/15" />
      </div>

      <p className="font-serif text-lg text-text-primary/60 font-light tracking-wider mb-1">
        In loving memory of {siteConfig.name}
      </p>
      <p className="font-serif text-sm italic text-text-muted/40 mb-6">
        Forever in our hearts
      </p>
      <p className="text-[10px] text-text-muted/30 uppercase tracking-[3px]">
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-bg-primary py-12 text-center">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/20" />
        <span className="text-gold/30 text-sm">✦</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/20" />
      </div>

      <p className="text-gold/40 text-lg mb-1">🕊</p>
      <p className="text-text-body text-sm font-serif">
        In loving memory of {siteConfig.name}
      </p>
      <p className="text-text-muted/60 text-xs mt-1 italic">
        Forever in our hearts
      </p>
      <p className="text-text-muted/40 text-[10px] mt-4">
        &copy; {new Date().getFullYear()} &middot; Built with love by family
      </p>
    </footer>
  );
}

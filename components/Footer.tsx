import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-bg-subtle py-8 text-center">
      <p className="text-text-body text-sm">
        In loving memory of {siteConfig.name}
      </p>
      <p className="text-text-muted text-xs mt-1">
        &copy; {new Date().getFullYear()} &middot; Built with love by family
      </p>
    </footer>
  );
}

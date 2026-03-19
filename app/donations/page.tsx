import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Donations — ${siteConfig.siteTitle}`,
  description: `Support the family of ${siteConfig.name}`,
  openGraph: {
    title: `Donations — ${siteConfig.siteTitle}`,
    description: `Support the family of ${siteConfig.name}`,
    images: [{ url: siteConfig.portraitImage }],
  },
};

export default function DonationsPage() {
  return (
    <section className="py-12 sm:py-16 px-4 pt-32">
      <div className="max-w-2xl mx-auto">
        <div className="section-heading mb-12">
          <h1>Donations</h1>
          <div className="divider"><span>✦</span></div>
          <p className="subtitle">Support the family during this difficult time</p>
        </div>

        <div className="glass-card p-8 sm:p-10 text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-gold/15" />
            <span className="text-gold/30 text-xs">✦</span>
            <div className="h-px w-8 bg-gold/15" />
          </div>

          <h3 className="font-serif text-2xl text-text-bright font-light tracking-wider mb-3">
            Every Contribution Matters
          </h3>
          <p className="text-text-body text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Your generous donation will help the family of {siteConfig.name} during
            this period. No amount is too small — every contribution is deeply appreciated.
          </p>

          {/* Paystack inline embed */}
          <div className="rounded-2xl overflow-hidden border border-gold/10 bg-white">
            <iframe
              src={siteConfig.paystackLink}
              className="w-full border-0"
              style={{ height: "500px", minHeight: "500px" }}
              title="Donate via Paystack"
              allow="payment"
            />
          </div>

          <p className="text-text-muted/40 text-[10px] mt-6 tracking-wider uppercase">
            Secured by Paystack
          </p>
        </div>
      </div>
    </section>
  );
}

import { biography } from "@/data/bio";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function Biography() {
  return (
    <ScrollFadeIn>
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-content mx-auto max-w-3xl">
          <div className="ornamental-heading">
            <h2>Biography</h2>
            <div className="section-divider">
              <span className="text-gold/40 text-xs">✦</span>
            </div>
          </div>

          <div className="bg-bg-card/80 rounded-xl p-8 sm:p-10 gold-border-left relative">
            <span className="quote-mark absolute -top-2 left-6">&ldquo;</span>
            <div className="pt-4">
              {biography.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-text-body text-sm sm:text-base leading-[1.9] mb-5 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScrollFadeIn>
  );
}

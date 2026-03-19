import { biography } from "@/data/bio";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function Biography() {
  return (
    <ScrollFadeIn>
      <section className="py-12 sm:py-16 px-4 relative">
        <div className="max-w-content mx-auto">
          <div className="section-heading">
            <h2>A HERO HAS FALLEN</h2>
            <div className="divider"><span>✦</span></div>
          </div>

          <div className="max-w-3xl mx-auto glass-card p-8 sm:p-12 relative">
            {/* Decorative quote mark */}
            <span className="absolute -top-4 left-8 font-serif text-6xl text-gold/15 leading-none select-none">&ldquo;</span>

            <div className="relative">
              {biography.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-white text-base sm:text-lg leading-[1.9] mb-6 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <span className="absolute -bottom-4 right-8 font-serif text-6xl text-gold/15 leading-none select-none">&rdquo;</span>
          </div>
        </div>
      </section>
    </ScrollFadeIn>
  );
}

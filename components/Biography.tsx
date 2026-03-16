import { biography } from "@/data/bio";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function Biography() {
  return (
    <ScrollFadeIn>
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-content mx-auto">
          <h2 className="section-label mb-6">Biography</h2>
          <div className="bg-bg-card rounded-lg p-6 sm:p-8">
            {biography.map((paragraph, index) => (
              <p
                key={index}
                className="text-text-body text-sm sm:text-base leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </ScrollFadeIn>
  );
}

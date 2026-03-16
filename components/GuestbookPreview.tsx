import Link from "next/link";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { supabaseServer } from "@/lib/supabase-server";
import { timeAgo } from "@/lib/utils";

export default async function GuestbookPreview() {
  let entries: any[] = [];
  try {
    const { data } = await supabaseServer
      .from("guestbook_entries")
      .select("id, name, relationship, message, created_at")
      .order("created_at", { ascending: false })
      .limit(3);
    entries = data || [];
  } catch {
    entries = [];
  }

  if (entries.length === 0) {
    return null;
  }

  return (
    <ScrollFadeIn>
      <section className="py-16 sm:py-24 px-4 border-t border-bg-subtle/50">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="ornamental-heading text-left !mb-0">
              <h2>Guestbook</h2>
            </div>
            <Link href="/guestbook" className="view-all-link">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-bg-card/60 rounded-xl p-5 card-glow flex gap-4"
              >
                <div className="initial-avatar mt-1">
                  {entry.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/85 text-sm leading-relaxed mb-2">
                    &ldquo;{entry.message}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gold/70 font-medium">{entry.name}</span>
                    <span className="text-text-muted">&middot;</span>
                    <span className="text-text-muted">{entry.relationship}</span>
                    <span className="text-text-muted">&middot;</span>
                    <span className="text-text-muted">{timeAgo(entry.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollFadeIn>
  );
}

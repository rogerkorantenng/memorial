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
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-gold/70 text-xs font-sans uppercase tracking-[4px] mb-2">Messages</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-text-bright tracking-wider">Tributes</h2>
            </div>
            <Link href="/tributes" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {entries.map((entry) => (
              <div key={entry.id} className="glass-card p-6 flex flex-col">
                <p className="font-serif text-base text-text-primary italic leading-relaxed flex-1 mb-4">
                  &ldquo;{entry.message}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gold/5">
                  <div className="initial-avatar">
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-gold/80 text-sm font-medium tracking-wide">{entry.name}</p>
                    <p className="text-text-muted text-xs tracking-wider uppercase">
                      {entry.relationship} &middot; {timeAgo(entry.created_at)}
                    </p>
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

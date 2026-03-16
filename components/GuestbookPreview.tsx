import Link from "next/link";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { supabaseServer } from "@/lib/supabase-server";
import { timeAgo } from "@/lib/utils";

export default async function GuestbookPreview() {
  let entries: Array<{
    id: string;
    name: string;
    relationship: string;
    message: string;
    created_at: string;
  }> | null = null;

  try {
    const { data } = await supabaseServer
      .from("guestbook_entries")
      .select("id, name, relationship, message, created_at")
      .order("created_at", { ascending: false })
      .limit(3);
    entries = data;
  } catch {
    // Supabase not configured yet — skip preview
    return null;
  }

  if (!entries || entries.length === 0) {
    return null;
  }

  return (
    <ScrollFadeIn>
      <section className="py-12 sm:py-16 px-4 border-t border-bg-subtle">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-label">Guestbook</h2>
            <Link href="/guestbook" className="view-all-link">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-bg-card rounded-lg p-4 border-l-[3px] border-accent"
              >
                <p className="text-white/90 text-sm mb-2">
                  &ldquo;{entry.message}&rdquo;
                </p>
                <p className="text-text-muted text-xs">
                  — {entry.name} &middot; {entry.relationship} &middot;{" "}
                  {timeAgo(entry.created_at)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollFadeIn>
  );
}

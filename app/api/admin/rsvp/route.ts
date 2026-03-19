import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "memorial2026";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Fetch RSVPs
  const { data: rsvpData, error: rsvpError } = await supabaseServer
    .from("rsvp_entries")
    .select("id, full_name, phone, number_attending, message, created_at")
    .order("created_at", { ascending: false });

  if (rsvpError) {
    return NextResponse.json({ error: rsvpError.message }, { status: 500 });
  }

  // Fetch Tributes
  const { data: tributeData, error: tributeError } = await supabaseServer
    .from("guestbook_entries")
    .select("id, name, relationship, message, personal_experience, image_url, created_at")
    .order("created_at", { ascending: false });

  if (tributeError) {
    return NextResponse.json({ error: tributeError.message }, { status: 500 });
  }

  const totalAttending = (rsvpData || []).reduce(
    (sum, r) => sum + r.number_attending,
    0
  );

  return NextResponse.json({
    rsvpEntries: rsvpData,
    tributeEntries: tributeData,
    totalRsvp: rsvpData?.length || 0,
    totalTributes: tributeData?.length || 0,
    totalAttending,
  });
}

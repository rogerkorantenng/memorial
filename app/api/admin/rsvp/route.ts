import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "memorial2026";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const { data, error } = await supabaseServer
    .from("rsvp_entries")
    .select("id, full_name, phone, number_attending, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const totalAttending = (data || []).reduce(
    (sum, r) => sum + r.number_attending,
    0
  );

  return NextResponse.json({
    entries: data,
    total: data?.length || 0,
    totalAttending,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  const { data, error, count } = await supabaseServer
    .from("rsvp_entries")
    .select("id, full_name, number_attending, created_at", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const totalAttending = (data || []).reduce((sum, r) => sum + r.number_attending, 0);

  return NextResponse.json({
    entries: data,
    total: count,
    totalAttending,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { full_name, phone, number_attending, message } = body;

  const trimmedName = (full_name || "").trim();
  if (!trimmedName) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (trimmedName.length > 100) {
    return NextResponse.json({ error: "Name must be 100 characters or less" }, { status: 400 });
  }

  const numAttending = parseInt(number_attending, 10) || 1;
  if (numAttending < 1 || numAttending > 20) {
    return NextResponse.json({ error: "Number attending must be between 1 and 20" }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("rsvp_entries")
    .insert({
      full_name: trimmedName,
      phone: (phone || "").trim() || null,
      number_attending: numAttending,
      message: (message || "").trim() || null,
    })
    .select("id, full_name, number_attending, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry: data }, { status: 201 });
}

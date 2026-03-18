import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

const ALLOWED_RELATIONSHIPS = [
  "Family",
  "Friend",
  "Colleague",
  "Community",
  "Other",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabaseServer
    .from("guestbook_entries")
    .select("id, name, relationship, message, personal_experience, image_url, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    entries: data,
    total: count,
    page,
    limit,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, relationship, message, honeypot } = body;

  // Honeypot check — bots fill hidden fields
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  const trimmedName = (name || "").trim();
  const trimmedMessage = (message || "").trim();
  const trimmedRelationship = (relationship || "").trim();

  if (!trimmedName || !trimmedMessage) {
    return NextResponse.json(
      { error: "Name and message are required" },
      { status: 400 }
    );
  }

  if (trimmedName.length > 100) {
    return NextResponse.json(
      { error: "Name must be 100 characters or less" },
      { status: 400 }
    );
  }

  if (trimmedMessage.length > 2000) {
    return NextResponse.json(
      { error: "Message must be 2000 characters or less" },
      { status: 400 }
    );
  }

  if (!ALLOWED_RELATIONSHIPS.includes(trimmedRelationship)) {
    return NextResponse.json(
      { error: "Invalid relationship type" },
      { status: 400 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { count: recentCount } = await supabaseServer
    .from("guestbook_entries")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", oneHourAgo);

  if (recentCount !== null && recentCount >= 5) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  // Insert entry
  const { data, error } = await supabaseServer
    .from("guestbook_entries")
    .insert({
      name: trimmedName,
      relationship: trimmedRelationship,
      message: trimmedMessage,
      personal_experience: (body.personal_experience || "").trim() || null,
      image_url: body.image_url || null,
      ip_address: ip,
    })
    .select("id, name, relationship, message, personal_experience, image_url, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry: data }, { status: 201 });
}

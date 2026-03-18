import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
      { status: 400 }
    );
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Image must be less than 5MB" },
      { status: 400 }
    );
  }

  // Generate unique filename
  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `tributes/${filename}`;

  // Convert to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Ensure bucket exists
  const BUCKET = "memorial-images";
  const { data: buckets } = await supabaseServer.storage.listBuckets();
  const bucketExists = buckets?.some((b) => b.name === BUCKET);
  if (!bucketExists) {
    await supabaseServer.storage.createBucket(BUCKET, {
      public: true,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
      fileSizeLimit: 5 * 1024 * 1024,
    });
  }

  // Upload to Supabase Storage
  const { error: uploadError } = await supabaseServer.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message },
      { status: 500 }
    );
  }

  // Get public URL
  const { data: urlData } = supabaseServer.storage
    .from(BUCKET)
    .getPublicUrl(path);

  return NextResponse.json({ url: urlData.publicUrl }, { status: 201 });
}

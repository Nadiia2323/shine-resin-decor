import { NextResponse } from "next/server";
import { addProductImages } from "@/lib/products";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { ProductImage } from "@/types";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const productId = Number.parseInt(id, 10);

  if (!Number.isFinite(productId) || productId <= 0) {
    return NextResponse.json(
      { error: `Invalid productId param: "${id}"` },
      { status: 400 },
    );
  }

  const body = await req.json().catch(() => null);
  const images = body?.images;

  if (!Array.isArray(images)) {
    return NextResponse.json(
      { error: "Invalid body: images must be an array" },
      { status: 400 },
    );
  }

  const result = await addProductImages(productId, images);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("product_images")
    .select("id,url,public_id,position,is_main")
    .eq("product_id", productId)
    .order("position", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    images: (data ?? []) as ProductImage[],
    result,
  });
}

import { NextResponse } from "next/server";
import { deleteProductImage } from "@/lib/products";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type RouteContext = {
  params: Promise<{ id: string; imageId: string }>;
};

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { id, imageId } = await params;

  const productId = Number(id);

  if (!Number.isFinite(productId) || productId <= 0) {
    return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
  }

  try {
    await deleteProductImage(productId, imageId);
    const supabase = await createSupabaseServerClient();
    const { data: images, error } = await supabase
      .from("product_images")
      .select("id,url,public_id,position,is_main")
      .eq("product_id", productId)
      .order("is_main", { ascending: false })
      .order("position", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ images: images ?? [] });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Delete failed" },
      { status: 500 },
    );
  }
}

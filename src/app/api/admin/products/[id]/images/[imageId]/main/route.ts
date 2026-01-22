import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type Params = { id: string; imageId: string };

export async function PATCH(_req: Request, ctx: { params: Promise<Params> }) {
  const { id, imageId } = await ctx.params;

  const productId = Number(id);
  const imageIdNum = Number(imageId);

  if (!Number.isFinite(productId) || !Number.isFinite(imageIdNum)) {
    return NextResponse.json({ error: "Bad params" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();

  
  const { error: unsetError } = await supabase
    .from("product_images")
    .update({ is_main: false })
    .eq("product_id", productId);

  if (unsetError) {
    return NextResponse.json({ error: unsetError.message }, { status: 500 });
  }

  
  const { data, error: setError } = await supabase
    .from("product_images")
    .update({ is_main: true })
    .eq("product_id", productId)
    .eq("id", imageIdNum) 
    .select("id, is_main")
    .maybeSingle();

  if (setError) {
    return NextResponse.json({ error: setError.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json(
      { error: "Image not found for this product" },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true });
}

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

  const { error: setError } = await supabase
    .from("product_images")
    .update({ is_main: true })
    .eq("product_id", productId)
    .eq("id", imageIdNum);

  if (setError) {
    return NextResponse.json({ error: setError.message }, { status: 500 });
  }

  const { data: images, error: listError } = await supabase
    .from("product_images")
    .select("id,url,public_id,position,is_main")
    .eq("product_id", productId)
    .order("is_main", { ascending: false })
    .order("position", { ascending: true });

  if (listError) {
    return NextResponse.json({ error: listError.message }, { status: 500 });
  }

  return NextResponse.json({ images: images ?? [] });
}

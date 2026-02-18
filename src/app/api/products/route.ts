import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 50);
  const offset = Number(searchParams.get("offset") ?? 0);
  const category = searchParams.get("category");

  const supabase = await createSupabaseServerClient();

  const from = offset;
  const to = offset + limit - 1;

  let query = supabase
    .from("products")
    .select(
      `
        *,
        product_images (
          url,
          is_main,
          position
        )
      `,
    )
    .order("created_at", { ascending: false })
    .order("is_main", { referencedTable: "product_images", ascending: false })
    .order("position", { referencedTable: "product_images", ascending: true });

  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  const { data, error } = await query.range(from, to);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const nextOffset = (data?.length ?? 0) === limit ? offset + limit : null;

  return NextResponse.json({ items: data ?? [], nextOffset });
}

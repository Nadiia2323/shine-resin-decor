import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import NotFound from "@/app/shop/[id]/not-found";
import AdminEditClient from "./AdminEditClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditPage({ params }: PageProps) {
  const { id } = await params;

  const productId = Number(id);
  if (!Number.isFinite(productId)) NotFound();

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: product, error: productError } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (id,url,public_id,position,is_main)
    `,
    )
    .eq("id", productId)
    .order("is_main", { referencedTable: "product_images", ascending: false })
    .order("position", { referencedTable: "product_images", ascending: true })
    .single();

  if (productError) {
    return <p className="text-red-600">Admin error: {productError.message}</p>;
  }

  if (!product) NotFound();

  const { data: products, error } = await supabase
    .from("products")
    .select("category")
    .order("name", { ascending: true });

  if (error) {
    return <p className="text-red-600">Admin error: {error.message}</p>;
  }

  const categories = Array.from(
    new Set((products ?? []).flatMap((p) => (p.category ? [p.category] : []))),
  );

  return (
    <AdminEditClient
      product={product}
      categories={categories}
      productId={productId}
      initialImages={product.product_images ?? []}
    />
  );
}

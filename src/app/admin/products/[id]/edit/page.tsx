import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import NotFound from "@/app/shop/[id]/not-found";
import AdminEditClient from "./AdminEditClient";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AdminEditPage({ params }: PageProps) {
  const { id } = params;

  const productId = Number(id);
  if (!Number.isFinite(productId)) NotFound();

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (!product) NotFound();

  const { data: products, error } = await supabase
    .from("products")
    .select("category")
    .order("name", { ascending: true });

  if (error) {
    return <p className="text-red-600">Admin error: {error.message}</p>;
  }

  const categories = Array.from(
    new Set((products ?? []).flatMap((p) => (p.category ? [p.category] : [])))
  );

  const { data: images } = await supabase
    .from("product_images")
    .select("id,url,public_id,position")
    .eq("product_id", productId)
    .order("position");

  return (
    <AdminEditClient
      product={product}
      categories={categories}
      productId={productId}
      initialImages={images ?? []}
    />
  );
}

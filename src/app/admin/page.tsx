import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log("user :>> ", user);

  if (userError) {
    console.error("auth.getUser error:", userError.message);
  }

  if (!user) redirect("/login");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("profiles select error:", profileError.message);
    redirect("/");
  }

  if (!profile || profile.role !== "admin") redirect("/");

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return <p className="text-red-600">Admin error: {error.message}</p>;
  }
  const categories = Array.from(
    new Set(products.flatMap((p) => (p.category ? [p.category] : []))),
  );

  const ids = (products ?? []).map((p) => p.id);

  const { data: imgs } = await supabase
    .from("product_images")
    .select("*")
    .in("product_id", ids)
    .order("position", { ascending: true });

  const imagesByProductId = new Map<number, typeof imgs>();
  for (const img of imgs ?? []) {
    const arr = imagesByProductId.get(img.product_id) ?? [];
    arr.push(img);
    imagesByProductId.set(img.product_id, arr);
  }

  const productsWithImages = (products ?? []).map((p) => ({
    ...p,
    product_images: imagesByProductId.get(p.id) ?? [],
  }));

  return <AdminClient products={productsWithImages} categories={categories} />;
}

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
    .select("id,name,price,status,category,description,options,images")
    .order("name", { ascending: true });

  if (error) {
    return <p className="text-red-600">Admin error: {error.message}</p>;
  }
  const categories = Array.from(
    new Set(products.flatMap((p) => (p.category ? [p.category] : [])))
  );

  return <AdminClient products={products} categories={categories} />;
}

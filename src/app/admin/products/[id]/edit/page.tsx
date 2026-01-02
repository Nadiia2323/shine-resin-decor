import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import NotFound from "@/app/shop/[id]/not-found";
import AdminEditClient from "./AdminEditClient";

type Params = { id: string };

export default async function AdminEditPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (!product) {
    NotFound();
  }

  return <AdminEditClient product={product} />;
}

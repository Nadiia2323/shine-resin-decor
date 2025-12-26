"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function toggleStatus(formData: FormData) {
  const idRaw = formData.get("id");
  const statusRaw = formData.get("status");

  const id = Number(idRaw);
  const currentStatus = String(statusRaw ?? "");

  if (!id || Number.isNaN(id)) {
    throw new Error("Invalid product id");
  }

  const nextStatus =
    currentStatus === "в наявності" ? "під замовлення" : "в наявності";

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("products")
    .update({ status: nextStatus })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function updatePrice(formData: FormData) {
  const idRaw = formData.get("id");
  const priceRaw = formData.get("price");

  if (typeof idRaw !== "string" || idRaw.trim() === "") {
    throw new Error("Invalid id");
  }
  if (typeof priceRaw !== "string" || priceRaw.trim() === "") {
    throw new Error("Invalid price");
  }

  const itemId = Number(idRaw);
  const newPrice = Number(priceRaw);

  if (!Number.isInteger(itemId) || itemId <= 0) {
    throw new Error("Invalid id");
  }
  if (!Number.isFinite(newPrice) || newPrice <= 0) {
    throw new Error("Invalid price");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("products")
    .update({ price: newPrice })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
}

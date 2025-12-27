"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function toggleStatus(formData: FormData) {
  const idRaw = formData.get("id");
  const statusRaw = formData.get("status");

  const id = Number(idRaw);
  const currentStatus = String(statusRaw ?? "");

  if (!Number.isInteger(id) || id <= 0) {
  throw new Error("Invalid product id");
}


  const nextStatus =
  currentStatus === "в наявності" ? "під замовлення" : "в наявності";

  const supabase = await createSupabaseServerClient();

  const {
    data: { user } ,error: userError
  } = await supabase.auth.getUser();
  if (userError) {
    throw new Error(userError.message)
  }

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

export async function deleteProduct(formData:FormData) {
  const rowId = formData.get("id")
  const id = Number(rowId)
    if (!Number.isInteger(id) || id <= 0) {
  throw new Error("Invalid product id");
  }
  const supabase = await createSupabaseServerClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) {
    throw new Error (userError.message)
  }
  if (!user) {
    throw new Error ("Not authenticated")
  }
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
}

export async function updateCategory(formData: FormData) {
  const idRaw = formData.get("id");
  const categoryRaw = formData.get("category");

  const id = Number(idRaw);
  const newCategory = String(categoryRaw ?? "").trim();

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid product id");
  }

  if (!newCategory) {
    throw new Error("Invalid product category");
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
    .update({ category: newCategory })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
}

export async function updateName(formData:FormData) {
  const rowId = formData.get("id")
  const rowName = formData.get("name")

  const id = Number(rowId)
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid product id")
    
  }

  const newName = String(rowName ?? "").trim()
  if (!newName) {
    throw new Error ("Invalid product name")
  }
  if (newName.length > 120) {
  throw new Error("Product name is too long");
}
  const supabase = await createSupabaseServerClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) {
    throw new Error(userError.message)
  }
  if (!user) {
    throw new Error ("Not Authenticated")
  }
  const { error } = await supabase.from("products").update({ name: newName }).eq("id", id)
  if (error) {
    throw new Error(error.message)
  }
  revalidatePath("/admin")
}
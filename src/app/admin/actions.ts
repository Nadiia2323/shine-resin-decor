"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { ProductStatus } from "@/types";



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
export async function updateStatus(formData: FormData) {
  const idRaw = formData.get("id");
  const statusRaw = formData.get("status");

  if (typeof idRaw !== "string" || idRaw.trim() === "") {
    throw new Error("Invalid product id");
  }
  if (typeof statusRaw !== "string" || statusRaw.trim() === "") {
    throw new Error("Invalid status");
  }

  const id = Number(idRaw);
  const newStatus = statusRaw.trim();

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid product id");
  }

  const allowed = new Set(["в наявності", "під замовлення"]);
  if (!allowed.has(newStatus)) {
    throw new Error("Invalid status");
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
    .update({ status: newStatus })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath(`/admin/products/${id}/edit`);
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
  const idRaw = formData.get("id")
  const id = Number(idRaw)
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
  revalidatePath(`/admin/products/${id}/edit`);
}

export async function updateName(formData:FormData) {
  const idRaw = formData.get("id")
  const nameRaw = formData.get("name")

  const id = Number(idRaw)
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid product id")
    
  }

  const newName = String(nameRaw ?? "").trim()
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

export async function updateDescription(formData: FormData) {
  const idRaw = formData.get("id");
  const descriptionRaw = formData.get("description");

  const id = Number(idRaw);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid product id");
  }

  const newDescription = String(descriptionRaw ?? "").trim();
  if (!newDescription) {
    throw new Error("Invalid product description");
  }

  if (newDescription.length > 2000) {
    throw new Error("Description is too long");
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("products")
    .update({ description: newDescription })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function createProduct(formData: FormData) {
 
  const nameRaw = formData.get("name");
  const descriptionRaw = formData.get("description");
  const priceRaw = formData.get("price");
  const categoryRaw = formData.get("category");
  const statusRaw = formData.get("status");
  const imagesRaw = formData.get("images");  
  const optionsRaw = formData.get("options"); 

  const name = String(nameRaw ?? "").trim();
  if (!name) throw new Error("Invalid name");
  if (name.length > 120) throw new Error("Name is too long");

  const description = String(descriptionRaw ?? "").trim();
  if (!description) throw new Error("Invalid description");
  if (description.length > 2000) throw new Error("Description is too long");

  const category = String(categoryRaw ?? "").trim();
  if (!category) throw new Error("Invalid category");
  if (category.length > 60) throw new Error("Category is too long");


  const priceNum = Number(String(priceRaw ?? "").trim());
  if (!Number.isFinite(priceNum) || priceNum <= 0) throw new Error("Invalid price");
  const price = Math.round(priceNum); 

  const statusCandidate = String(statusRaw ?? "").trim().toLowerCase();
  const status: ProductStatus =
    statusCandidate === "в наявності" || statusCandidate === "під замовлення"
      ? (statusCandidate as ProductStatus)
      : "під замовлення";

  
  const imagesInput = String(imagesRaw ?? "").trim();
  let images: string[] = [];

  if (imagesInput) {
    if (imagesInput.startsWith("[")) {
      
      try {
        const parsed = JSON.parse(imagesInput);
        if (!Array.isArray(parsed)) throw new Error();
        images = parsed
          .map((x) => String(x ?? "").trim())
          .filter(Boolean);
      } catch {
        throw new Error("Images must be a valid JSON array of URLs");
      }
    } else {
      
      images = imagesInput
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
    }
  }

  if (images.length > 12) throw new Error("Too many images (max 12)");


  const optionsInput = String(optionsRaw ?? "").trim();
  let options: Array<{ name: string; price: number }> | null = null;

  if (optionsInput) {
    try {
      const parsed = JSON.parse(optionsInput);
      if (!Array.isArray(parsed)) throw new Error();
      options = parsed.map((opt) => {
        const optName = String(opt?.name ?? "").trim();
        const optPrice = Number(opt?.price);
        if (!optName) throw new Error("Option name is required");
        if (!Number.isFinite(optPrice) || optPrice < 0) throw new Error("Invalid option price");
        return { name: optName, price: Math.round(optPrice) };
      });
    } catch (e) {
      throw new Error(
        e instanceof Error ? e.message : "Options must be valid JSON array"
      );
    }
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  if (!user) throw new Error("Not authenticated");


  const { error } = await supabase.from("products").insert({
    name,
    description,
    price,
    category,
    status,
    images: images.length ? images : null,
    options,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function saveProductOptions(formData: FormData) {
  const id = Number(formData.get("id"));
  const optionsJson = formData.get("options");

  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid id");
  if (typeof optionsJson !== "string") throw new Error("Invalid options");

  const options = JSON.parse(optionsJson);

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("products")
    .update({ options })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath(`/admin/products/${id}/edit`);
}



import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "./supabase-server";
import { NewImage } from "@/types";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function addProductImages(productId: number, images: NewImage[]) {
  if (!Number.isInteger(productId) || productId <= 0) throw new Error("Invalid productId");

  const supabase = await createSupabaseServerClient();

  const { data: existing, error: e1 } = await supabase
    .from("product_images")
    .select("id, position")
    .eq("product_id", productId)
    .order("position", { ascending: true });

  if (e1) throw new Error(e1.message);

  const currentCount = existing?.length ?? 0;
  if (currentCount >= 4) throw new Error("Max 4 images");

  const free = 4 - currentCount;
  const slice = images.slice(0, free);

  const startPos = currentCount; 
  const rows = slice.map((img, idx) => ({
    product_id: productId,
    url: img.url,
    public_id: img.public_id,
    position: startPos + idx,
  }));

  const { error: e2 } = await supabase.from("product_images").insert(rows);
  if (e2) throw new Error(e2.message);

  revalidatePath(`/admin/products/${productId}/edit`);
  return { ok: true };
}
export async function deleteProductImage(productId: number, imageId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("product_images")
    .select("id, public_id")
    .eq("id", imageId)
    .eq("product_id", productId)
    .single();

  if (error) throw new Error(error.message);

  const res = await cloudinary.uploader.destroy(data.public_id);
  if (res.result !== "ok" && res.result !== "not found") {
    throw new Error("Cloudinary delete failed");
  }

  const { error: e2 } = await supabase
    .from("product_images")
    .delete()
    .eq("id", imageId);

  if (e2) throw new Error(e2.message);

  revalidatePath(`/admin/products/${productId}/edit`);
  return { ok: true };
}
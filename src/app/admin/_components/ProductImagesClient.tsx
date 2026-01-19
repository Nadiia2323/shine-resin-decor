"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type ImageItem = {
  id: string;
  url: string;
  public_id: string;
  position: number;
};

type NewImage = {
  url: string;
  public_id: string;
};

type Props = {
  productId: number;
  initialImages: ImageItem[];
};

export default function ProductImagesClient({
  productId,
  initialImages,
}: Props) {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const emptySlots = 4 - images.length;

  async function uploadFiles(files: FileList | null) {
    if (!files || loading) return;

    const picked = Array.from(files).slice(0, emptySlots);
    if (!picked.length) return;

    setLoading(true);

    try {
      // 1️⃣ signature
      const sigRes = await fetch(
        `/api/admin/products/${productId}/cloudinary-signature`
      );
      if (!sigRes.ok) throw new Error("Signature failed");
      const sig = await sigRes.json();

      // 2️⃣ upload to Cloudinary
      const uploaded: NewImage[] = [];

      for (const file of picked) {
        const form = new FormData();
        form.append("file", file);
        form.append("api_key", sig.apiKey);
        form.append("timestamp", String(sig.timestamp));
        form.append("folder", sig.folder);
        form.append("signature", sig.signature);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
          { method: "POST", body: form }
        );

        if (!res.ok) throw new Error("Cloudinary upload failed");

        const json = await res.json();
        uploaded.push({
          url: json.secure_url,
          public_id: json.public_id,
        });
      }

      // 3️⃣ save in Supabase
      const saveRes = await fetch(`/api/admin/products/${productId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: uploaded }),
      });

      if (!saveRes.ok) throw new Error("Saving images failed");

      // 4️⃣ обновляем страницу (revalidatePath уже сработал)
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(imageId: string) {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin/products/${productId}/images/${imageId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");

      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Images
      </p>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100"
          >
            {/* image */}
            <Image
              src={img.url}
              alt=""
              className="h-full w-full object-cover"
            />

            {/* delete */}
            <button
              type="button"
              onClick={() => deleteImage(img.id)}
              className="
                absolute top-1 right-1
                rounded-full bg-white/90
                px-2 py-0.5 text-xs font-bold
                text-slate-700 hover:bg-white
              "
            >
              ×
            </button>
          </div>
        ))}

        {/* empty slots */}
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square rounded-xl border border-slate-200 bg-slate-100"
          />
        ))}
      </div>

      {/* hidden input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={(e) => uploadFiles(e.target.files)}
      />

      {/* upload button */}
      <button
        type="button"
        disabled={loading || images.length >= 4}
        onClick={() => inputRef.current?.click()}
        className="
          w-full sm:w-auto
          rounded-full border border-slate-200 bg-white
          px-5 py-2 text-sm font-semibold text-slate-700
          hover:bg-slate-50 active:scale-[0.98]
          transition disabled:opacity-50
        "
      >
        {loading ? "Uploading…" : "Upload images"}
      </button>
    </div>
  );
}

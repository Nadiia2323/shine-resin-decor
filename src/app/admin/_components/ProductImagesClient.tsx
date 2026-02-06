"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import type { NewImage, ProductImage } from "@/types";

type ProductImagesClientProps = {
  productId: number;
  initialImages?: ProductImage[] | null;
  maxImages?: number;
};

type ApiImagesResponse = { images: ProductImage[] };

const MAX_MB = 10;
const MAX_BYTES = MAX_MB * 1024 * 1024;

async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, init);
  const text = await res.text().catch(() => "");
  if (!res.ok) throw new Error(text || `Request failed (${res.status})`);
  return (text ? JSON.parse(text) : {}) as T;
}

async function compressIfNeeded(file: File): Promise<File> {
  if (file.size <= MAX_BYTES) return file;

  const options = {
    maxSizeMB: 9.5,
    maxWidthOrHeight: 2400,
    useWebWorker: true,
    initialQuality: 0.85,
  };

  const compressed = await imageCompression(file, options);
  if (compressed.size <= MAX_BYTES) return compressed;

  return imageCompression(file, {
    ...options,
    maxSizeMB: 8,
    maxWidthOrHeight: 2000,
    initialQuality: 0.75,
  });
}

export default function ProductImagesClient({
  productId,
  initialImages,
  maxImages = 4,
}: ProductImagesClientProps) {
  const [images, setImages] = useState<ProductImage[]>(
    Array.isArray(initialImages) ? initialImages : [],
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sortedImages = useMemo(() => {
    const list = Array.isArray(images) ? images : [];
    return [...list].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  }, [images]);

  const emptySlots = Math.max(0, maxImages - sortedImages.length);

  const clearInput = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  async function uploadFiles(files: FileList | null) {
    if (!files || loading) return;

    const picked = Array.from(files).slice(0, emptySlots);
    clearInput();
    if (!picked.length) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const sig = await fetchJson<{
        apiKey: string;
        timestamp: number;
        folder: string;
        signature: string;
        cloudName: string;
      }>(`/api/admin/products/${productId}/cloudinary-signature`);

      const uploaded: NewImage[] = [];

      for (const rawFile of picked) {
        const file = await compressIfNeeded(rawFile);

        if (file.size > MAX_BYTES) {
          throw new Error(
            `Файл завеликий (${(file.size / 1024 / 1024).toFixed(
              1,
            )} MB). Максимум ${MAX_MB} MB.`,
          );
        }

        const form = new FormData();
        form.append("file", file);
        form.append("api_key", sig.apiKey);
        form.append("timestamp", String(sig.timestamp));
        form.append("folder", sig.folder);
        form.append("signature", sig.signature);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
          { method: "POST", body: form },
        );

        const cloudJson = await cloudRes.json().catch(() => null);
        if (!cloudRes.ok) {
          throw new Error(
            cloudJson?.error?.message ||
              `Cloudinary upload failed (${cloudRes.status})`,
          );
        }

        uploaded.push({
          url: cloudJson.secure_url,
          public_id: cloudJson.public_id,
        });
      }

      const data = await fetchJson<ApiImagesResponse>(
        `/api/admin/products/${productId}/images`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images: uploaded }),
        },
      );

      setImages(Array.isArray(data.images) ? data.images : []);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setLoading(false);
      clearInput();
    }
  }

  async function deleteImage(imageId: string) {
    if (loading) return;

    setLoading(true);
    setErrorMsg(null);

    const prev = Array.isArray(images) ? images : [];
    setImages(prev.filter((img) => img.id !== imageId));

    try {
      const data = await fetchJson<ApiImagesResponse>(
        `/api/admin/products/${productId}/images/${imageId}`,
        { method: "DELETE" },
      );
      setImages(Array.isArray(data.images) ? data.images : []);
    } catch (e) {
      setImages(prev);
      setErrorMsg(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  async function makeMain(imageId: string) {
    if (loading) return;

    setLoading(true);
    setErrorMsg(null);

    const prev = Array.isArray(images) ? images : [];
    setImages(prev.map((img) => ({ ...img, is_main: img.id === imageId })));

    try {
      const data = await fetchJson<ApiImagesResponse>(
        `/api/admin/products/${productId}/images/${imageId}/main`,
        { method: "PATCH" },
      );
      setImages(Array.isArray(data.images) ? data.images : []);
    } catch (e) {
      setImages(prev);
      setErrorMsg(e instanceof Error ? e.message : "Make main failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t border-slate-200 bg-white p-6 sm:p-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Images
        </p>

        <p className="text-xs text-slate-500">
          {sortedImages.length}/{maxImages}
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <div className="flex items-start justify-between gap-3">
            <p className="min-w-0 break-words">{errorMsg}</p>
            <button
              type="button"
              onClick={() => setErrorMsg(null)}
              className="text-xs font-semibold text-red-700 hover:opacity-80"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 mb-4">
        {sortedImages.map((img) => (
          <div
            key={img.id}
            className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100"
          >
            <Image src={img.url} alt="" fill className="object-cover" />

            {img.is_main && (
              <span className="absolute left-1 top-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-slate-800">
                Main
              </span>
            )}

            <button
              type="button"
              disabled={loading || img.is_main}
              onClick={() => makeMain(img.id)}
              className="absolute left-1 bottom-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-slate-700 hover:bg-white disabled:opacity-60"
            >
              {img.is_main ? "Main" : "Set main"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => deleteImage(img.id)}
              className="absolute top-1 right-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-slate-700 hover:bg-white disabled:opacity-60"
              aria-label="Delete image"
              title="Delete"
            >
              ×
            </button>
          </div>
        ))}

        {Array.from({ length: emptySlots }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square rounded-xl border border-dashed border-slate-200 bg-slate-50"
          />
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={(e) => uploadFiles(e.target.files)}
      />

      <div className="flex flex-col gap-2">
        <button
          type="button"
          disabled={loading || sortedImages.length >= maxImages}
          onClick={() => inputRef.current?.click()}
          className="w-full sm:w-auto rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition disabled:opacity-50"
        >
          {loading ? "Uploading…" : "Upload images"}
        </button>

        <p className="text-xs text-slate-500">
          Фото стискаються автоматично. Максимальний розмір файлу: {MAX_MB} MB.
        </p>
      </div>
    </div>
  );
}

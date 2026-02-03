"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PreviewFormProps } from "@/types";
import OptionsPreview from "./OptionsPreview";

export default function PreviewForm({ product }: PreviewFormProps) {
  const safeImages = useMemo(() => {
    const imgs = [...(product.product_images ?? [])];

    imgs.sort((a, b) => {
      const aMain = a.is_main ? 1 : 0;
      const bMain = b.is_main ? 1 : 0;
      if (aMain !== bMain) return bMain - aMain;
      return (a.position ?? 0) - (b.position ?? 0);
    });

    const urls = imgs.map((i) => i.url).filter(Boolean);
    return urls.length ? urls : ["/placeholder.png"];
  }, [product.product_images]);

  const [activeImage, setActiveImage] = useState(safeImages[0]);

  useEffect(() => {
    setActiveImage(safeImages[0]);
  }, [safeImages]);

  const statusPill =
    product.status === "в наявності"
      ? "bg-green-100 text-green-700"
      : "bg-amber-100 text-amber-700";

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Preview</h2>
        <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-xs font-semibold">
          Live preview
        </span>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative aspect-square bg-slate-100">
          <Image
            alt=""
            src={activeImage}
            width={600}
            height={600}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {safeImages.length > 1 && (
          <div className="flex gap-2 py-4 px-2 overflow-x-auto">
            {safeImages.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`
                  relative h-16 w-16 shrink-0 rounded-xl overflow-hidden border
                  ${
                    activeImage === img
                      ? "border-cyan-400 ring-2 ring-cyan-200"
                      : "border-slate-200 hover:border-slate-400"
                  }
                `}
              >
                <Image
                  src={img}
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 px-2 py-0.5 text-xs font-semibold">
              {product.category || "—"}
            </span>

            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${statusPill}`}
            >
              {product.status || "—"}
            </span>
          </div>

          <p className="text-base font-bold text-slate-900">
            {product.name || "—"}
          </p>

          <p className="text-sm text-slate-500 line-clamp-3">
            {product.description || "—"}
          </p>

          <div className="flex items-center justify-between pt-2">
            <p className="text-lg font-bold text-slate-900">
              {product.price ?? 0} ₴
            </p>
          </div>

          <OptionsPreview options={product.options} title="Extras" />
        </div>
      </div>
    </>
  );
}

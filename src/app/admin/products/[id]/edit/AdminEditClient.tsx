import EditForm from "@/app/admin/_components/EditForm";
import EditHeader from "@/app/admin/_components/EditHeader";

import React from "react";

import { AdminEditClientProps } from "@/types";
import PreviewForm from "@/app/admin/_components/PreviewForm";
import ProductImagesClient from "@/app/admin/_components/ProductImagesClient";

export default function AdminEditClient({
  product,
  categories,
  productId,
  initialImages,
}: AdminEditClientProps) {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <EditHeader />

        <section className="rounded-2xl bg-white shadow border border-slate-200 overflow-hidden">
          <div className="flex flex-row">
            <div className="p-6 sm:p-8 space-y-6">
              <EditForm product={product} categories={categories} />
            </div>

            <aside className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/60 p-6 sm:p-8">
              <PreviewForm product={product} />
            </aside>
          </div>
          <ProductImagesClient
            productId={productId}
            initialImages={initialImages}
          />

          {/* <div className="border-t border-slate-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Images
            </p>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl border border-slate-200 bg-slate-100"
                />
              ))}
            </div>

            <button
              type="button"
              className="
            w-full sm:w-auto
            rounded-full border border-slate-200 bg-white
            px-5 py-2 text-sm font-semibold text-slate-700
            hover:bg-slate-50 active:scale-[0.98] transition
          "
            >
              Upload images
            </button>
          </div> */}
        </section>
      </div>
    </main>
  );
}

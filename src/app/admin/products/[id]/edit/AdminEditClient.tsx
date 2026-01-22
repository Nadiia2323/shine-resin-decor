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
        <EditHeader productId={productId} />

        <section className="rounded-2xl bg-white shadow border border-slate-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-6 sm:p-8 space-y-6">
              <EditForm product={product} categories={categories} />
            </div>

            <aside className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/60 p-6 sm:p-8 lg:w-[380px]">
              <PreviewForm product={product} />
            </aside>
          </div>

          <ProductImagesClient
            productId={productId}
            initialImages={initialImages}
          />
        </section>
      </div>
    </main>
  );
}

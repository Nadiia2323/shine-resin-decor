import EditForm from "@/app/admin/_components/EditForm";
import EditHeader from "@/app/admin/_components/EditHeader";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { AdminEditClientProps } from "@/types";

export default function AdminEditClient({ product }: AdminEditClientProps) {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <EditHeader />

        {/* Content */}
        <section className="rounded-3xl bg-white shadow border border-slate-200 overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.1fr,0.9fr]">
            {/* Left: form */}
            <EditForm product={product} />

            {/* Right: preview */}
            <aside className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/60 p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  Preview
                </h2>
                <span className="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 px-2 py-0.5 text-xs font-semibold">
                  Draft
                </span>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="relative w-full aspect-square bg-slate-100">
                  <Image
                    alt=""
                    src={product.images[0]}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 px-2 py-0.5 text-xs font-semibold">
                      clocks
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">
                      в наявності
                    </span>
                  </div>

                  <p className="text-base font-bold text-slate-900">
                    Годинник Ukraine
                  </p>

                  <p className="text-sm text-slate-500 line-clamp-3">
                    Унікальний виріб з епоксидної смоли, створений вручну з
                    любовʼю.
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-lg font-bold text-slate-900">1200 ₴</p>
                    <a
                      //   href="/shop/1"
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700
                                 hover:bg-slate-50 active:scale-[0.98] transition"
                    >
                      Open in shop
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Images
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl border border-slate-200 bg-slate-100"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700
                             hover:bg-slate-50 active:scale-[0.98] transition"
                >
                  Upload images
                </button>
              </div>
            </aside>
          </div>
        </section>

        {/* Footer hint */}
        <p className="text-xs text-slate-400">
          Tip: позже можно добавить autosave + server actions (updateName,
          updatePrice, toggleStatus, updateCategory).
        </p>
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import type { AdminClientProps } from "@/types";
import {
  deleteProduct,
  toggleStatus,
  updateCategory,
  updateName,
} from "../actions";
import InlineEditField from "./InLineEditField";
import InlineEditSelect from "./InLineEditSelect";
import PriceCell from "./PriceCell";

export default function ProductsList({
  products,
  categories,
}: AdminClientProps) {
  return (
    <div className="space-y-3">
      {products?.map((p) => {
        const statusBase =
          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide";
        const statusClass =
          p.status === "в наявності"
            ? "bg-green-100 text-green-700"
            : p.status === "під замовлення"
              ? "bg-amber-100 text-amber-700"
              : "bg-slate-200 text-slate-700";

        const mainImageUrl =
          p.product_images?.find((img) => img.is_main)?.url ??
          [...(p.product_images ?? [])].sort(
            (a, b) => (a.position ?? 0) - (b.position ?? 0),
          )[0]?.url ??
          "/placeholder.png";

        return (
          <div
            key={p.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="h-16 w-16 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                <Image
                  src={mainImageUrl}
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <InlineEditField
                  id={p.id}
                  name="name"
                  defaultValue={(p.name ?? "").trim()}
                  action={updateName}
                  wrapperClassName="min-w-0"
                  inputClassName="font-semibold text-slate-900 truncate w-full bg-transparent outline-none"
                  meta={<p className="text-xs text-slate-500">ID: {p.id}</p>}
                  placeholder="—"
                />

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <InlineEditSelect
                    id={p.id}
                    name="category"
                    defaultValue={p.category ?? ""}
                    options={categories}
                    action={updateCategory}
                    selectClassName="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 px-2 py-0.5 text-xs font-semibold"
                  />

                  <form action={toggleStatus}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="status" value={p.status ?? ""} />
                    <button
                      type="submit"
                      className={`${statusBase} ${statusClass} hover:opacity-80 transition`}
                    >
                      {p.status ?? "—"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <PriceCell id={p.id} price={p.price} />
                <span className="text-slate-500">₴</span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/shop/${p.id}?from=admin`}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700
                             hover:bg-slate-50 active:scale-[0.98] transition"
                >
                  View
                </Link>

                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700
                             hover:bg-slate-50 active:scale-[0.98] transition"
                >
                  Edit
                </Link>

                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700
                               hover:bg-red-100 active:scale-[0.98] transition"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      })}

      {(!products || products.length === 0) && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-400">
          No products yet
        </div>
      )}
    </div>
  );
}

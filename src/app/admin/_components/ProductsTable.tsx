"use client";
import React from "react";
import { AdminClientProps } from "@/types";
import Image from "next/image";
import { toggleStatus, updateName } from "../actions";
import PriceCell from "./PriceCell";
import CategoryCell from "./CategoryCell";
import Link from "next/link";
import InlineEditField from "./InLineEditField";

export default function ProductsTable({
  products,
  categories,
}: AdminClientProps) {
  return (
    <table className="min-w-full text-sm">
      <thead className="bg-slate-50 text-slate-600">
        <tr>
          <th className="px-5 py-3 text-left font-semibold">Product</th>
          <th className="px-5 py-3 text-left font-semibold">Category</th>
          <th className="px-5 py-3 text-left font-semibold">Status</th>
          <th className="px-5 py-3 text-right font-semibold">Price</th>
          <th className="px-5 py-3 text-right font-semibold">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-100">
        {products?.map((p) => {
          const statusBase =
            "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide";
          const statusClass =
            p.status === "в наявності"
              ? "bg-green-100 text-green-700"
              : p.status === "під замовлення"
              ? "bg-amber-100 text-amber-700"
              : "bg-slate-200 text-slate-700";
          const mainImage =
            Array.isArray(p.images) && p.images.length > 0
              ? p.images[0]
              : "/placeholder.png";

          return (
            <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                    <Image
                      src={mainImage}
                      alt=""
                      className="h-full w-full object-cover"
                      width={48}
                      height={48}
                    />
                  </div>

                  <InlineEditField
                    id={p.id}
                    name="name"
                    defaultValue={(p.name ?? "").trim()}
                    action={updateName}
                    formClassName=""
                    wrapperClassName="min-w-0"
                    meta={<p className="text-xs text-slate-500">ID: {p.id}</p>}
                    inputClassName="font-semibold text-slate-900 truncate w-full bg-transparent outline-none"
                    placeholder="—"
                  />
                </div>
              </td>
              <CategoryCell
                id={p.id}
                category={p.category}
                categories={categories}
              />

              <td className="px-5 py-4">
                <form action={toggleStatus}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="status" value={p.status ?? ""} />

                  <button
                    type="submit"
                    className={`
        ${statusBase} ${statusClass}
        cursor-pointer hover:opacity-80 transition
      `}
                    title="Click to toggle status"
                  >
                    {p.status ?? "—"}
                  </button>
                </form>
              </td>

              <td className="px-5 py-4 text-right font-semibold text-slate-900">
                <div className="flex items-center justify-end gap-2">
                  <PriceCell id={p.id} price={p.price} />
                  <span className="text-slate-500">₴</span>
                </div>
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
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
                  <button
                    className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700
                                   hover:bg-red-100 active:scale-[0.98] transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          );
        })}

        {(!products || products.length === 0) && (
          <tr>
            <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
              No products yet
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

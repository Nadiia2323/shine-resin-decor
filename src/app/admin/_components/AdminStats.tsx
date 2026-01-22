"use client";
import React from "react";
import { AdminClientProps } from "@/types";

export default function AdminStats({ products }: AdminClientProps) {
  const total = products?.length ?? 0;
  const inStock =
    products?.filter((p) => p.status === "в наявності").length ?? 0;
  const onOrder =
    products?.filter((p) => p.status === "під замовлення").length ?? 0;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
        <p className="text-xs text-slate-500">All products</p>
        <p className="text-2xl font-bold text-slate-900">{total}</p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
        <span className="mt-2 inline-flex rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">
          В наявності
        </span>
        <p className="text-2xl font-bold text-slate-900">{inStock}</p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
        <span className="mt-2 inline-flex rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-semibold">
          Під замовлення
        </span>
        <p className="text-2xl font-bold text-slate-900">{onOrder}</p>
      </div>
    </div>
  );
}

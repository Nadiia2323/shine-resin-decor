import Link from "next/link";
import React from "react";

export default function EditHeader() {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit product</h1>
        <p className="text-sm text-slate-500">Manage product details</p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700
                           hover:bg-slate-50 active:scale-[0.98] transition"
        >
          ← Back
        </Link>

        <button
          type="button"
          className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700
                           hover:bg-red-100 active:scale-[0.98] transition"
        >
          Delete
        </button>

        <button
          type="button"
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm
                           hover:bg-slate-800 active:scale-[0.98] transition"
        >
          Save changes
        </button>
      </div>
    </header>
  );
}

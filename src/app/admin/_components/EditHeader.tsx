import Link from "next/link";
import React from "react";
import { deleteProduct } from "../actions";
import { DeleteButton } from "./DeleteButton";

type EditHeaderProps = {
  productId: number;
};

export default function EditHeader({ productId }: EditHeaderProps) {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
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
        <form action={deleteProduct}>
          <input type="hidden" name="id" value={productId} />
          <DeleteButton />
        </form>
      </div>
    </header>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateCategory } from "../actions";

type Props = {
  productId: number;
};

export default function AddCategoryInline({ productId }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function submit() {
    const v = value.trim();
    if (!v) return;

    const fd = new FormData();
    fd.set("id", String(productId));
    fd.set("category", v);

    await updateCategory(fd);

    setValue("");
    setOpen(false);

    startTransition(() => router.refresh());
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-semibold text-slate-700 hover:text-slate-900"
      >
        + Add
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New category…"
        disabled={isPending}
        className="w-40 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900
                   outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            void submit();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
            setValue("");
          }
        }}
      />

      <button
        type="button"
        onClick={() => void submit()}
        disabled={!value.trim() || isPending}
        className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white
                   hover:bg-slate-800 disabled:opacity-50"
      >
        Save
      </button>

      <button
        type="button"
        onClick={() => {
          setOpen(false);
          setValue("");
        }}
        className="text-xs font-semibold text-slate-500 hover:text-slate-700"
      >
        Cancel
      </button>
    </div>
  );
}

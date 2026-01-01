"use client";
import React, { useRef } from "react";
import { updateCategory } from "../actions";
import { CategoryCellProps } from "@/types";

export default function CategoryCell({
  id,
  category,
  categories,
}: CategoryCellProps) {
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <td className="px-5 py-4 text-slate-700">
      <form ref={formRef} action={updateCategory}>
        <input type="hidden" name="id" value={id} />

        <select
          onChange={() => {
            formRef.current?.requestSubmit();
          }}
          name="category"
          defaultValue={category ?? ""}
          className="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 px-2 py-0.5 text-xs font-semibold"
        >
          <option value="" disabled>
            —
          </option>

          {categories?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </form>
    </td>
  );
}

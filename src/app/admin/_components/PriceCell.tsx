"use client";

import React, { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updatePrice } from "@/app/admin/actions";
import { PriceCellProps } from "@/types";

export default function PriceCell({ id, price }: PriceCellProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const original = price ?? null;

  const action = async (formData: FormData) => {
    await updatePrice(formData);
    startTransition(() => router.refresh());
  };

  const submitIfChanged = () => {
    const el = inputRef.current;
    if (!el) return;

    const raw = el.value.trim();
    if (raw === "") {
      el.value = original === null ? "" : String(original);
      return;
    }

    const next = Number(raw);

    if (!Number.isFinite(next) || next <= 0) {
      el.value = original === null ? "" : String(original);
      return;
    }

    if (original !== null && next === original) return;

    formRef.current?.requestSubmit();
  };

  return (
    <form ref={formRef} action={action} className="flex justify-end">
      <input type="hidden" name="id" value={id} />

      <input
        ref={inputRef}
        name="price"
        type="number"
        min={1}
        step={1}
        defaultValue={price ?? ""}
        placeholder="—"
        onBlur={submitIfChanged}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            inputRef.current?.blur();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            if (inputRef.current) {
              inputRef.current.value =
                original === null ? "" : String(original);
              inputRef.current.blur();
            }
          }
        }}
        className="
          w-28 text-right rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900
          outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
        "
      />

      <button
        type="submit"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
    </form>
  );
}

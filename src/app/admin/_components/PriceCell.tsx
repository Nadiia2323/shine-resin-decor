"use client";

import React, { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updatePrice } from "@/app/admin/actions";
import { PriceCellProps } from "@/types";

export default function PriceCell({ id, price }: PriceCellProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const originalNum =
    typeof price === "number" ? price : Number(String(price ?? "").trim());
  const hasOriginal = Number.isFinite(originalNum);

  const action = async (formData: FormData) => {
    await updatePrice(formData);
    startTransition(() => router.refresh());
  };

  const revert = () => {
    const el = inputRef.current;
    if (!el) return;
    el.value = hasOriginal ? String(originalNum) : "";
  };

  const submitIfChanged = () => {
    const el = inputRef.current;
    if (!el || isPending) return;

    const raw = el.value.trim();

    if (raw === "") {
      revert();
      return;
    }

    const next = Number(raw);

    if (!Number.isFinite(next) || next <= 0) {
      revert();
      return;
    }

    if (hasOriginal && next === originalNum) return;

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
        inputMode="numeric"
        pattern="[0-9]*"
        defaultValue={hasOriginal ? originalNum : ""}
        placeholder="—"
        disabled={isPending}
        aria-busy={isPending}
        onBlur={submitIfChanged}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            inputRef.current?.blur();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            revert();
            inputRef.current?.blur();
          }
        }}
        className={`
          w-24 sm:w-28 text-right rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900
          outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
          disabled:opacity-60 disabled:bg-slate-50
        `}
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

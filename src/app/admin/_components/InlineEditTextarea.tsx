"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useTransition } from "react";

type InlineEditTextareaProps = {
  id: number | string;
  name: string;
  defaultValue: string;
  action: (formData: FormData) => Promise<void>;
  label?: string;
  rows?: number;
  textareaClassName?: string;
  placeholder?: string;
};

export default function InlineEditTextarea({
  id,
  name,
  defaultValue,
  action,
  label,
  rows,
  textareaClassName = "",
  placeholder = "",
}: InlineEditTextareaProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const router = useRouter();
  const [, startTransition] = useTransition();

  const original = defaultValue;

  const wrappedAction = async (formData: FormData) => {
    await action(formData);
    startTransition(() => router.refresh());
  };

  const submitIfChanged = () => {
    const el = textareaRef.current;
    if (!el) return;

    const next = el.value.trim();

    if (!next) {
      el.value = original;
      return;
    }

    if (next === original) return;

    formRef.current?.requestSubmit();
  };

  return (
    <form ref={formRef} action={wrappedAction} className="space-y-2">
      <input type="hidden" name="id" value={String(id)} />

      {label && (
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </label>
      )}

      <textarea
        ref={textareaRef}
        name={name}
        rows={rows ?? 5}
        placeholder={placeholder}
        defaultValue={original}
        onBlur={submitIfChanged}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            textareaRef.current?.blur();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            if (textareaRef.current) {
              textareaRef.current.value = original;
              textareaRef.current.blur();
            }
          }
        }}
        className={textareaClassName}
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

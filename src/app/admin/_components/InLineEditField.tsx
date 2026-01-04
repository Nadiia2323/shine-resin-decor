"use client";

import React, { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { InlineEditFieldProps } from "@/types";

export default function InlineEditField({
  id,
  name,
  defaultValue,
  action,
  type = "text",
  placeholder,
  inputClassName = "",
  formClassName = "",
  wrapperClassName = "",
  label,
  meta,
}: InlineEditFieldProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const [, startTransition] = useTransition();

  const original = defaultValue;

  const wrappedAction = async (formData: FormData) => {
    await action(formData);
    startTransition(() => router.refresh());
  };

  const submitIfChanged = () => {
    const el = inputRef.current;
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
    <form ref={formRef} action={wrappedAction} className={formClassName}>
      <div className={wrapperClassName}>
        <input type="hidden" name="id" value={String(id)} />

        {label && (
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {label}
          </label>
        )}

        {meta}

        <input
          ref={inputRef}
          name={name}
          type={type}
          defaultValue={original}
          placeholder={placeholder}
          onBlur={submitIfChanged}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              inputRef.current?.blur();
            }
            if (e.key === "Escape") {
              e.preventDefault();
              if (inputRef.current) {
                inputRef.current.value = original;
                inputRef.current.blur();
              }
            }
          }}
          className={inputClassName}
        />

        <button
          type="submit"
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    </form>
  );
}

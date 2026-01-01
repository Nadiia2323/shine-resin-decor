import React, { useRef } from "react";
import { updateName } from "../actions";
import { NameCellProps } from "@/types";

export default function NameCell({ name, id }: NameCellProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const original = name ?? "";

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
    <form ref={formRef} action={updateName}>
      <div className="min-w-0">
        <input type="hidden" name="id" value={id} />
        <p className="text-xs text-slate-500">ID: {id}</p>

        <input
          ref={inputRef}
          name="name"
          type="text"
          defaultValue={original}
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
          className="font-semibold text-slate-900 truncate"
        />
      </div>
    </form>
  );
}

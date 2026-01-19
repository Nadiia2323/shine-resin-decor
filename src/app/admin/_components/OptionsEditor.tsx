"use client";

import React from "react";
import type { ProductOption } from "@/types";
import { saveProductOptions } from "../actions";

type Props = {
  productId: number;
  initialOptions?: ProductOption[];
  maxOptions?: number;
};

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Failed to save";
}

export default function OptionsEditor({
  productId,
  initialOptions = [],
  maxOptions = 5,
}: Props) {
  const [options, setOptions] = React.useState<ProductOption[]>(initialOptions);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const canAdd = options.length < maxOptions;

  const persist = async (next: ProductOption[]) => {
    setOptions(next);
    setSaving(true);
    setError(null);

    const cleaned = next
      .map((o) => ({
        name: (o.name ?? "").trim(),
        price: o.price ?? 0,
      }))
      .filter((o) => o.name.length > 0 && o.price != null);

    try {
      const fd = new FormData();
      fd.append("id", String(productId));
      fd.append("options", JSON.stringify(cleaned));
      await saveProductOptions(fd);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  const addOption = async () => {
    if (!canAdd) return;
    await persist([...options, { name: "", price: null }]);
  };

  const removeOption = async (index: number) => {
    await persist(options.filter((_, i) => i !== index));
  };

  const updateLocal = (index: number, patch: Partial<ProductOption>) => {
    setOptions((prev) =>
      prev.map((o, i) => (i === index ? { ...o, ...patch } : o))
    );
  };

  const saveOnBlur = async () => {
    await persist(options);
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Options (extra)
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-slate-400">Up to {maxOptions} options</p>
            {saving ? (
              <span className="text-xs text-slate-400">Saving…</span>
            ) : null}
            {error ? (
              <span className="text-xs text-red-600">{error}</span>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={addOption}
          disabled={!canAdd || saving}
          className="
            rounded-full px-3 py-1.5 text-xs font-semibold transition
            border border-slate-200 bg-white text-slate-700
            hover:bg-slate-50 active:scale-[0.98]
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          + Add option
        </button>
      </div>

      {options.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            No options yet. Add extras like “logo”, “mirror decor”, etc.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <input
                    value={opt.name ?? ""}
                    onChange={(e) => updateLocal(idx, { name: e.target.value })}
                    onBlur={saveOnBlur}
                    placeholder="Option name…"
                    className="
                      w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900
                      outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
                    "
                  />

                  <div className="flex items-center gap-2">
                    <input
                      value={opt.price ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;

                        updateLocal(idx, {
                          price: v === "" ? null : Number(v),
                        });
                      }}
                      onBlur={saveOnBlur}
                      type="number"
                      step={1}
                      className="
                        w-28 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900
                        outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
                      "
                    />
                    <span className="text-xs font-semibold text-slate-500">
                      ₴
                    </span>

                    <span className="ml-auto inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 border border-slate-200">
                      #{idx + 1}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  disabled={saving}
                  className="
                    rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700
                    hover:bg-red-100 active:scale-[0.98] transition
                    disabled:opacity-40 disabled:cursor-not-allowed
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

import { AdminEditClientProps } from "@/types";
import React from "react";

import InlineEditField from "./InLineEditField";
import { updateName } from "../actions";

export default function EditForm({ product }: AdminEditClientProps) {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <InlineEditField
        id={product.id}
        name="name"
        defaultValue={(product.name ?? "").trim()}
        action={updateName}
        label="Product name"
        wrapperClassName="space-y-2"
        inputClassName="
        w-full rounded-xl border border-slate-200 bg-white
        px-4 py-2.5 text-sm text-slate-900
        outline-none transition
        focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
      "
        placeholder="Product name…"
      />

      {/* Category + Status */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Category
          </label>
          <select
            defaultValue={product.category}
            className="
                      w-full rounded-xl border border-slate-200 bg-white
                      px-4 py-2.5 text-sm text-slate-900
                      outline-none transition
                      focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
                    "
          >
            <option value="">—</option>
            <option value="clocks">clocks</option>
            <option value="paintings">paintings</option>
            <option value="decor">decor</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Status
          </label>
          <select
            defaultValue="в наявності"
            className="
                      w-full rounded-xl border border-slate-200 bg-white
                      px-4 py-2.5 text-sm text-slate-900
                      outline-none transition
                      focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
                    "
          >
            <option value="">—</option>
            <option value="в наявності">в наявності</option>
            <option value="під замовлення">під замовлення</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div className="grid gap-4 sm:grid-cols-[1fr,auto] items-end">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Price (₴)
          </label>
          <input
            type="number"
            min={1}
            step={1}
            defaultValue={product.price}
            className="
                      w-full rounded-xl border border-slate-200 bg-white
                      px-4 py-2.5 text-sm text-slate-900
                      outline-none transition
                      focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
                    "
          />
        </div>

        <span className="hidden sm:inline-flex items-center rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 border border-slate-200">
          UAH
        </span>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Description
        </label>
        <textarea
          rows={5}
          placeholder="Короткий опис товару…"
          defaultValue={product.description}
          className="
                    w-full rounded-xl border border-slate-200 bg-white
                    px-4 py-3 text-sm text-slate-900
                    outline-none resize-none transition
                    focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
                  "
        />
        <p className="text-xs text-slate-400">
          Tip: для магазину лучше коротко (2–4 предложения).
        </p>
      </div>

      {/* Options (placeholder) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Options (extra)
          </label>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700
                               hover:bg-slate-50 active:scale-[0.98] transition"
          >
            + Add option
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            Тут позже будет список опций (name + price) и кнопки
            удалить/редактировать.
          </p>
        </div>
      </div>

      {/* Mobile buttons */}
      <div className="flex flex-col gap-3 sm:hidden pt-2">
        <button
          type="button"
          className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-slate-800 active:scale-[0.98] transition"
        >
          Save changes
        </button>
        <button
          type="button"
          className="rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700
                             hover:bg-red-100 active:scale-[0.98] transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

"use client";

import { EditFormProps } from "@/types";
import InlineEditField from "./InLineEditField";
import {
  updateCategory,
  updateDescription,
  updateName,
  updateStatus,
} from "../actions";
import InlineEditSelect from "./InLineEditSelect";
import PriceCell from "./PriceCell";
import InlineEditTextarea from "./InlineEditTextarea";
import OptionsEditor from "./OptionsEditor";
import AddCategoryInline from "./AddCategoryInline";

export default function EditForm({ product, categories }: EditFormProps) {
  return (
    <div className="space-y-6">
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Category
          </label>
          <AddCategoryInline productId={product.id} />
          <InlineEditSelect
            id={product.id}
            name="category"
            defaultValue={product.category ?? ""}
            options={categories}
            action={updateCategory}
            selectClassName="
              w-full rounded-xl border border-slate-200 bg-white
              px-4 py-2.5 text-sm text-slate-900
              outline-none transition
              focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
            "
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Status
          </label>
          <InlineEditSelect
            id={product.id}
            name="status"
            defaultValue={product.status ?? ""}
            options={["в наявності", "під замовлення"]}
            action={updateStatus}
            selectClassName="
              w-full rounded-xl border border-slate-200 bg-white
              px-4 py-2.5 text-sm text-slate-900
              outline-none transition
              focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
            "
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Price
            </p>
            <PriceCell id={product.id} price={product.price} />
            <p className="text-xs text-slate-400 mt-1 sm:hidden">UAH</p>
          </div>

          <span className="hidden sm:inline-flex items-center rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 border border-slate-200">
            UAH
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <InlineEditTextarea
          id={product.id}
          name="description"
          defaultValue={(product.description ?? "").trim()}
          action={updateDescription}
          label="Description"
          rows={7}
          textareaClassName="
            w-full rounded-xl border border-slate-200 bg-white
            px-4 py-3 text-sm text-slate-900
            outline-none resize-none transition
            focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100
          "
          placeholder="Короткий опис товару…"
        />
        <p className="text-xs text-slate-400 mt-1">
          Tip: намагайся бути лаконічною (2–4 речення).
        </p>
      </div>

      <OptionsEditor
        productId={product.id}
        initialOptions={product.options ?? []}
        maxOptions={5}
      />
    </div>
  );
}

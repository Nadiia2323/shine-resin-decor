import React from "react";
import { ProductOption } from "@/types";

type Props = {
  options?: ProductOption[] | null;
  title: string;
};

export default function OptionsPreview({ options, title }: Props) {
  if (!options || options.length === 0) return null;

  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {title}
      </p>

      <div className="flex flex-wrap gap-2">
        {options.slice(0, 5).map((o, i) => (
          <span
            key={i}
            className="
              inline-flex items-center gap-2 rounded-full
              border border-slate-200 bg-white px-3 py-1 text-xs
              text-slate-700 shadow-sm
            "
          >
            <span className="max-w-[170px] truncate">{o.name}</span>
            <span className="font-semibold text-slate-900">+{o.price} ₴</span>
          </span>
        ))}

        {options.length > 5 && (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
            +{options.length - 5} more
          </span>
        )}
      </div>
    </div>
  );
}

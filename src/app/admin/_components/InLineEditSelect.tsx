"use client";

import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { InlineEditSelectProps } from "@/types";

export default function InlineEditSelect({
  id,
  name,
  defaultValue,
  options = [],
  action,
  selectClassName = "",
  placeholder = "—",
}: InlineEditSelectProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const initial = (defaultValue ?? "").trim();
  const [selected, setSelected] = useState(initial);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    setSelected(next);

    const fd = new FormData();
    fd.set("id", String(id));
    fd.set(name, next);

    await action(fd);

    startTransition(() => router.refresh());
  };

  return (
    <select
      name={name}
      value={selected}
      onChange={onChange}
      className={selectClassName}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

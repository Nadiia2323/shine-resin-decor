"use client";

import React from "react";
import AdminLogoutButton from "./AdminLogoutButton";
import { createProductDraft } from "../actions";

export default function AdminHeader() {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start justify-between gap-3 sm:block">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin</h1>
          <p className="text-sm text-slate-500">Products overview</p>
        </div>

        <div className="sm:hidden">
          <AdminLogoutButton />
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <form action={createProductDraft}>
          <button
            type="submit"
            className="rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition"
          >
            + Add product
          </button>
        </form>

        <AdminLogoutButton />
      </div>

      <form action={createProductDraft} className="sm:hidden">
        <button
          type="submit"
          className="w-full rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition"
        >
          + Add product
        </button>
      </form>
    </header>
  );
}

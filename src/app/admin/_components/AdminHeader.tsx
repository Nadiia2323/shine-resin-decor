"use client";
import React from "react";
import AdminLogoutButton from "./AdminLogoutButton";

export default function AdminHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin</h1>
        <p className="text-sm text-slate-500">Products overview</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <input
            placeholder="Search by name…"
            className="w-full sm:w-72 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm outline-none
                         focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            ⌘K
          </span>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm
                       hover:bg-slate-800 active:scale-[0.98] transition"
        >
          + Add product
        </button>

        <AdminLogoutButton />
      </div>
    </header>
  );
}

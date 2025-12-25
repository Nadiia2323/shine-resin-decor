"use client";

import { createBrowserClient } from "@supabase/ssr";

import { useRouter } from "next/navigation";
import React from "react";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };
  return (
    <div className="flex justify-end">
      <button
        onClick={handleLogout}
        className="rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800 transition"
      >
        Log out
      </button>
    </div>
  );
}

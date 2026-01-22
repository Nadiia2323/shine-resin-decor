"use client";
import React from "react";
import { AdminClientProps } from "@/types";
import AdminHeader from "./_components/AdminHeader";
import AdminStats from "./_components/AdminStats";
import ProductsTable from "./_components/ProductsTable";
import ProductsList from "./_components/ProductsList";

export default function AdminClient({
  products,
  categories,
}: AdminClientProps) {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <AdminHeader />
        <AdminStats products={products} />

        <div className="rounded-2xl bg-white shadow border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="md:hidden">
              <ProductsList products={products} categories={categories} />
            </div>

            <div className="hidden md:block">
              <ProductsTable products={products} categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { PageClientProps } from "@/types";

export default function PageClient({
  categories,
  products,
  initialOffset,
}: PageClientProps) {
  const limit = 20;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState(products);
  const [offset, setOffset] = useState<number | null>(initialOffset);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory === "All") {
      setItems(products);
      setOffset(initialOffset);
      return;
    }

    const loadCategory = async () => {
      setLoading(true);

      const res = await fetch(
        `/api/products?limit=${limit}&offset=0&category=${encodeURIComponent(
          selectedCategory,
        )}`,
        { cache: "no-store" },
      );

      const data = await res.json();

      setItems(data.items || []);
      setOffset(data.nextOffset ?? null);
      setLoading(false);
    };

    loadCategory();
  }, [selectedCategory, products, initialOffset]);

  const loadMore = async () => {
    if (offset === null) return;

    setLoading(true);

    const url =
      selectedCategory === "All"
        ? `/api/products?limit=${limit}&offset=${offset}`
        : `/api/products?limit=${limit}&offset=${offset}&category=${encodeURIComponent(
            selectedCategory,
          )}`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    setItems((prev) => [...prev, ...(data.items || [])]);
    setOffset(data.nextOffset ?? null);
    setLoading(false);
  };

  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <CategoryCard
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        {loading && items.length === 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-full aspect-[9/11] rounded-2xl bg-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-600 max-w-xl mx-auto text-base sm:text-lg">
            У цій категорії поки немає товарів. Спробуйте вибрати іншу або
            напишіть нам для індивідуального замовлення 💛
          </p>
        ) : (
          <>
            <ProductCard products={items} />

            {offset !== null && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="w-full sm:w-auto rounded-full bg-slate-800 px-8 py-3 text-white font-semibold hover:bg-slate-700 disabled:opacity-60"
                >
                  {loading ? "Завантаження..." : "Показати більше"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

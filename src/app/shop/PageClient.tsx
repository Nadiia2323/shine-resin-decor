"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { PageClientProps } from "@/types";

export default function PageClient({ categories, products }: PageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [selectedCategory]);

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
        {isLoading ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-full aspect-[9/11] rounded-2xl bg-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-slate-600 max-w-xl mx-auto text-base sm:text-lg">
            У цій категорії поки немає товарів. Спробуйте вибрати іншу або
            напишіть нам для індивідуального замовлення 💛
          </p>
        ) : (
          <ProductCard products={filteredProducts} />
        )}
      </section>
    </>
  );
}

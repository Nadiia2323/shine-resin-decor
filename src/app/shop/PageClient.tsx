"use client";
import React, { useState } from "react";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { PageClientProps } from "@/types";

export default function PageClient({ categories, products }: PageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <section className="px-8 pb-10">
        <CategoryCard categories={categories} onSelect={setSelectedCategory} />
      </section>

      <section className="pb-20 px-8">
        <ProductCard products={filteredProducts} />
      </section>
    </>
  );
}

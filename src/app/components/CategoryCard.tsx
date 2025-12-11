"use client";
import React, { useState } from "react";
import { CategoryCardProps } from "@/types";

export default function CategoryCard({
  categories,
  onSelect,
}: CategoryCardProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    onSelect(category);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4  ">
      {categories.map((category, index) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={index}
            onClick={() => handleCategory(category)}
            className={`
              px-6 py-3 rounded-full uppercase font-semibold tracking-wide text-sm
              transition-all duration-300 shadow-sm border backdrop-blur-md
              ${
                isActive
                  ? "bg-white text-slate-900 border-white shadow-xl scale-105"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40"
              }
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

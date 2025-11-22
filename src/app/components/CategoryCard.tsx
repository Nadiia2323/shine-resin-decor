"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CategoryCardProps } from "@/types";

const categoryImage =
  "https://res.cloudinary.com/dqgvmwnpl/image/upload/v1761499529/resin-shop/5210369_bphh79.jpg";

export default function CategoryCard({
  categories,
  onSelect,
}: CategoryCardProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    onSelect(category);
  };

  console.log("selectedCategory :>> ", selectedCategory);
  return (
    <div className="flex flex-wrap justify-center gap-6 pb-10">
      {categories?.map((category, index) => (
        <button
          onClick={() => handleCategory(category)}
          key={index}
          className={`
    relative w-48 h-28 rounded-xl overflow-hidden group shadow-lg 
    transition-transform duration-300
    hover:scale-105
    ${selectedCategory === category ? "scale-110" : ""}
  `}
        >
          <Image
            src={categoryImage}
            alt={category}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <span
            className={`
      absolute bottom-4 left-4 font-bold uppercase px-2 py-1 rounded-md transition-all
      ${
        selectedCategory === category
          ? "bg-white/90 text-[#0e1538]"
          : "text-white"
      }
    `}
          >
            {category}
          </span>
        </button>
      ))}
      <div className="h-0.5 w-full bg-black shadow-inner"></div>
    </div>
  );
}

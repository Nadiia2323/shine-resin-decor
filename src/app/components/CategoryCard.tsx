"use client";
import React from "react";
import Image from "next/image";

const categoryImage =
  "https://res.cloudinary.com/dqgvmwnpl/image/upload/v1761499529/resin-shop/5210369_bphh79.jpg";

export default function CategoryCard({ categories }) {
  console.log("categories (client):", categories);

  return (
    <div className="flex flex-wrap justify-center gap-6 pb-10">
      {categories?.map((category, index) => (
        <button
          key={index}
          className="relative w-48 h-28 rounded-xl overflow-hidden group shadow-lg hover:scale-105 transition-transform"
        >
          <Image
            src={categoryImage}
            alt={category}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span className="absolute bottom-4 left-4 text-white font-bold uppercase">
            {category}
          </span>
        </button>
      ))}
      <div className="h-0.5 w-full bg-black shadow-inner"></div>
    </div>
  );
}

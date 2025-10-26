import React from "react";
import { supabase } from "@/lib/supabase-client";
import Image from "next/image";

const categoryImage =
  "https://res.cloudinary.com/dqgvmwnpl/image/upload/v1761499529/resin-shop/5210369_bphh79.jpg";

export default async function CategoryCard() {
  const { data: products, error } = await supabase
    .from("products")
    .select("category");

  if (error) {
    console.error("Supabase error:", error.message);
    return (
      <p className="text-center text-red-500 mt-10">
        Помилка завантаження категорій
      </p>
    );
  }

  const uniqueCategories = Array.from(
    new Set(products?.map((p) => p.category).filter(Boolean))
  );
  const allCategories = ["All", ...uniqueCategories];

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 pb-10 ">
      {allCategories.map((category, index) => (
        <button
          key={index}
          className="relative w-48 h-28 rounded-xl overflow-hidden cursor-pointer group shadow-lg transition-all duration-300
            hover:scale-105 hover:shadow-2xl
            active:scale-95 active:shadow-inner"
        >
          <Image
            src={categoryImage}
            alt={category}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 192px"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <div className="absolute inset-0 flex items-end px-4 pb-3 z-20 pointer-events-none">
            <span className="text-white text-lg font-bold uppercase drop-shadow-lg">
              {category}
            </span>
          </div>

          <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
        </button>
      ))}
      <div className="h-0.5 w-full bg-black shadow-inner"></div>
    </div>
  );
}

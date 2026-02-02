"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RelatedProductsProps } from "@/types";

export default function RelatedProducts({
  relatedProducts,
}: RelatedProductsProps) {
  console.log("relatedProducts :>> ", relatedProducts);
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        Схожі товари
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {relatedProducts.map((item) => {
          console.log("item :>> ", item);
          const mainImage = item.product_images?.[0]?.url ?? "/placeholder.png";

          return (
            <Link
              key={item.id}
              href={`/shop/${item.id}`}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-40">
                <Image
                  src={mainImage}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold text-slate-700 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-slate-500 text-sm mt-1">{item.price} ₴</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

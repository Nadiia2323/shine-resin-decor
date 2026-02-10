"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RelatedProductsProps } from "@/types";
import NoImagePlaceholder from "./NoImagePlaceholder";

export default function RelatedProducts({
  relatedProducts,
}: RelatedProductsProps) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  const getMainImage = (images?: { url: string; is_main?: boolean }[]) =>
    images?.find((img) => img.is_main)?.url ?? images?.[0]?.url ?? null;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4 sm:mb-6">
        Схожі товари
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {relatedProducts.map((item) => {
          const mainImage = getMainImage(item.product_images);

          return (
            <Link
              key={item.id}
              href={`/shop/${item.id}`}
              className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 transition
                         hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="relative w-full aspect-[4/3] bg-slate-100">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={item.name ?? "Product image"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <NoImagePlaceholder size="sm" label="" />
                )}
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

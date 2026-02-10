"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "@/types";
import NoImagePlaceholder from "./NoImagePlaceholder";

export default function ProductCard({ products }: ProductCardProps) {
  const getStatusBadgeClass = (status?: string) => {
    const base =
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide w-fit mb-2";
    const variants: Record<string, string> = {
      "в наявності": "bg-green-100 text-green-700",
      "під замовлення": "bg-amber-100 text-amber-700",
    };
    return `${base} ${variants[status ?? ""] ?? "bg-slate-200 text-slate-700"}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products?.map(({ status, id, name, price, product_images }) => {
        const mainImage =
          product_images?.find((img) => img.is_main)?.url ??
          product_images?.[0]?.url ??
          null;

        return (
          <Link
            href={`/shop/${id}`}
            key={id}
            className="group bg-white w-full rounded-2xl shadow-sm overflow-hidden border border-slate-100 transition
                       hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="relative w-full aspect-[4/3] bg-slate-100">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={name ?? "Product"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <NoImagePlaceholder size="md" label="" />
              )}
            </div>

            <div className="p-3 sm:p-4 text-center">
              {status && (
                <span className={getStatusBadgeClass(status)}>{status}</span>
              )}

              <h3 className="text-sm sm:text-lg font-semibold text-slate-700 line-clamp-2">
                {name}
              </h3>

              <p className="text-slate-500 mt-1 mb-3 sm:mb-4 text-sm sm:text-base">
                {price} ₴
              </p>

              <div className="flex justify-center">
                <span
                  className="inline-flex items-center justify-center bg-slate-800 text-white px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold
                                 group-hover:bg-slate-700 transition"
                >
                  Переглянути
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

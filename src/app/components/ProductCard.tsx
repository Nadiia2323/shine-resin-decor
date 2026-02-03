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
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
      {products?.map(({ status, id, name, price, product_images }) => {
        const mainImage =
          product_images?.find((img) => img.is_main)?.url ??
          product_images?.[0]?.url ??
          null;

        return (
          <Link
            href={`/shop/${id}`}
            key={id}
            className="bg-white w-72 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative w-full h-64 bg-slate-100">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={name}
                  fill
                  unoptimized
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <NoImagePlaceholder size="md" />
              )}
            </div>

            <div className="p-4 text-center">
              {status && (
                <span className={getStatusBadgeClass(status)}>{status}</span>
              )}
              <h3 className="text-lg font-semibold text-slate-700">{name}</h3>
              <p className="text-slate-500 mb-4">{price} ₴</p>

              <button className="bg-slate-800 text-white px-6 py-2 rounded-full text-sm hover:bg-slate-700 transition-all">
                Переглянути
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

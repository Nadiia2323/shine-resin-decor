import React from "react";
import { supabase } from "@/lib/supabase-client";
import { ProductPageProps } from "@/types";
import Navigation from "@/app/components/Navigation";
import Link from "next/link";
import ProductGallery from "@/app/components/ProductGallery";
import RelatedProducts from "@/app/components/RelatedProducts";
import { notFound } from "next/navigation";

export default async function Page({ params }: ProductPageProps) {
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!product) {
    notFound();
  }

  const images = product.images ?? [];

  const { data: categories } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category);

  const relatedProducts = (categories ?? [])
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  const getStatusBadgeClasses = (status?: string) => {
    const base =
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide w-fit";

    const variants: Record<string, string> = {
      "в наявності": "bg-green-100 text-green-700",
      "під замовлення": "bg-amber-100 text-amber-700",
    };

    const fallback = "bg-slate-200 text-slate-700";

    const variant = variants[status ?? ""] ?? fallback;

    return `${base} ${variant}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-400 via-slate-100 to-slate-200">
      <Navigation />

      <section className="flex flex-row space-x-4 mx-auto px-6 py-20">
        <div className="flex items-center justify-center">
          <Link
            href="/shop"
            className="inline-flex text-right text-sm text-slate-700 hover:text-slate-900"
          >
            ← Назад до магазину
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/70 px-4 py-6 sm:px-8 sm:py-10 grid gap-6 md:grid-cols-2 items-start">
          <ProductGallery images={images} name={product.name} />

          <div className="flex flex-col gap-5">
            {product.category && (
              <span className="inline-flex items-center rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 uppercase tracking-wide w-fit">
                {product.category}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
            <span className={getStatusBadgeClasses(product.status)}>
              {product.status}
            </span>

            <p className="text-2xl font-semibold text-slate-800">
              {product.price} ₴
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Унікальний виріб з епоксидної смоли, створений вручну з любовʼю.
              Кожен елемент – це маленький витвір мистецтва, який стане акцентом
              у вашому інтерʼєрі або особливим подарунком.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://t.me/your_telegram_username"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-6 py-2.5 text-sm font-semibold shadow-lg hover:bg-slate-800 transition-transform hover:scale-105"
              >
                Замовити в Telegram
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 transition-colors"
              >
                Поставити запитання
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Якщо ви мрієте про індивідуальний дизайн, напишіть нам – ми з
              радістю створимо щось саме для вас ✨
            </p>
          </div>
        </div>
      </section>

      <RelatedProducts relatedProducts={relatedProducts} />
    </main>
  );
}

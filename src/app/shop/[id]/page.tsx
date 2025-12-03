import React from "react";
import { supabase } from "@/lib/supabase-client";
import { ProductPageProps } from "@/types";
import Navigation from "@/app/components/Navigation";
import Link from "next/link";
import ProductGallery from "@/app/components/ProductGallery";

export default async function Page({ params }: ProductPageProps) {
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  console.log("product :>> ", product);

  const images = product?.images ?? [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-400 via-slate-100 to-slate-200">
      <Navigation />

      {product ? (
        <section className="max-w-5xl mx-auto px-6 py-10 lg:py-16">
          <div className="mb-6">
            <Link
              href="/shop"
              className="inline-flex items-center text-sm text-slate-700 hover:text-slate-900"
            >
              ← Назад до магазину
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/70 px-4 py-6 sm:px-8 sm:py-10 grid gap-10 md:grid-cols-[1.2fr,1fr] items-center">
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

              <p className="text-2xl font-semibold text-slate-800">
                {product.price} ₴
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Унікальний виріб з епоксидної смоли, створений вручну з любовʼю.
                Кожен елемент – це маленький витвір мистецтва, який стане
                акцентом у вашому інтерʼєрі або особливим подарунком.
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
      ) : (
        <section className="grid min-h-[70vh] place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-cyan-600">404</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              На жаль, ми не знайшли цей товар. Можливо, його вже придбали.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/shop"
                className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Повернутись до магазину
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

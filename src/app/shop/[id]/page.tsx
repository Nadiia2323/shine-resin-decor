import { createSupabaseServerClient } from "@/lib/supabase-server";
import { ProductPageProps } from "@/types";
import Navigation from "@/app/components/Navigation";
import Link from "next/link";
import ProductGallery from "@/app/components/ProductGallery";
import RelatedProducts from "@/app/components/RelatedProducts";
import { notFound } from "next/navigation";
import OptionsPreview from "@/app/admin/_components/OptionsPreview";

export default async function Page({ params, searchParams }: ProductPageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const from = sp?.from;
  const backHref = from === "admin" ? "/admin" : "/shop";

  const productId = Number(id);
  if (!Number.isFinite(productId)) notFound();

  const supabase = await createSupabaseServerClient();

  const { data: product } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (id,url,public_id,position,is_main)
    `,
    )
    .eq("id", productId)
    .order("position", { referencedTable: "product_images", ascending: true })
    .single();

  if (!product) notFound();

  const images = product.product_images ?? [];

  const { data: relatedRaw } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      price,
      status,
      category,
      product_images (url,position,is_main)
    `,
    )
    .eq("category", product.category)
    .neq("id", product.id)
    .order("is_main", { referencedTable: "product_images", ascending: false })
    .limit(4);

  const getStatusBadgeClasses = (status?: string) => {
    const base =
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide w-fit";

    const variants: Record<string, string> = {
      "в наявності": "bg-green-100 text-green-700",
      "під замовлення": "bg-amber-100 text-amber-700",
    };

    return `${base} ${variants[status ?? ""] ?? "bg-slate-200 text-slate-700"}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-400 via-slate-100 to-slate-200">
      <Navigation />

      <section className="mx-auto px-6 py-20 max-w-7xl">
        <Link
          href={backHref}
          className="inline-flex mb-6 text-sm text-slate-700 hover:text-slate-900"
        >
          ← Назад
        </Link>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/70 px-4 py-6 sm:px-8 sm:py-10 grid gap-8 md:grid-cols-2 items-start">
          <ProductGallery images={images} name={product.name} />

          <div className="flex flex-col gap-5">
            {product.category && (
              <span className="inline-flex w-fit rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 uppercase tracking-wide">
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
              {product.description}
            </p>

            {product.options?.length > 0 && (
              <div className="rounded-2xl bg-slate-50/80 border border-slate-200 px-4 py-3">
                <OptionsPreview
                  options={product.options}
                  title="Додаються за бажанням"
                />
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://t.me/evd_kriss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-6 py-2.5 text-sm font-semibold shadow-lg hover:bg-slate-800 transition-transform hover:scale-105"
              >
                Замовити в Telegram
              </a>

              <a
                href="https://t.me/evd_kriss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 transition-colors"
              >
                Поставити запитання
              </a>
            </div>

            <p className="text-xs text-slate-500">
              Якщо ви мрієте про індивідуальний дизайн, напишіть нам — ми з
              радістю створимо щось саме для вас ✨
            </p>
          </div>
        </div>
      </section>

      <RelatedProducts relatedProducts={relatedRaw ?? []} />
    </main>
  );
}

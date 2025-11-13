"use client";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
};
type ProductCardProps = {
  products: Product[];
};

export default function ProductCard({ products }: ProductCardProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
      {products?.map(({ id, name, price, images }) => {
        const mainImage =
          images && images.length > 0 ? images[0] : "/placeholder.png";

        return (
          <Link
            href={`/shop/${id}`}
            key={id}
            className="bg-white w-72 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative w-full h-64">
              <Image
                src={mainImage}
                alt={name}
                fill
                unoptimized
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 text-center">
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

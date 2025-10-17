import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard() {
  const products = [
    {
      id: 1,
      name: "Годинник Aurora",
      price: "1200 ₴",
      image: "https://picsum.photos/400/400?random=1",
    },
    {
      id: 2,
      name: "Картина Ocean Dream",
      price: "2400 ₴",
      image: "https://picsum.photos/400/400?random=2",
    },
    {
      id: 3,
      name: "Ялинкова прикраса Snowlight",
      price: "350 ₴",
      image: "https://picsum.photos/400/400?random=3",
    },
    {
      id: 4,
      name: "Стіл із епоксидної смоли",
      price: "7000 ₴",
      image: "https://picsum.photos/400/400?random=4",
    },
  ];

  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
      {products.map(({ id, name, price, image }) => (
        <Link
          href={`/shop/${id}`}
          key={id}
          className="bg-white w-72 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative w-full h-64">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-slate-700">{name}</h3>
            <p className="text-slate-500 mb-4">{price}</p>
            <button className="bg-slate-800 text-white px-6 py-2 rounded-full text-sm hover:bg-slate-700 transition-all">
              Переглянути
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

import React from "react";
import Image from "next/image";

export default function CategoryCard() {
  const categories = [
    {
      id: 1,
      name: "Всі вироби",
      image: "https://placehold.co/400x300?text=All",
    },
    {
      id: 2,
      name: "Годинники",
      image: "https://placehold.co/400x300?text=Clock",
    },
    {
      id: 3,
      name: "Картини",
      image: "https://placehold.co/400x300?text=Painting",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {categories.map(({ id, name, image }) => (
        <div
          key={id}
          className="relative w-72 h-48 overflow-hidden rounded-2xl shadow-md hover:shadow-xl cursor-pointer group"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-4 text-white font-semibold text-lg tracking-wide">
            {name}
          </div>
        </div>
      ))}
    </div>
  );
}

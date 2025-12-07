"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasImages = images && images.length > 0;
  const mainImage = hasImages ? images[activeIndex] : "/placeholder.png";

  return (
    <div className="flex flex-col gap-4 ">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover w-100 transition-transform duration-500 hover:scale-105"
        />
      </div>

      {hasImages && images.length > 1 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`
                relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border 
                transition-all duration-200
                ${
                  index === activeIndex
                    ? "border-cyan-500 ring-2 ring-cyan-300"
                    : "border-slate-200 hover:border-slate-400"
                }
              `}
            >
              <Image
                src={img}
                alt={`${name} preview ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

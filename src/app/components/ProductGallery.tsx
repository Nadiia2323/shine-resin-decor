"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import NoImagePlaceholder from "./NoImagePlaceholder";

type ProductImage = {
  id: number;
  url: string;
  public_id: string;
  position: number;
  is_main: boolean;
};

type ProductGalleryProps = {
  images: ProductImage[];
  name: string;
};

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const sortedImages = useMemo(() => {
    const list = [...(images ?? [])];
    list.sort((a, b) => {
      const aMain = a.is_main ? 1 : 0;
      const bMain = b.is_main ? 1 : 0;
      if (aMain !== bMain) return bMain - aMain;
      return (a.position ?? 0) - (b.position ?? 0);
    });
    return list;
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  const hasImages = sortedImages.length > 0;
  const mainImage = hasImages ? sortedImages[activeIndex]?.url : null;

  useEffect(() => {
    if (!sortedImages.length) return;
    const mainIndex = sortedImages.findIndex((img) => img.is_main);
    setActiveIndex(mainIndex !== -1 ? mainIndex : 0);
  }, [sortedImages]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <NoImagePlaceholder size="lg" />
        )}
      </div>

      {hasImages && sortedImages.length > 1 && (
        <div className="-mx-1 px-1">
          <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
            {sortedImages.map((img, index) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border transition-all duration-200 snap-start
                  ${
                    index === activeIndex
                      ? "border-cyan-500 ring-2 ring-cyan-300"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
              >
                <Image
                  src={img.url}
                  alt={`${name} preview ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

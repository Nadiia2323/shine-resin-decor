"use client";
import React, { useState } from "react";
import Image from "next/image";

type ImagesProps = {
  images: string[];
};

export default function PreviewForm({ images }: ImagesProps) {
  const safeImages = images?.length ? images : ["/placeholder.png"];
  const [activeImage, setActiveImage] = useState(safeImages[0]);
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Preview</h2>
        <span className="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 px-2 py-0.5 text-xs font-semibold">
          Draft
        </span>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative  aspect-square bg-slate-100">
          <Image
            alt=""
            src={activeImage}
            width={600}
            height={600}
            className=" w-full h-full object-cover"
            priority
          />
        </div>
        {safeImages.length > 1 && (
          <div className="flex gap-2 py-4 px-2">
            {safeImages.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`
                relative h-16 w-16 rounded-xl overflow-hidden border
                ${
                  activeImage === img
                    ? "border-cyan-400 ring-2 ring-cyan-200"
                    : "border-slate-200 hover:border-slate-400"
                }
              `}
              >
                {" "}
                <Image
                  src={img}
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 px-2 py-0.5 text-xs font-semibold">
              clocks
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">
              в наявності
            </span>
          </div>

          <p className="text-base font-bold text-slate-900">Годинник Ukraine</p>

          <p className="text-sm text-slate-500 line-clamp-3">
            Унікальний виріб з епоксидної смоли, створений вручну з любовʼю.
          </p>

          <div className="flex items-center justify-between pt-2">
            <p className="text-lg font-bold text-slate-900">1200 ₴</p>
            <a
              //   href="/shop/1"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700
                                       hover:bg-slate-50 active:scale-[0.98] transition"
            >
              Open in shop
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

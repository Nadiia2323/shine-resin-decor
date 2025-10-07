import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="flex justify-between items-center px-10 py-2">
        {/* Логотип и название */}
        <div className="flex items-center gap-3">
          <Image
            src="https://res.cloudinary.com/dqgvmwnpl/image/upload/v1759690939/posts/1500648_ukb9dp.svg"
            alt="Ukraine"
            width={40}
            height={40}
            className="drop-shadow-md"
          />
          <div>
            <h1 className="text-white text-3xl font-bold tracking-wide leading-tight">
              Shine
            </h1>
            <p className="text-sm text-cyan-200 uppercase tracking-widest">
              resin decor
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-10 text-white font-medium">
          <Link href="/" className="hover:text-cyan-300 transition-colors">
            Головна
          </Link>
          <Link href="/shop" className="hover:text-cyan-300 transition-colors">
            Магазин
          </Link>
          <Link href="/about" className="hover:text-cyan-300 transition-colors">
            Про нас
          </Link>
          <Link
            href="/contact"
            className="hover:text-cyan-300 transition-colors"
          >
            Контакти
          </Link>
        </div>
      </div>
    </nav>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/shop", label: "Магазин" },
  { href: "/#about", label: "Про нас" },
  { href: "/#contact", label: "Контакти" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  // Закрывать меню при переходе по ссылке
  const close = () => setOpen(false);

  // Блокируем скролл страницы, когда меню открыто
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Закрывать по Esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="flex justify-between items-center px-4 sm:px-6 py-2">
        <Link href="/" className="cursor-pointer" onClick={close}>
          <div className="flex items-center gap-3">
            <Image
              src="https://res.cloudinary.com/dqgvmwnpl/image/upload/v1759690939/posts/1500648_ukb9dp.svg"
              alt="Ukraine"
              width={36}
              height={36}
              className="drop-shadow-md"
              priority
            />
            <div className="leading-tight">
              <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-wide">
                Shine
              </h1>
              <p className="text-xs sm:text-sm text-cyan-200 uppercase tracking-widest">
                resin decor
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-10 text-white font-medium">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-cyan-300 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-white hover:bg-white/10 active:scale-95 transition"
        >
          {open ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile overlay + panel */}
      {open && (
        <div className="md:hidden">
          {/* overlay */}
          <button
            aria-label="Close menu overlay"
            onClick={close}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* panel */}
          <div className="fixed top-[56px] left-0 right-0 bg-slate-900/80 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className="rounded-xl px-4 py-3 text-white font-semibold hover:bg-white/10 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

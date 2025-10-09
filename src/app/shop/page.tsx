"use client";

import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Shop() {
  const categories = [
    { name: "Годинники", image: "https://placehold.co/300x200?text=Clock" },
    {
      name: "Ялинкові прикраси",
      image: "https://placehold.co/300x200?text=Toy",
    },
    { name: "Картини", image: "https://placehold.co/300x200?text=Painting" },
    { name: "Інше", image: "https://placehold.co/300x200?text=Other" },
  ];

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
    <section
      id="shop"
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-gray-800"
    >
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-12"
        >
          Каталог Shine
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16"
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-white text-lg font-semibold tracking-wide group-hover:scale-110 transition-transform">
                  {cat.name}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 flex flex-col items-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {p.name}
                </h3>
                <p className="text-cyan-600 font-bold mt-1">{p.price}</p>
                <button className="mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:scale-105 transition-all">
                  <ShoppingCartIcon className="w-5 h-5" /> У кошик
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center mt-20"
        >
          <Link
            href="/custom-order"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold text-lg shadow-lg hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300"
          >
            Індивідуальне замовлення
          </Link>
        </motion.div>
      </main>

      <Footer />
    </section>
  );
}

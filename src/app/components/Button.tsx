import Link from "next/link";
import React from "react";

export default function Button() {
  return (
    <Link href="/shop">
      <button className=" px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-lg font-semibold shadow-lg hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300">
        Переглянути товар
      </button>
    </Link>
  );
}

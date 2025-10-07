import React from "react";
import {
  ShieldCheckIcon,
  LightBulbIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 text-white py-1 px-6 mt-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-around gap-">
        <div className="flex items-start gap-3">
          <ShieldCheckIcon className="w-7 h-7 text-cyan-400" />
          <div>
            <h2 className="font-semibold text-lg">Висока якість</h2>
            <p className="text-gray-200 text-sm">Довговічні матеріали</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <GlobeAsiaAustraliaIcon className="w-7 h-7 text-emerald-400" />
          <div>
            <h2 className="font-semibold text-lg">Еко-дружні</h2>
            <p className="text-gray-200 text-sm">
              Стійкі та безпечні для природи
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <LightBulbIcon className="w-7 h-7 text-amber-400" />
          <div>
            <h2 className="font-semibold text-lg">Унікальний дизайн</h2>
            <p className="text-gray-200 text-sm">
              Креативність у кожній деталі
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-300 text-sm mt-8">
        © 2025 shine.resin_decor — Всі права захищено.
      </div>
    </footer>
  );
}

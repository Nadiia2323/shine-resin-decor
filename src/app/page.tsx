"use client";
import { motion } from "framer-motion";
import { PaperAirplaneIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

export default function Page() {
  return (
    <>
      <section id="hero">
        <div className="relative min-h-screen overflow-hidden text-white">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.8]"
          >
            <source
              src="https://res.cloudinary.com/dqgvmwnpl/video/upload/v1759864802/background_image/20072-307163785_small_mnwmo6.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 flex flex-col min-h-screen justify-between">
            <Navigation />

            <main className="flex flex-col items-center justify-center flex-1 text-center pt-24 sm:pt-28 px-4">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-[56px] sm:text-[90px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-400 drop-shadow-xl"
              >
                Shine
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="text-base sm:text-xl text-cyan-100 uppercase tracking-[0.22em] sm:tracking-[0.3em] mt-2"
              >
                resin decor
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-8 sm:mt-10 w-full flex justify-center"
              >
                <Button />
              </motion.div>
            </main>

            <Footer />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-20 sm:py-24 bg-gradient-to-b from-slate-400 via-slate-100 to-slate-200 text-gray-800 text-center"
      >
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 sm:mb-8 tracking-tight">
            Про нас
          </h2>

          <p className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 text-gray-600">
            Ми створюємо ексклюзивні годинники та картини з епоксидної смоли,
            які стануть окрасою вашого інтер’єру. Кожен виріб — це ручна робота,
            виконана з любов’ю та увагою до деталей. Наші роботи — не лише
            стильний елемент декору, а й унікальний подарунок для близьких,
            колег або освітніх закладів.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-gray-200">
            <h3 className="text-xl sm:text-2xl font-medium mb-4 text-cyan-700">
              Умови замовлення
            </h3>
            <ul className="text-left text-gray-700 list-disc list-inside space-y-2 text-sm sm:text-base">
              <li>
                Передоплата — <b>30%</b>, решта після готовності.
              </li>
              <li>
                Наложеного платежу <b>немає</b>.
              </li>
              <li>
                Повернення <b>немає</b> — індивідуальне замовлення.
              </li>
              <li>
                Термін виготовлення — <b>5–9 робочих днів</b>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 bg-gradient-to-b from-slate-900 to-black text-white"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 sm:mb-8 text-cyan-400 tracking-tight">
            Контакти
          </h2>

          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">
            Зв’яжіться з нами у будь-який зручний спосіб:
          </p>

          <div className="flex justify-center gap-6 sm:gap-10 mt-6">
            <a
              href="https://t.me/evd_kriss"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-800 hover:bg-cyan-500/10 transition"
            >
              <PaperAirplaneIcon className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 group-hover:text-cyan-300 transition" />
              <span className="sr-only">Telegram</span>
            </a>

            <a
              href="https://www.instagram.com/shine.resin_decor"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-800 hover:bg-pink-500/10 transition"
            >
              <Squares2X2Icon className="w-7 h-7 sm:w-8 sm:h-8 text-pink-400 group-hover:text-pink-300 transition" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

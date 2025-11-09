import Navigation from "../components/Navigation";

import ProductCard from "../components/ProductCard";
import CategoryCardServer from "../components/server/CategoryCardServer";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-400">
      <Navigation />

      <section className="text-center py-25">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-3">
          Переглянути товари
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Ознайомтесь із нашими виробами з епоксидної смоли. Кожен створений
          вручну з любов’ю 💫
        </p>
      </section>

      <section className="px-8 pb-10">
        <CategoryCardServer />
      </section>

      <section className="pb-20 px-8">
        <ProductCard />
      </section>

      <section className="text-center pb-24">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Не знайшли те, що шукали?
        </h2>
        <p className="text-slate-500 mb-6">
          Ми можемо створити виріб спеціально для вас 💛
        </p>
        <a
          href="https://t.me/your_telegram_username"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-slate-800 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-slate-700 transition-transform transform hover:scale-105"
        >
          Індивідуальне замовлення
        </a>
      </section>
    </main>
  );
}

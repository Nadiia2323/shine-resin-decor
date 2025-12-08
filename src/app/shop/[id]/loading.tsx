import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-400 via-slate-100 to-slate-200">
      <section className="flex flex-row gap-4 mx-auto px-6 py-20 w-full max-w-6xl">
        <div className="w-10 flex items-center justify-center flex-shrink-0">
          <div className="w-32 h-4 bg-slate-300/70 rounded-full animate-pulse" />
        </div>

        <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/70 px-4 py-6 sm:px-8 sm:py-10 grid gap-6 md:grid-cols-2 items-start">
          <div className="w-full h-84 sm:h-72 bg-slate-200 rounded-2xl animate-pulse" />

          <div className="flex flex-col gap-4">
            <div className="w-24 h-5 bg-slate-200 rounded-full animate-pulse" />
            <div className="w-3/4 h-7 bg-slate-200 rounded-full animate-pulse" />
            <div className="w-32 h-7 bg-slate-200 rounded-full animate-pulse" />
            <div className="w-full h-20 bg-slate-200 rounded-xl animate-pulse" />
            <div className="w-48 h-10 bg-slate-200 rounded-full animate-pulse" />
            <div className="w-40 h-10 bg-slate-200 rounded-full animate-pulse" />
          </div>
        </div>
      </section>
    </main>
  );
}

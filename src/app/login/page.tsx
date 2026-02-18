import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen grid place-items-center bg-gradient-to-b from-slate-400 via-slate-100 to-slate-200 px-6">
          <div className="w-full max-w-sm rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/70 shadow-xl p-6">
            Loading...
          </div>
        </main>
      }
    >
      <LoginClient />
    </Suspense>
  );
}

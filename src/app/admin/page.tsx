import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import AdminLogoutButton from "./AdminLogoutButton";

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log("user :>> ", user);

  if (userError) {
    console.error("auth.getUser error:", userError.message);
  }

  if (!user) redirect("/login");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("profiles select error:", profileError.message);
    redirect("/");
  }

  if (!profile || profile.role !== "admin") redirect("/");

  const { data: products, error } = await supabase
    .from("products")
    .select("id,name,price,status,category")
    .order("name", { ascending: true });

  if (error) {
    return <p className="text-red-600">Admin error: {error.message}</p>;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin</h1>
            <p className="text-sm text-slate-500">Products overview</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                placeholder="Search by name…"
                className="w-full sm:w-72 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm outline-none
                       focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                ⌘K
              </span>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm
                     hover:bg-slate-800 active:scale-[0.98] transition"
            >
              + Add product
            </button>

            <AdminLogoutButton />
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
            <p className="text-xs text-slate-500">All products</p>
            <p className="text-2xl font-bold text-slate-900">
              {products?.length ?? 0}
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
            <p className="text-xs text-slate-500">В наявності</p>
            <p className="text-2xl font-bold text-slate-900">
              {products?.filter((p) => p.status === "в наявності").length ?? 0}
            </p>
            <span className="mt-2 inline-flex rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">
              Green
            </span>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
            <p className="text-xs text-slate-500">Під замовлення</p>
            <p className="text-2xl font-bold text-slate-900">
              {products?.filter((p) => p.status === "під замовлення").length ??
                0}
            </p>
            <span className="mt-2 inline-flex rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-semibold">
              Amber
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Product</th>
                  <th className="px-5 py-3 text-left font-semibold">
                    Category
                  </th>
                  <th className="px-5 py-3 text-left font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Price</th>
                  <th className="px-5 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {products?.map((p) => {
                  const statusBase =
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide";
                  const statusClass =
                    p.status === "в наявності"
                      ? "bg-green-100 text-green-700"
                      : p.status === "під замовлення"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-200 text-slate-700";

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                            {/* <img
                              src={p.images?.[0]}
                              alt=""
                              className="h-full w-full object-cover"
                            /> */}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate">
                              {p.name}
                            </p>
                            <p className="text-xs text-slate-500">ID: {p.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        <span className="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 px-2 py-0.5 text-xs font-semibold">
                          {p.category ?? "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`${statusBase} ${statusClass}`}>
                          {p.status ?? "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-slate-900">
                        {p.price} ₴
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700
                                   hover:bg-slate-50 active:scale-[0.98] transition"
                          >
                            View
                          </button>
                          <button
                            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700
                                   hover:bg-slate-50 active:scale-[0.98] transition"
                          >
                            Edit
                          </button>
                          <button
                            className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700
                                   hover:bg-red-100 active:scale-[0.98] transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {(!products || products.length === 0) && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      No products yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || user.email !== adminEmail) redirect("/");

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
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Admin</h1>
            <p className="text-sm text-slate-500">Products overview</p>
          </div>
        </header>

        <div className="rounded-2xl bg-white shadow border border-slate-200 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((p) => (
                <tr key={p.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {p.category ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {p.status ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-800">
                    {p.price} ₴
                  </td>
                </tr>
              ))}

              {(!products || products.length === 0) && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-slate-400"
                  >
                    No products yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

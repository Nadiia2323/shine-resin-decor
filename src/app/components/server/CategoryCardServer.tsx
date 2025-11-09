import { supabase } from "@/lib/supabase-client";
import CategoryCard from "../CategoryCard";

export default async function CategoryCardServer() {
  const { data: products, error } = await supabase
    .from("products")
    .select("category");

  if (error) {
    console.error(error);
    return <p>Помилка при загрузці катерогій</p>;
  }

  const uniqueCategories = Array.from(
    new Set(products?.map((p) => p.category).filter(Boolean))
  );
  const allCategories = ["All", ...uniqueCategories];

  return <CategoryCard categories={allCategories} />;
}

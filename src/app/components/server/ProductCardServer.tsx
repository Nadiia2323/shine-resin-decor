import React from "react";
import { supabase } from "@/lib/supabase-client";
import ProductCard from "../ProductCard";

export default async function ProductCardServer() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    return <p>Something went wrong</p>;
  }

  return <ProductCard products={products} />;
}

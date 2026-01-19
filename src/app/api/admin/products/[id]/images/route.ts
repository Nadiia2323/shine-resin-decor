import { NextResponse } from "next/server";
import { addProductImages } from "@/lib/products";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const productId = Number(params.id);
  const { images } = await req.json();
  return NextResponse.json(await addProductImages(productId, images));
}

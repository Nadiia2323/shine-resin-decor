import { NextResponse } from "next/server";
import { addProductImages } from "@/lib/products";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (!Number.isFinite(productId) || productId <= 0) {
    return NextResponse.json(
      { error: `Invalid productId param: "${id}"` },
      { status: 400 }
    );
  }

  const { images } = await req.json();
  return NextResponse.json(await addProductImages(productId, images));
}



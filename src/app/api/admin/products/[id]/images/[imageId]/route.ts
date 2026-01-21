import { NextResponse } from "next/server";
import { deleteProductImage } from "@/lib/products";

type RouteContext = {
  params: Promise<{ id: string; imageId: string }>;
};

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { id, imageId } = await params;

  const productId = parseInt(id, 10);
  if (!Number.isFinite(productId) || productId <= 0) {
    return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
  }

  if (!imageId) {
    return NextResponse.json({ error: "Invalid imageId" }, { status: 400 });
  }

  return NextResponse.json(await deleteProductImage(productId, imageId));
}



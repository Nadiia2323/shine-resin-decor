import { NextResponse } from "next/server";
import { deleteProductImage } from "@/lib/products";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string; imageId: string } }
) {
  const productId = Number(params.id);
  return NextResponse.json(await deleteProductImage(productId, params.imageId));
}

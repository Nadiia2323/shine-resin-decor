import { NextResponse } from "next/server";
import { createCloudinarySignature } from "@/lib/cloudinary";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const productId = Number(params.id);
  return NextResponse.json(await createCloudinarySignature(productId));
}

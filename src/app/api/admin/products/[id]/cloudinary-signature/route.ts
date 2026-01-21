import { NextResponse } from "next/server";
import { createCloudinarySignature } from "@/lib/cloudinary";

export async function GET(
  _req: Request,
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

  return NextResponse.json(await createCloudinarySignature(productId));
}



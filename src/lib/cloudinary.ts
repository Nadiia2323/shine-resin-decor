import crypto from "crypto";

export async function createCloudinarySignature(productId: number) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  if (!Number.isInteger(productId) || productId <= 0) {
    throw new Error("Invalid productId");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = `resin-shop/products/${productId}`;

  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  return { cloudName, apiKey, timestamp, folder, signature };
}

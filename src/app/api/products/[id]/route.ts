import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });

    const price = product.default_price as Stripe.Price;
    const unitAmount = price?.unit_amount || 0;
    const currency = (price?.currency || "ngn").toUpperCase();

    const formattedPrice =
      currency === "NGN"
        ? `₦${(unitAmount / 100).toLocaleString()}`
        : `${currency} ${(unitAmount / 100).toFixed(2)}`;

    const formattedProduct = {
      id: product.id,
      name: product.name,
      price: formattedPrice,
      originalPrice: product.metadata?.original_price || null,
      rating: parseFloat(product.metadata?.rating || "4.5"),
      reviews: parseInt(product.metadata?.reviews || "0"),
      isNew: product.metadata?.is_new === "true",
      isSale: product.metadata?.is_sale === "true",
      colors: product.metadata?.colors?.split(",") || ["black"],
      category: product.metadata?.category || "Uncategorized",
      description: product.description || "",
      images: product.images || [],
      stripeProductId: product.id,
      stripePriceId: price?.id,
    };

    return NextResponse.json({ success: true, product: formattedProduct });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

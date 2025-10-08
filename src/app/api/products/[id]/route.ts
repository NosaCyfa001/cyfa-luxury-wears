export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";

// ✅ Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function GET(
  context: { params: Promise<{ id: string }> } // ✅ Required for Next.js 15
) {
  // ✅ Await params (new requirement in Next.js 15)
  const { id } = await context.params;

  try {
    // Fetch product details from Stripe
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });

    // Extract price information
    const price = product.default_price as Stripe.Price;
    const unitAmount = price?.unit_amount || 0;
    const currency = (price?.currency || "ngn").toUpperCase();

    // Format the price for NGN or other currencies
    const formattedPrice =
      currency === "NGN"
        ? `₦${(unitAmount / 100).toLocaleString()}`
        : `${currency} ${(unitAmount / 100).toFixed(2)}`;

    // Format product details for the frontend
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

    // ✅ Return success response
    return NextResponse.json({
      success: true,
      product: formattedProduct,
    });
  } catch (error) {
    console.error("Error fetching product:", error);

    // ❌ Return error response
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

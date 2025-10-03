import Stripe from "stripe";
import { NextResponse } from "next/server";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set.");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {});

export async function GET() {
  try {
    // Fetch active products (expand price info)
    const products = await stripe.products.list({
      active: true,
      expand: ["data.default_price"],
      limit: 100,
    });

    // Transform into frontend-friendly format
    const formattedProducts = products.data.map((product) => {
      const price = product.default_price; // type safety
      const unitAmount = price?.unit_amount || 0;
      const currency = (price?.currency || "ngn").toUpperCase();

      // Format for Naira (and fallback for other currencies)
      const formattedPrice =
        currency === "NGN"
          ? `₦${(unitAmount / 100).toLocaleString()}`
          : `${currency} ${(unitAmount / 100).toFixed(2)}`;

      return {
        id: product.id,
        name: product.name,
        price: formattedPrice,
        originalPrice: product.metadata?.original_price || null,
        rating: parseFloat(product.metadata?.rating || "4.5"),
        reviews: parseInt(product.metadata?.reviews || "0"),
        isNew: product.metadata?.is_new === "true",
        isSale: product.metadata?.is_sale === "true",
        colors: product.metadata?.colors?.split(",") || ["black"],
        category: product.metadata?.category || "Uncategorized", // ✅ ADD THIS
        description: product.description || "",
        images: product.images || [],
        stripeProductId: product.id,
        stripePriceId: price?.id,
      };
    });

    return NextResponse.json({
      success: true,
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Error fetching products from Stripe:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

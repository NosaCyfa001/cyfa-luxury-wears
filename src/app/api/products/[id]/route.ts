/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ expects Promise now
) {
  const { id } = await context.params; // ✅ await the Promise

  try {
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const price =
      typeof product.default_price === "object" &&
      product.default_price !== null &&
      "unit_amount" in product.default_price
        ? (product.default_price.unit_amount as number) / 100
        : null;

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        price: price ? `₦${price.toLocaleString()}` : "N/A",
        description: product.description ?? null,
        images: product.images,
        stripePriceId:
          typeof product.default_price === "object"
            ? product.default_price.id
            : "",
      },
    });
  } catch (error) {
    console.error("Stripe product fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}


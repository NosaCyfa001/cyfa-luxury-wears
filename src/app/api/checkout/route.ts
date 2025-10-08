export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: string | number;
  quantity?: number;
}

export async function POST(req: Request) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    console.log("🔑 STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "Loaded ✅" : "Missing ❌");
    console.log("🌍 NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL || "❌ Missing");

    // Convert cart items to Stripe line items
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "ngn",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(
          typeof item.price === "string"
            ? parseFloat(item.price.replace(/[₦,]/g, "")) * 100
            : Number(item.price) * 100
        ),
      },
      quantity: item.quantity || 1,
    }));

    // ✅ Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    });

    // ✅ Important: define headers in the response — no post-mutation
    return NextResponse.json(
      { id: session.id, url: session.url },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("❌ Checkout error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      { error: errorMessage },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
}

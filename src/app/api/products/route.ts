import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {});

export async function GET() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
    }

    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });

    return NextResponse.json({ success: true, products: products.data });
  } catch (error: any) {
    console.error("❌ Stripe error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

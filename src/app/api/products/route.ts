export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;

    if (!secret) {
      console.error("❌ Missing STRIPE_SECRET_KEY in env");
      return NextResponse.json(
        { success: false, error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secret, {});

    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });

    return NextResponse.json({ success: true, products: products.data });
  } catch (error: any) {
    console.error("❌ Stripe Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

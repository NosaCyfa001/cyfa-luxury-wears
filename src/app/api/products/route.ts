/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = "nodejs"; // ensure Node.js runtime

import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("🚀 /api/products route hit");

  try {
    const secret = process.env.STRIPE_SECRET_KEY;

    console.log("🔑 STRIPE_SECRET_KEY:", secret ? "Loaded ✅" : "Missing ❌");

    if (!secret) {
      console.error("❌ Missing STRIPE_SECRET_KEY in env");
      return NextResponse.json(
        { success: false, error: "Missing STRIPE_SECRET_KEY" },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
    }

    const stripe = new Stripe(secret, {});

    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });

    return NextResponse.json(
      { success: true, products: products.data },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(
      "Stripe API error:",
      err instanceof Error ? err.message : err
    );

    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      },
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

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // Convert your cart items to Stripe line items
    const lineItems = items.map((item: any) => ({
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

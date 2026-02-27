import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1 } = await req.json();

    const product = getProduct(productId);
    if (!product || !product.available) {
      return NextResponse.json(
        { error: "Product not available" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
              images: [],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${product.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

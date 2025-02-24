import connectDB from "../../../../config/db";
import Subscription from "../../../../models/Subscription";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'

const stripeSecretKey: any = process.env.STRIPE_SECRET
const stripe: any = new Stripe(stripeSecretKey)

// Handle POST requests
export async function POST(req: NextRequest) {
  const { plan, email, userId } = await req.json()
  try {
    // Connect to the database
    await connectDB();

    // Retrieve or create customer to avoid duplicates
    let customer = (await stripe.customers.list({ email })).data[0];

    if (!customer) {
      customer = await stripe.customers.create({
        email,
        metadata: { userId },
      });
    }

    if (plan === "Platinum") {
      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID as string,
            quantity: 1,
          },
        ],
        customer: customer.id, // Attach the customer to avoid duplication
        success_url: process.env.STRIPE_SUCCESS_URL as string,
        cancel_url: process.env.STRIPE_FAILURE_URL as string,
        metadata: { userId },
      });

      return NextResponse.json(
        { message: "Proceed to payment", session },
        { status: 200 }
      );
    } else if (plan === "Free") {
      // Check if the customer exists on Stripe
      let customer = (await stripe.customers.list({ email })).data[0];

      if (!customer) {
        customer = await stripe.customers.create({
          email,
          metadata: { userId, plan: "Free" }, // Store plan in metadata
        });
      }

      // Handle Free Plan Subscription
      const subscription = await Subscription.findOne({ user: userId });

      if (subscription) {
        await Subscription.updateOne(
          { user: userId },
          { plan: "Free", status: "Free", amount: 0, customerId: customer.id }
        );
      } else {
        const newSubscription = new Subscription({
          user: userId,
          plan: "Free",
          status: "Free",
          customerId: customer.id, // Store Stripe Customer ID
        });

        await newSubscription.save();
      }

      return NextResponse.json({ message: "Free Plan Activated!" }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

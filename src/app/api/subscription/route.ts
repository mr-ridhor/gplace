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

    console.log(stripeSecretKey)

    // Update startDate and endDate only if the plan is 'Platinum'
    if (plan === 'Platinum') {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1
          }
        ],
        customer_email: email,
        metadata: {
          userId
        },
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_FAILURE_URL,
      })

      console.log(session)
      return NextResponse.json({ message: 'Proceed to payment', session }, { status: 200 });
    } else if (plan === 'Free') {
      const subscription = await Subscription.findOne({ user: userId })
      if (subscription) {
        await Subscription.updateOne({
          user: userId,
          plan: 'Free',
          status: 'Free',
          amount: 0,
        })
      } else {
        const subscription = new Subscription({
          user: userId,
          plan: 'Free',
          status: 'Free'
        })

        await subscription.save()
      }
      return NextResponse.json({ message: 'Free Plan Activated!' }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

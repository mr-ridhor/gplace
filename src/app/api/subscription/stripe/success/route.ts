import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'
import connectDB from "../../../../../../config/db";
import Subscription, { ISubscription } from "../../../../../../models/Subscription";

const stripeSecretKey: any = process.env.STRIPE_SECRET
const stripe: any = new Stripe(stripeSecretKey)

// Handle POST requests
export async function POST(req: NextRequest) {
    const { session_id } = await req.json()
    try {
        // Connect to the database
        await connectDB();

        // Update startDate and endDate only if the plan is 'Platinum'
        const session = await stripe.checkout.sessions.retrieve(session_id)
        if(session.payment_status !== 'paid' || session.status !== 'complete') return NextResponse.json({ message: 'Payment incomplete' }, { status: 200 });
        
        const subscription = await Subscription.findOne({ user: session.metadata.userId })

        if (subscription) {

            await Subscription.updateOne({ user: session.metadata.userId }, {
                user: session.metadata.userId,
                amount: session.amount_total,
                endDate: new Date(session.expires_at * 1000),
                startDate: new Date(session.created * 1000),
                plan: 'Platinum',
                status: 'Active'
            })
        } else {
            const subscription = new Subscription({
                user: session.metadata.userId,
                amount: session.amount_total,
                endDate: new Date(session.expires_at * 1000),
                startDate: new Date(session.created * 1000),
                plan: 'Platinum',
                status: 'Active'
            })

            await subscription.save()
        }

        console.log('success payment', session)
        return NextResponse.json({ session }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}

import connectDB from "../../../../config/db";
import Subscription from "../../../../models/Subscription";
import { NextRequest, NextResponse } from "next/server";

// Define the type for the request body
interface SubscriptionRequestBody {
  userId: string;
  plan: 'Free' | 'Platinum';
  startDate: string;
  endDate: string;
  amount: number;
}

// Handle POST requests
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Connect to the database
    await connectDB();

    // Parse the JSON body of the request
    const { userId, plan, startDate, endDate, amount }: SubscriptionRequestBody = await request.json();

    // Convert ISO strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Find or create a subscription
    let subscription = await Subscription.findOne({ user: userId });

    if (subscription) {
      // Update existing subscription
      subscription.amount = amount;
      subscription.plan = plan;

      // Update startDate and endDate only if the plan is 'Platinum'
      if (plan === 'Platinum') {
        subscription.startDate = start;
        subscription.endDate = end;
      }

      await subscription.save();
    } else {
      // Create new subscription
      subscription = await Subscription.create({
        user: userId,
        amount,
        plan,
        startDate: plan === 'Platinum' ? start : null,
        endDate: plan === 'Platinum' ? end : null,
      });
    }

    return NextResponse.json({ message: 'Subscription updated successfully', subscription }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

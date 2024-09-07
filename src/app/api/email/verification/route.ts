import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../../../config/db";
import User from "../../../../../models/User";

// Define the request body type
interface VerificationRequestBody {
  email: string;
  verificationCode: number;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Connect to the database
    await connectDB();

    // Parse the JSON body of the request
    const { email, verificationCode }: VerificationRequestBody = await request.json();

    
    // Find the user by email in the nested credentials object
    const user = await User.findOne({ 'credentials.email': email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if the verification code matches
    if (user.credentials.verificationCode?.toString() === verificationCode.toString()) {
      user.credentials.isVerified = true;
      user.credentials.verificationCode = undefined;
      await user.save();

      return NextResponse.json({ message: 'Email verified successfully', userId: user._id }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Error verifying code', error: error.message }, { status: 500 });
  }
}

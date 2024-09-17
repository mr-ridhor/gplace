import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../../../config/db";
import User, { IUser } from "../../../../../models/User";


export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the JSON body of the request
    const { email, verificationCode } = await request.json();

    
    // Find the user by email in the nested credentials object
    const user: IUser | any = await User.findOne({ 'credentials.email': email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const currentTime = new Date()

    // Check if the verification code matches
    if (user.credentials.passwordReset?.code == verificationCode && currentTime < user.credentials.passwordReset?.expiryDate) {
      user.credentials.passwordReset.expiryDate = undefined;
      user.credentials.passwordReset.code = undefined;
      await user.save();

      return NextResponse.json({ message: 'Password Reset successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Error verifying code', error: error.message }, { status: 500 });
  }
}

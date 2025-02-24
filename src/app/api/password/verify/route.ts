import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../../../config/db";
import User, { IUser } from "../../../../../models/User";
import { createActivityLog } from '../../../../../utils/ActivityLog';


export async function POST(request: NextRequest) {
  // Parse the JSON body of the request
  const { email, verificationCode } = await request.json();

  try {
    // Connect to the database
    await connectDB();

    const user: IUser | any = await User.findOne({ 'credentials.email': email });

    if (!user) {
      await createActivityLog("OTP Verification Failed", "User", `Failed attempt: No user found with email ${email}`);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const currentTime = new Date()

    // Check if the verification code matches
    if (user.credentials.passwordReset?.code == verificationCode && currentTime < user.credentials.passwordReset?.expiryDate) {
      await createActivityLog("OTP Verified", "User", `OTP successfully verified for ${email}`);
      return NextResponse.json({ message: 'OTP Verified' }, { status: 200 });
    } else {
      await createActivityLog("OTP Verification Failed", "User", `Invalid OTP attempt for ${email}`);
      return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
    }
  } catch (error: any) {
    await createActivityLog("OTP Verification Error", "User", `Error verifying OTP for ${email}: ${error.message}`);
    return NextResponse.json({ message: 'Error verifying code', error: error.message }, { status: 500 });
  }
}

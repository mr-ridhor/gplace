import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../../../config/db";
import User, { IUser } from "../../../../../models/User";
// import hashPassword from '../../../../../utils/hashPassword';
import bcrypt from 'bcrypt'
import { createActivityLog } from '../../../../../utils/ActivityLog';


export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the JSON body of the request
    const { email, verificationCode, newPassword } = await request.json();


    // Find the user by email in the nested credentials object
    const user: IUser | any = await User.findOne({ 'credentials.email': email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const validCode = new Date() < user.credentials.passwordReset?.expiryDate
    if (!user.credentials.passwordReset?.code == verificationCode && !validCode) {
      return NextResponse.json({ message: 'Invalid Verification Code' }, { status: 400 });
    }

    user.credentials.passwordReset.expiryDate = undefined;
    user.credentials.passwordReset.code = undefined;
    user.credentials.password = await bcrypt.hash(newPassword, 10)
    await user.save();

    // Log successful password reset
    await createActivityLog("Password Reset Successful", "User", `User with email ${email} successfully reset their password`);

    return NextResponse.json({ message: 'Password reset Successful' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: 'Error verifying code', error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import User, { IUser } from "../../../../models/User";
import transporter from "../../../../utils/transporter";
import connectDB from "../../../../config/db";

export async function POST(req: NextRequest) {
    await connectDB()

    const { email } = await req.json()

    if(!email) NextResponse.json({ message: 'Provide a valid email address'}, { status: 400 })

    const user: IUser | any = await User.findOne({ 'credentials.email': email })

    if (!user) NextResponse.json({ message: 'User not found'}, { status: 404 })

    const verificationCode = Math.floor(10000 + Math.random() * 90000);
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000);


    user.credentials.passwordReset.code = verificationCode
    user.credentials.passwordReset.expiryDate = expirationTime;
    await user.save()

    const mailOptions = {
        from: process.env.ADMIN_MAIL, // Sender address
        to: email, // Recipient email
        subject: "Your Verification Code", // Subject line
        text: `Your verification code is: ${verificationCode}`, // Plain text body
    };
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: 'OTP sent', expires: expirationTime }, { status: 200 })
}
import connectDB from "../../../../../config/db";
import User from "../../../../../models/User";
import transporter from "../../../../../utils/transporter";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { email } = await req.json();

    await connectDB();

    // Generate a verification code
    const user = await User.findOne({
      "credentials.email": email
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const verificationCode = Math.floor(10000 + Math.random() * 90000);

    // Assign the verification code and save the user
    user.credentials.verificationCode = verificationCode;
    await user.save();

    // Email options for verification code
    const mailOptions = {
        from: process.env.ADMIN_MAIL, // Sender address
        to: user.credentials.email, // Recipient email
        subject: "Your Verification Code", // Subject line
        text: `Your verification code is: ${verificationCode}`, // Plain text body
    };

    // Send the verification email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Verification code sent" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

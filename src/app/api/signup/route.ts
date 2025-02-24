import connectDB from "../../../../config/db";
import User from "../../../../models/User";
import transporter from "../../../../utils/transporter"; // Adjust the path if needed
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { createActivityLog } from "../../../../utils/ActivityLog";

export async function POST(req: NextRequest) {
  try {
    const { bio, company, team, credentials } = await req.json();

    await connectDB();

    // Generate a verification code
    const verificationCode = Math.floor(10000 + Math.random() * 90000);

    // Add the verification code to credentials before creating the user
    credentials.verificationCode = verificationCode;
    credentials.password = await bcrypt.hash(credentials.password, 10);

    // Create a new user with the verification code included
    const newUser = await User.create({
      bio,
      company,
      team,
      credentials,
    });

    // Email options for verification code
    const mailOptions = {
      from: process.env.ADMIN_MAIL, // Sender address
      to: newUser.credentials.email, // Recipient email
      subject: "Your Verification Code", // Subject line
      text: `Your verification code is: ${verificationCode}`, // Plain text body
    };

    // Send the verification email
    await transporter.sendMail(mailOptions);

    // Log activity (User Created)
    await createActivityLog(
      "Created User",
      "User",
      `User ${newUser.credentials.email} was created with verification code ${verificationCode}.`
    );

    return NextResponse.json(
      { message: "User created successfully and verification code sent" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

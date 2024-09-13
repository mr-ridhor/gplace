import connectDB from "../../../../config/db";
import User from "../../../../models/User";
// import transporter from "../../../../utils/transporter"; // Adjust the path if needed
// import mg from "../../../../utils/mailgun";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { bio, company, team, credentials } = await req.json();

    await connectDB();

    // Generate a verification code
    const verificationCode = Math.floor(10000 + Math.random() * 90000);

    // Add the verification code to credentials before creating the user
    credentials.verificationCode = verificationCode;

    // Create a new user with the verification code included
    const newUser = await User.create({
      bio,
      company,
      team,
      credentials,
    });

    // // Email options for verification code
    // const mailOptions = {
    //   from: process.env.ADMIN_MAIL, // Sender address
    //   to: newUser.credentials.email, // Recipient email
    //   subject: "Your Verification Code", // Subject line
    //   text: `Your verification code is: ${verificationCode}`, // Plain text body
    // };

    // mg.messages
    //   .create("sandbox011c4bce2719422796e9147ba253b308.mailgun.org", {
    //     from: "GoodPlace CRM <mailgun@sandbox011c4bce2719422796e9147ba253b308.mailgun.org>",
    //     to: newUser.credentials.email,
    //     subject: "Verification Code",
    //     text: "Testing some Mailgun awesomness!",
    //     html: `<h1>Your verification code is: ${verificationCode}</h1>`,
    //   })
    //   .then((msg: any) => console.log(msg)) // logs response data
    //   .catch((err: any) => console.error(err));

    // Send the verification email
    // transporter.sendMail(mailOptions, (error: any, info: any) => {
    //   if (error) {
    //     console.error("Error sending email:", error);
    //     return NextResponse.json(
    //       { message: "Error sending email", error: error.message },
    //       { status: 500 }
    //     );
    //   }

    // console.log(info);
    // });

    return NextResponse.json(
      { message: "User created successfully and verification code sent" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

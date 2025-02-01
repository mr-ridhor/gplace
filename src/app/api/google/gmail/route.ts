import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../config/db";
import { authOptions } from "../../../../../utils/authOptions";
import { getServerSession } from "next-auth";
import Investor from "../../../../../models/Investor";
import googleKey from "../../../../../utils/googleKey";
import { google } from "googleapis";
import Gmail, { IGmail } from "../../../../../models/Gmail";


export async function GET(req: NextRequest) {
    // const { emailAddress } = await req.json()
    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );

    try {
        await connectDB()
        const data = await getServerSession(authOptions)

        // if (!data || !data.user) {
        //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        // }

        const userEmail: any = await Gmail.findOne({ emailAddress: 'boro2dev@gmail.com' })
        if (!userEmail) return NextResponse.json({ message: 'No Synced Email' }, { status: 401 });

        oauth2Client.setCredentials({ refresh_token: userEmail.gmail.refresh_token });
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        const userMessages = await gmail.users.messages.list({
            userId: 'me', // 'me' refers to the authenticated user
            maxResults: 10, // Limit the number of results
        });

        const mails = userMessages.data.messages

        // console.log(mails)

        return NextResponse.json(mails, { status: 200 });

    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};



export async function POST(req: NextRequest) {
    const { to, subject, message, emailAddress } = await req.json();

    if (!to || !subject || !message) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );

    try {
        await connectDB();
        const data = await getServerSession(authOptions);

        if (!data || !data.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userEmail: any = await Gmail.findOne({ user: data.user.id, emailAddress, emailType: 'gmail' });
        if (!userEmail) return NextResponse.json({ message: 'No Synced Email' }, { status: 401 });
        const from = userEmail.gmail.emailAddress
        console.log(userEmail.gmail.emailAddress)

        oauth2Client.setCredentials({ refresh_token: userEmail.gmail.refresh_token });
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        var emailContent = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
            "MIME-Version: 1.0\n",
            "Content-Transfer-Encoding: 7bit\n",
            "to: ", to, "\n",
            "from: ", from, "\n",
            "subject: ", subject, "\n\n",
            message
        ].join('');

        var encodedMail = Buffer.from(emailContent).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');

        const response = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMail,
            },
        });

        return NextResponse.json({ message: 'Email sent successfully', data: response.data }, { status: 200 });

    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
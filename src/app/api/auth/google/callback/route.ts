import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../../config/db";
import { authOptions } from "../../../../../../utils/authOptions";
import { getServerSession } from "next-auth";
import { google } from "googleapis";
import Email from "../../../../../../models/Email";


export async function POST(req: NextRequest) {
    const { code } = await req.json()
    if (!code) {
        return NextResponse.json({ message: "code is required" }, { status: 404 });
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );

    try {
        await connectDB()
        const data = await getServerSession(authOptions)

        if (!data || !data.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { tokens } = await oauth2Client.getToken(code);
        // console.log(JSON.stringify(tokens))
        const { refresh_token, access_token, token_type, expiry_date } = tokens

        oauth2Client.setCredentials({ refresh_token });
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        const emailAddress = (await gmail.users.getProfile({ userId: 'me' })).data.emailAddress

        const email = new Email({
            user: data.user.id,
            gmail: {
                emailAddress,
                access_token,
                refresh_token,
                token_type,
                expiry_date,
                code
            }
        })

        await email.save()

        // console.log(email)

        return NextResponse.json({ message: "success" }, { status: 200 });

    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
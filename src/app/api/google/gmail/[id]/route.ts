import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import connectDB from "../../../../../../config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../utils/authOptions";
import Email, { IGmail } from "../../../../../../models/Gmail";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // const { emailAddress } = await req.json()
    
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
        const userEmail: IGmail | any = await Email.findOne({ user: data.user.id, emailAddress: 'boro2dev@gmail.com', emailType: 'gmail' })

        if (!userEmail) {
            return NextResponse.json({ message: 'Gmail Account not found' }, { status: 200 });
        }

        oauth2Client.setCredentials({ refresh_token: userEmail.gmail.refresh_token });
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        const mail = await gmail.users.messages.get({
            userId: 'me',
            id: params.id,
        });
        const mailData = mail.data

        return NextResponse.json(mailData, { status: 200 });

    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
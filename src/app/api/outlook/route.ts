import { NextRequest, NextResponse } from "next/server";
import Email, { IGmail } from "../../../../models/Gmail";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../utils/authOptions";
import connectDB from "../../../../config/db";
import { Client } from "@microsoft/microsoft-graph-client";
import OutlookAccount from "../../../../models/Outlook";

export async function GET(req: NextRequest) {
    await connectDB()
    const data = await getServerSession(authOptions);

    if (!data || !data.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // const { emailAddress } = await req.json()

    const email: any = await OutlookAccount.findOne({ user: data.user.id, username: 'boro2dev@hotmail.com' });

    if(!email) return NextResponse.json({ message: 'Outlook Account not found'}, { status: 404 });

    if(new Date(email.expires_in).getTime() < Date.now()) {
        return NextResponse.json({ message: 'Session expired! Login again'}, { status: 401 });
    }

    console.log(email.accessToken)
    try {

        const client = Client.init({
            authProvider: (done) => {
                done(null, email.accessToken);
            },
        });

        // Fetch the user's emails using the Microsoft Graph API
        const emails = await client.api("/me/messages").top(10).get();

        console.log(emails.value.length)
        return NextResponse.json(emails.value, { status: 200 }); // Explicitly return the response
        // return NextResponse.json({ message: 'working'}, { status: 200 }); // Explicitly return the response
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ message: error }, { status: 500 }); // Explicitly return the response
    }
}

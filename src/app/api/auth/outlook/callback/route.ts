import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../../utils/authOptions';
import axios from 'axios';
import { Client } from '@microsoft/microsoft-graph-client';
import { cca } from '../../../../../../config/outlook';
import connectDB from '../../../../../../config/db';
import OutlookAccount from '../../../../../../models/Outlook';

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const data = await getServerSession(authOptions);
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
        }

        if (!data || !data.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const tokenRequest: any = {
            redirectUri: process.env.MS_REDIRECT_URI,
            code: code.toString(),
            scopes: ['User.Read', 'Mail.Read', "offline_access"],
        };

        const tokenResponse: any = await cca.acquireTokenByCode(tokenRequest);

        // Log token response for debugging
        console.log(tokenResponse);

        const accountExist = await OutlookAccount.findOne({ username: tokenResponse.account.username })

        if (accountExist) {
            await OutlookAccount.updateOne({ user: data.user.id, username: tokenResponse.account.username}, {
                accessToken: tokenResponse.accessToken,
                expires_in: tokenResponse.extExpiresOn
            })
        } else {
            // Prepare the account data to be stored in the database
            const accountData = {
                accessToken: tokenResponse.accessToken,
                user: data.user.id,
                username: tokenResponse.account.username,
                expires_in: tokenResponse.extExpiresOn
            };

            // Save the account information to the database
            const newAuth = new OutlookAccount(accountData);
            await newAuth.save();
        }

        return NextResponse.json({ message: 'Account connected and saved to database!' }, { status: 200 });
    } catch (error: any) {
        console.error(error);

        return NextResponse.json({ error: 'Failed to exchange authorization code for tokens', details: error.response?.data || error.message }, { status: 500 });
    }
}


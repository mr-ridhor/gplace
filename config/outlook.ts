import { ConfidentialClientApplication } from "@azure/msal-node";
import { Client } from "@microsoft/microsoft-graph-client";

export const cca = new ConfidentialClientApplication({
    auth: {
        clientId: process.env.MS_CLIENT_ID as any,
        clientSecret: process.env.MS_CLIENT_SECRET,
        authority: 'https://login.microsoftonline.com/common',
    },
})


export async function refreshToken(account: any) {
    const silentResponse = await cca.acquireTokenSilent({
        account: account,
        scopes: ['User.Read', 'Mail.Read']
    });

    return silentResponse;
}


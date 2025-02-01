import { ConfidentialClientApplication, PublicClientApplication } from '@azure/msal-node';
import { NextResponse } from 'next/server';

export async function GET() {
  // Load environment variables
  const clientId = process.env.MS_CLIENT_ID as string; // Your Microsoft app Client ID
  const tenantId = process.env.MS_TENANT_ID as string; // Your Microsoft app Tenant ID
  const redirectUri = process.env.MS_REDIRECT_URI as string; // Redirect URI for your app
  // Optional: To request a refresh token for longer-term access

  if (!clientId || !tenantId || !redirectUri) {
    return NextResponse.json(
      { error: 'Environment variables are missing' },
      { status: 500 }
    );
  }

  const cca = new ConfidentialClientApplication({
    auth: {
      clientId: process.env.MS_CLIENT_ID as string,
      clientSecret: process.env.MS_CLIENT_SECRET as string,
      authority: 'https://login.microsoftonline.com/common',
    },
  });

  const authUri = await cca.getAuthCodeUrl({
    scopes: ["Mail.Read", "Mail.Send", "offline_access"],
    redirectUri,
    prompt: 'consent',
  })

  return NextResponse.json({ url: authUri });
}

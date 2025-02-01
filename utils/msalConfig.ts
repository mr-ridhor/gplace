// utils/msalConfig.ts
import { ConfidentialClientApplication, Configuration } from "@azure/msal-node";

const msalConfig: Configuration = {
    auth: {
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
        clientId: process.env.MS_CLIENT_ID as string,
        clientSecret: process.env.MS_CLIENT_SECRET as string,
    },
};

const msalClient = new ConfidentialClientApplication(msalConfig);

export default msalClient;

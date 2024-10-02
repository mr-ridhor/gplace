import NextAuth from "next-auth";
import { authOptions } from "../../../../../utils/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken, JWT } from "next-auth/jwt";

const handler = async (req: NextRequest, res: NextResponse) => {
    let maxAge = authOptions.session!.maxAge!;
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET as string,
    }) as unknown as JWT;

    if (token) {
        if(token.remember) maxAge = 30 * 24 * 60 * 60
    }

    return NextAuth(req as unknown as NextApiRequest, res as unknown as NextApiResponse, {
        ...authOptions,
        session: { maxAge }
    });
};
export { handler as GET, handler as POST };
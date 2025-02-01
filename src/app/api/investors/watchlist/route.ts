import { getServerSession } from "next-auth";
import connectDB from "../../../../../config/db";
import UserWatchlist from "../../../../../models/UserWatchlist";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../../utils/authOptions";
import Error from "next/error";
import Investor from "../../../../../models/Investor";

export async function POST(req: NextRequest) {
    await connectDB();
    const data = await getServerSession(authOptions);

    try {
        const { investorId } = await req.json();

        if (!data?.user.id || !investorId) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const watchlist = await UserWatchlist.findOne({ user: data?.user.id });

        if (!watchlist) {
            await UserWatchlist.create({ user: data?.user.id, investors: [investorId] });
            return NextResponse.json({ message: "Investor added to watchlist" }, { status: 201 });
        }

        if (watchlist.investors.includes(investorId)) {
            return NextResponse.json({ message: "Investor already in watchlist" }, { status: 400 });
        }

        watchlist.investors.push(investorId);
        await watchlist.save();

        return NextResponse.json({ message: "Investor added to watchlist" }, { status: 201 });
    } catch (error: Error | any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    await connectDB();
    const data = await getServerSession(authOptions);

    try {
        if (!data?.user || !data?.user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
        }

        const watchlist = await UserWatchlist.findOne({ user: data?.user.id })
        .populate({
            path: "investors",
            model: Investor,
        });

        if (!watchlist) {
            return NextResponse.json({ message: "No investors in watchlist" }, { status: 404 });
        }

        return NextResponse.json({ investors: watchlist.investors }, { status: 200 });
    } catch (error: Error | any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
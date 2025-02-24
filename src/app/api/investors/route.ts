// pages/api/investors/index.ts
import { NextResponse, NextRequest } from "next/server";
import Investor, { InvestorInterface, InvestorModel } from "../../../../models/Investor";
import User from "../../../../models/User";
import connectDB from "../../../../config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../utils/authOptions";
import { createActivityLog } from "../../../../utils/ActivityLog";
import UserWatchlist from "../../../../models/UserWatchlist";

// POST route to create a new Investor entry
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await getServerSession(authOptions);

    const { companyInfo, investmentBio, targetInfo, paidInfo, primaryContact, offeredPriceValuation } = await req.json();

    const user = await User.findById(data?.user.id).select("company");
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 500 });
    const valuation: number = offeredPriceValuation

    const { revenue, EBITDA, industry, industryType } = user.company;

    const clientMetrics = {
      revenue: revenue.ltm, // Client's latest revenue
      EBITDA: EBITDA.ltm, // Client's latest EBITDA
      industry,
      industryType
    };

    // Create a new investor instance
    const newInvestor = new Investor({
      // user: data?.user.id,
      companyInfo,
      investmentBio,
      targetInfo,
      paidInfo,
      offeredPrice: {
        valuation,
        revenue: parseFloat((valuation / user?.company.revenue.ltm).toFixed(1)),
        EBITDA: parseFloat((valuation / user?.company.EBITDA.ltm).toFixed(1)),
      },
      primaryContact,
      createdBy: "User",
      user: data?.user.id,
    });

    const matchScore = (Investor as InvestorModel).calculateMatchScore(clientMetrics, newInvestor);
    newInvestor.matchScore.totalScore = matchScore;
    await newInvestor.save(); // Sa

    // Save the new investor document
    await newInvestor.save();

    // Add new investor to user's watchlist
    let watchlist = await UserWatchlist.findOne({ user: data?.user.id });

    if (!watchlist) {
      // Create new watchlist if it doesn't exist
      watchlist = await UserWatchlist.create({ user: data?.user.id, investors: [newInvestor._id] });
    } else if (!watchlist.investors.includes(newInvestor._id)) {
      // Add investor to existing watchlist if not already present
      watchlist.investors.push(newInvestor._id);
      await watchlist.save();
    }

    // Log successful investor creation
    await createActivityLog(
      "Investor Added",
      "Investor",
      `Investor ${companyInfo.companyName} added by user ${data?.user.id}`
    );

    return NextResponse.json(
      { message: "Investor Added Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}



export async function GET(req: NextRequest) {
  try {
    // Ensure the database is connected
    await connectDB();

    // Get the user session
    const user = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract and validate query parameters
    const search = req.nextUrl.searchParams.get('search') || undefined;
    const country = req.nextUrl.searchParams.get('country') || undefined;
    const website = req.nextUrl.searchParams.get('website') || undefined;
    const industry = req.nextUrl.searchParams.get('industry') || undefined;
    const geo = req.nextUrl.searchParams.get('geo') || undefined;
    const dealsIn5Y = req.nextUrl.searchParams.get('dealsIn5Y') ? parseInt(req.nextUrl.searchParams.get('dealsIn5Y') as string, 10) : undefined;
    const dealSize = req.nextUrl.searchParams.get('dealSize') ? parseFloat(req.nextUrl.searchParams.get('dealSize') as string) : undefined;
    const contact = req.nextUrl.searchParams.get('contact') || undefined;
    const status = req.nextUrl.searchParams.get('status') || undefined;
    const match = req.nextUrl.searchParams.get('match') ? parseFloat(req.nextUrl.searchParams.get('match') as string) : undefined;

    // Create a dynamic query object to filter investors based on provided search parameters
    const query: Record<string, any> = { user: user?.user.id };

    // Apply filters if search parameters are present
    if (search) {
      query.$or = [
        { "companyInfo.companyName": new RegExp(search, 'i') },
        { "primaryContact.surname": new RegExp(search, 'i') },
        { "primaryContact.name": new RegExp(search, 'i') },
      ];
    }
    if (country) query["companyInfo.country"] = country;
    if (website) query["companyInfo.website"] = new RegExp(website, 'i');
    if (industry) query["investmentBio.industry"] = new RegExp(industry, 'i');
    if (geo) query["investmentBio.geography"] = new RegExp(geo, 'i');
    if (dealsIn5Y) query["investmentBio.dealsIn5Y"] = dealsIn5Y;
    if (dealSize) query["targetInfo.dealSize.to"] = { $gte: dealSize };
    if (contact) query["primaryContact.name"] = new RegExp(contact, 'i');
    if (status) query.status = status;
    if (match) query["matchScore.totalScore"] = { $gte: match };

    // Fetch the investors based on the query
    const investors: InvestorInterface[] = await Investor.find();

    // Return found investors
    return NextResponse.json(investors, { status: 200 });

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
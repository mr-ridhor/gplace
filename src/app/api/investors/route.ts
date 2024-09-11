// pages/api/investors/index.ts
import { NextResponse, NextRequest } from 'next/server';
import Investor from '../../../../models/Investor';
import User from '../../../../models/User';
import connectDB from '../../../../config/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../utils/authOptions';


// POST route to create a new Investor entry
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const data = await getServerSession(authOptions);

        const { companyInfo, investmentBio, targetInfo, paidInfo, primaryContact } = await req.json();
        const user = await User.findById(data?.user.id).select('company');
        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 500 });

        const { revenue, EBITDA, industry } = user.company;

        const userMetric = {
            userRevenue: revenue.ltm, // Client's latest revenue
            userEBITDA: EBITDA.ltm,   // Client's latest EBITDA
            userIndustry: industry,
        };

        // Create a new investor instance
        const newInvestor = new Investor({
            user: data?.user.id,
            companyInfo,
            investmentBio,
            targetInfo,
            paidInfo,
            primaryContact,
        });

        // Calculate the match score directly in the route
        let totalScore = 0;

        if (userMetric.userRevenue >= newInvestor.targetInfo.revenue.from && userMetric.userRevenue <= newInvestor.targetInfo.revenue.to) {
            newInvestor.matchScore.revenueScore = 50;
            totalScore += 50;
        }

        if (userMetric.userEBITDA >= newInvestor.targetInfo.EBITDA.from && userMetric.userEBITDA <= newInvestor.targetInfo.EBITDA.to) {
            newInvestor.matchScore.ebitdaScore = 10;
            totalScore += 10;
        }

        if (newInvestor.investmentBio.dealsInLTM > 3) {
            newInvestor.matchScore.dealsScore = 20;
            totalScore += 20;
        }

        if (newInvestor.companyInfo.investorType === 'Strategic') {
            newInvestor.matchScore.investorTypeScore = 10;
            totalScore += 10;
        }

        if (userMetric.userIndustry === newInvestor.vertical) {
            newInvestor.matchScore.industryScore = 10;
            totalScore += 10;
        }

        newInvestor.matchScore.totalScore = totalScore;

        // Save the new investor document
        await newInvestor.save();

        return NextResponse.json(
            { message: "Investor Added Successfully" },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// GET route to fetch all Investors
export async function GET(req: NextRequest) {
    try {
        await connectDB()
        const user = await getServerSession(authOptions)

        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        
        const investors = await Investor.find({ user: user?.user.id });
        if (!investors || investors.length === 0) {
            return NextResponse.json({ message: 'No Investors found' }, { status: 404 });
        }
        return NextResponse.json({ investors }, { status: 200 });
    } catch (error : any) {
        console.error("Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
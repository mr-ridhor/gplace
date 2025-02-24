import connectDB from "../../../../../config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../utils/authOptions";
import { NextRequest, NextResponse } from "next/server";
import Investor, { InvestorModel } from "../../../../../models/Investor";
import InvestorContact from "../../../../../models/InvestorContact";
import User, { IUser } from "../../../../../models/User";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const data = await getServerSession(authOptions)

        if (!data || !data.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const investor = await Investor.findOne({ user: data?.user.id, _id: params.id });
        if (!investor) {
            return NextResponse.json(
                { message: 'Investor not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(investor, { status: 200 });
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};



export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const data = await getServerSession(authOptions);

        if (!data || !data.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { companyInfo, investmentBio, targetInfo, offeredPriceValuation, paidInfo, primaryContact, status } = await req.json();

        const investor = await Investor.findOne({ _id: params.id, user: data.user.id })

        const user: IUser | any = await User.findById(data.user.id)
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 500 });
        const { revenue, EBITDA, industry, industryType } = user.company;

        const clientMetrics = {
            revenue: revenue.ltm, // Client's latest revenue
            EBITDA: EBITDA.ltm, // Client's latest EBITDA
            industry,
            industryType,
        };

        if (!investor) return NextResponse.json({ message: 'Investor not found' }, { status: 404 });

        const updatedCompanyInfo = companyInfo ? { ...investor.companyInfo, ...companyInfo } : investor.companyInfo;
        const updatedInvestmentBio = investmentBio ? { ...investor.investmentBio, ...investmentBio } : investor.investmentBio;
        const updatedTargetInfo = targetInfo ? { ...investor.targetInfo, ...targetInfo } : investor.targetInfo;
        const updatedPaidInfo = paidInfo ? { ...investor.paidInfo, ...paidInfo } : investor.paidInfo;
        const updatedStatus = status ? status : investor.status;

        const updatedPrimaryContact = primaryContact ? { ...investor.primaryContact, ...primaryContact } : investor.primaryContact;

        const updatedOfferedPrice = offeredPriceValuation ? {
            ...investor.offeredPrice, valuation: offeredPriceValuation,
            revenue: parseFloat((offeredPriceValuation / user.company.revenue?.ltm).toFixed(1)),
            EBITDA: parseFloat((offeredPriceValuation / user.company.EBITDA?.ltm).toFixed(1))
        } : investor.offeredPrice;


        // Update the investor document in the database
        const updatedInvestor = await Investor.findOneAndUpdate(
            { user: data.user.id, _id: params.id },
            {
                $set: {
                    companyInfo: updatedCompanyInfo,
                    investmentBio: updatedInvestmentBio,
                    targetInfo: updatedTargetInfo,
                    paidInfo: updatedPaidInfo,
                    status: updatedStatus,
                    offeredPrice: updatedOfferedPrice,
                    primaryContact: updatedPrimaryContact
                }
            },
            { new: true } // return the updated document
        );

        if (!updatedInvestor) {
            return NextResponse.json({ message: 'Failed to update investor' }, { status: 500 });
        }

        // Calculate match score using clientMetrics and updatedInvestor
        if (clientMetrics) {
            const matchScore = (Investor as InvestorModel).calculateMatchScore(clientMetrics, updatedInvestor);
            updatedInvestor.matchScore.totalScore = matchScore;
            await updatedInvestor.save(); // Save the updated match score
        }

        return NextResponse.json({ message: 'Investor Data Updated Successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const data = await getServerSession(authOptions);

        if (!data || !data.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const investor = await Investor.findOne({ user: data.user.id, _id: params.id });
        const investorContact = await InvestorContact.find({ investor: investor._id })

        if (!investor) {
            return NextResponse.json({ message: 'Investor not found' }, { status: 404 });
        }
        if (investorContact.length !== 0) await InvestorContact.deleteMany({ investor: investor._id })
        await Investor.deleteOne({ user: data.user.id, _id: params.id })
        return NextResponse.json({ message: 'Investor Data Deleted Successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
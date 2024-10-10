import connectDB from "../../../../../config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../utils/authOptions";
import { NextRequest, NextResponse } from "next/server";
import Investor from "../../../../../models/Investor";
import User, { IUser } from "../../../../../models/User";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const data = await getServerSession(authOptions)

        // const user = await User.findById(data?.user.id);
        if (!data || !data.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const investor = await Investor.findOne({ user: data?.user.id, _id: params.id });
        const user: IUser | any = await User.findById(data.user.id)
        if (!investor) {
            return NextResponse.json(
                { message: 'Investor not found' },
                { status: 404 }
            );
        }

        const investorObj = investor.toObject()
        const valuation = investor.targetInfo.offeredPrice || 0

        return NextResponse.json({
            ...investorObj, 
            offeredPrice: {
                valuation,
                revenue:  valuation == 0 ? 0 : parseFloat((valuation / user?.company.revenue.ltm).toFixed(1)),
                EBITDA: valuation == 0 ? 0 : parseFloat((valuation / user?.company.EBITDA.ltm).toFixed(1)),
            }
        }, { status: 200 });
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

        const updateData = await req.json();

        const updatedInvestor = await Investor.findOneAndUpdate(
            { user: data.user.id, _id: params.id },
            { $set: updateData }, // Only update fields provided in updateData
            { new: true }
        );

        if (!updatedInvestor) {
            return NextResponse.json({ message: 'Investor not found' }, { status: 404 });
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

        const updatedInvestor = await Investor.findOne({ user: data.user.id, _id: params.id });

        if (!updatedInvestor) {
            return NextResponse.json({ message: 'Investor not found' }, { status: 404 });
        }
        await Investor.deleteOne({ user: data.user.id, _id: params.id })
        return NextResponse.json({ message: 'Investor Data Deleted Successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
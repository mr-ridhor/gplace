import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../../../../utils/authOptions";
import { getServerSession } from "next-auth";
import InvestorContact, { IInvestorContact } from "../../../../../../../models/InvestorContact";
import Investor from "../../../../../../../models/Investor";

// Update Contact 
export async function PUT(req: NextRequest, { params }: { params: { id: string, contactId: string } }) {
    const { name, surname, email, phone, title, contactType } = await req.json();
    const user = await getServerSession(authOptions)

    if (!user || !user.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const contact = await InvestorContact.findOne({ _id: params.contactId, investor: params.id });

        if (!contact) {
            return NextResponse.json({ message: 'Contact not found.' }, { status: 404 });
        }

        if (contactType === 'Primary') {
            const investor = await Investor.findOne({ user: user.user.id, _id: params.id })
            if (!investor) return NextResponse.json({ message: 'Investor not found.' }, { status: 404 });

            const updatedContact: IInvestorContact | any = await InvestorContact.findOneAndUpdate({ _id: params.contactId, investor: params.id, user: user.user.id }, {
                name: investor.primaryContact.name,
                surname: investor.primaryContact.surname,
                email: investor.primaryContact.email,
                phone: investor.primaryContact.phone,
                title: investor.primaryContact.title
            })

            await Investor.updateOne({
                _id: params.id, user: user.user.id
            }, {
                "primaryContact.name": name,
                "primaryContact.surname": surname,
                "primaryContact.email": email,
                "primaryContact.phone": phone,
                "primaryContact.title": title
            })

            // await InvestorContact.deleteOne({ _id: params.contactId, investor: params.id });
            return NextResponse.json({
                message: 'Contact updated successfully',
                name: updatedContact.name,
                surname: updatedContact.surname,
                email: updatedContact.email,
                phone: updatedContact.phone,
                title: updatedContact.title,
            }, { status: 200 });

        } else {
            const investorContact: IInvestorContact | any = await InvestorContact.findOneAndUpdate({ _id: params.contactId, investor: params.id, user: user.user.id }, {
                $set: {
                    name, surname, email, phone, title
                }
            }, { new: true })

            return NextResponse.json({ 
                message: 'Contact updated successfully',
                name: investorContact.name,
                surname: investorContact.surname,
                email: investorContact.email,
                phone: investorContact.phone,
                title: investorContact.title,
                contactType: investorContact?.contactType
         }, { status: 200 });
        }
    } catch (error) {
        console.error("Error updating contact:", error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


// DELETE Contact 
export async function DELETE(req: NextRequest, { params }: { params: { id: string, contactId: string } }) {
    try {
        // Find the contact by investor and contact ID
        const contact = await InvestorContact.findOne({ _id: params.contactId, investor: params.id });

        if (!contact) {
            return NextResponse.json({ message: 'Contact not found.' }, { status: 404 });
        }

        await InvestorContact.deleteOne({ _id: params.contactId, investor: params.id })

        return NextResponse.json({ message: 'Contact Deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error updating contact:", error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

// GET Contact 
export async function GET(req: NextRequest, { params }: { params: { id: string, contactId: string } }) {
    try {
        // Find the contact by investor and contact ID
        const contact = await InvestorContact.findOne({ _id: params.contactId, investor: params.id });

        if (!contact) {
            return NextResponse.json({ message: 'Contact not found.' }, { status: 404 });
        }

        return NextResponse.json(contact, { status: 200 });
    } catch (error) {
        console.error("Error updating contact:", error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
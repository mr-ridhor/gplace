import { NextRequest, NextResponse } from "next/server";
import InvestorContact from "../../../../../../models/InvestorContact";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../utils/authOptions";
import Investor from "../../../../../../models/Investor";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { name, surname, email, phone, title, contactType } = await req.json();
    const user = await getServerSession(authOptions)

    if (!user || !user.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    if (!name || !surname || !email || !phone || !title) {
        return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }
    // console.log(params.id)

    if (contactType === 'Primary') {
        const investor = await Investor.findOne({ user: user.user.id, _id: params.id })
        if (!investor) return NextResponse.json({ message: 'Investor not found.' }, { status: 404 });

        const newContact = new InvestorContact({
            investor: params.id,
            user: user?.user.id,
            name: investor.primaryContact.name,
            surname: investor.primaryContact.surname,
            email: investor.primaryContact.email,
            phone: investor.primaryContact.phone,
            title: investor.primaryContact.title
        })

        await newContact.save()

        await Investor.updateOne({
            _id: params.id, user: user.user.id
        }, {
            $set: {
                "primaryContact.name": name,
                "primaryContact.surname": surname,
                "primaryContact.email": email,
                "primaryContact.phone": phone,
                "primaryContact.title": title
            }
        })

        return NextResponse.json({ message: 'Primary Contact Updated' }, { status: 200 })

        // await InvestorContact.deleteOne({ _id: params.contactId, investor: params.id });

    } else {
        const newContact = new InvestorContact({
            investor: params.id,
            user: user?.user.id,
            name,
            surname,
            email,
            phone,
            title,
            contactType
        });

        await newContact.save();
        return NextResponse.json({ message: 'Contact added successfully' }, { status: 200 })
    }
}

//  Get Contacts
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getServerSession(authOptions)

        if (!user || !user.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const contacts = await InvestorContact.find({ user: user.user.id, investor: params.id });

        return NextResponse.json(contacts, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

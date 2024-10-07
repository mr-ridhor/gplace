import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../../../../utils/authOptions";
import { getServerSession } from "next-auth";
import InvestorContact from "../../../../../../../models/InvestorContact";

// Update Contact 
export async function PUT(req: NextRequest, { params }: { params: { id: string, contactId: string } }) {
    const { name, surname, email, phone, title } = await req.json();
    const user = await getServerSession(authOptions)

    if(!user || !user.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    
    if (!name || !surname || !email || !phone || !title) {
        return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }
    // console.log(params.id)
    try {
        // Find the contact by investor and contact ID
        const contact = await InvestorContact.findOne({ _id: params.contactId, investor: params.id });

        if (!contact) {
            return NextResponse.json({ message: 'Contact not found.' }, { status: 404 });
        }       

        await InvestorContact.updateOne({ _id: params.contactId, investor: params.id }, {$set: {
            name, surname, email, phone, title
        }})

        return NextResponse.json({ message: 'Contact updated successfully', contact }, { status: 200 });
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

        return NextResponse.json({ message: 'Contact updated successfully', contact }, { status: 200 });
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

        return NextResponse.json({ contact }, { status: 200 });
    } catch (error) {
        console.error("Error updating contact:", error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
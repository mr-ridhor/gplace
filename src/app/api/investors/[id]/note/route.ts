import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../../../../utils/getUser";
import Note from "../../../../../../models/Note";
import connectDB from "../../../../../../config/db";

export async function POST(req: NextRequest, { params } : { params: { id: string } }) {
    await connectDB()
    const user = await getUser()
    const { title, body } = await req.json();

    if (!title || !body) {
        return NextResponse.json({ message: 'Title and body are required.' }, { status: 400 });
    }

    await Note.create({
        user: user?.id,
        investor: params.id,
        title,
        body,
    });

    return NextResponse.json({ message: 'Note Created Successfully' }, { status: 201 })
}


export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
    await connectDB()
    const user = await getUser()
    const notes = await Note.find({ user: user?.id, investor: params.id })

    if(!notes) return NextResponse.json({ message: 'No Notes found' }, { status: 404 })

    return NextResponse.json( notes, { status: 200 })
}
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../../../../../utils/getUser";
import connectDB from "../../../../../../../config/db";
import Note from "../../../../../../../models/Note";

export async function DELETE(req: NextRequest, { params }: { params: { noteId: string } }) {
    const user = await getUser()
    await connectDB()

    const note = await Note.findOne({ _id: params.noteId, user: user?.id })
    if (!note) return NextResponse.json({ message: 'Note not found' }, { status: 404 })

    await note.deleteOne()
    return NextResponse.json({ message: 'Note Deleted Successfully' }, { status: 200 })
}
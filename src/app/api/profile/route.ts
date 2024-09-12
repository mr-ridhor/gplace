import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import { getUser } from "../../../../utils/getUser";

export async function GET(req: NextRequest) {
    const currentUser = await getUser()
    const user = await User.findById(currentUser?.id)

    if(!user) return NextResponse.json({ message: 'User not found'}, { status: 404 })

    return NextResponse.json(user, { status: 200 })
}
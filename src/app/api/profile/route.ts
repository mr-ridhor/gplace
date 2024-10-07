import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import { getUser } from "../../../../utils/getUser";

export async function GET(req: NextRequest) {
    const currentUser = await getUser()
    const user = await User.findById(currentUser?.id)

    if(!user) return NextResponse.json({ message: 'User not found'}, { status: 404 })

    return NextResponse.json(user, { status: 200 })
}

export async function PUT(req: NextRequest) {
    try {
      // Get the current user
      const currentUser = await getUser();
      if (!currentUser) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  
      // Parse the request body
      const { bio, company, team, credentials } = await req.json();
  
      // Find the user by ID
      const user = await User.findById(currentUser?.id);
      if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  
      // Build the update object using $set
      const updateFields: any = {};
      if (bio) updateFields.bio = bio;
      if (company) updateFields.company = company;
      if (team) updateFields.team = team;
      if (credentials) updateFields.credentials = credentials;
  
      // Update the user document using $set
      await User.updateOne({ _id: currentUser?.id }, { $set: updateFields });
    
      return NextResponse.json({ message: 'User Updated Successfully' }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: 'Error updating user', error: error.message }, { status: 500 });
    }
  }
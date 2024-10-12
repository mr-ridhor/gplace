import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import { getUser } from "../../../../utils/getUser";
import Investor from "../../../../models/Investor";

export async function GET(req: NextRequest) {
  const currentUser = await getUser()
  const user = await User.findById(currentUser?.id)

  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

  return NextResponse.json(user, { status: 200 })
}

export async function PUT(req: NextRequest) {
  try {
    // Get the current user
    const currentUser = await getUser();
    if (!currentUser) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    // Parse the request body
    const { bio, company, team } = await req.json();

    // Find the user by ID
    const user = await User.findById(currentUser?.id);
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    // Build the update object using $set
    const updateFields: any = {};
    
    if (bio) {
      Object.keys(bio).forEach((key) => {
        updateFields[`bio.${key}`] = bio[key];
      });
    }
    
    if (company) {
      Object.keys(company).forEach((key) => {
        updateFields[`company.${key}`] = company[key];
      });
    }

    if (team) {
      Object.keys(team).forEach((key) => {
        updateFields[`team.${key}`] = team[key];
      });
    }

    // Update only the provided fields
    await User.updateOne(
      { _id: currentUser?.id },
      { $set: updateFields }
    );

    // if (company.revenue?.ltm || company.EBITDA?.ltm) {
    //   const investors = await Investor.find({ user: currentUser.id });

    //   // Loop through each investor and calculate the new revenue and EBITDA based on the valuation
    //   const bulkOperations = investors.map((investor) => {
    //     const valuation = investor.offeredPrice.valuation;
    //     const revenue = parseFloat((valuation / user.company.revenue?.ltm).toFixed(1));
    //     const EBITDA = parseFloat((valuation / user.company.EBITDA?.ltm).toFixed(1));

    //     // Return the update object for bulk write
    //     return {
    //       updateOne: {
    //         filter: { _id: investor._id },
    //         update: {
    //           $set: {
    //             'offeredPrice.revenue': revenue,
    //             'offeredPrice.EBITDA': EBITDA,
    //           },
    //         },
    //       },
    //     };
    //   });

    //   if (bulkOperations.length > 0) {
    //     await Investor.bulkWrite(bulkOperations);
    //   }
    // }

    return NextResponse.json({ message: 'User and respective Investors Updated Successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating user', error: error.message }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import { getUser } from "../../../../utils/getUser";
import Investor, { InvestorModel } from "../../../../models/Investor";

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
    const user = await User.findById(currentUser?.id).lean();
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    // Update only the provided fields, while keeping the existing data
    const updatedBio = bio ? { ...user.bio, ...bio } : user.bio;

    // Merge existing company data with the new input (preserve previousYear if not provided)
    const updatedCompany = {
      ...user.company,
      name: company?.name ?? user.company.name,
      country: company?.country ?? user.company.country,
      city: company?.city ?? user.company.city,
      email: company?.email ?? user.company.email,
      website: company?.website ?? user.company.website,
      industry: company?.industry ?? user.company.industry,
      foundingYear: company?.foundingYear ?? user.company.foundingYear,
      revenue: {
        ltm: company?.revenue?.ltm ?? user?.company?.revenue?.ltm,
        previousYear: company?.revenue?.previousYear ?? user?.company?.revenue?.previousYear,
      },
      grossProfit: {
        ltm: company?.grossProfit?.ltm ?? user?.company?.grossProfit?.ltm,
        previousYear: company?.grossProfit?.previousYear ?? user?.company?.grossProfit?.previousYear,
      },
      EBITDA: {
        ltm: company?.EBITDA?.ltm ?? user?.company?.EBITDA?.ltm,
        previousYear: company?.EBITDA?.previousYear ?? user?.company?.EBITDA?.previousYear,
      },
    };

    const updatedTeam = team ? { ...user.team, ...team } : user.team;


    // Apply the updates using findByIdAndUpdate with the { new: true } option to return the updated document
    const updatedUser = await User.findByIdAndUpdate(
      currentUser?.id,
      {
        $set: {
          bio: updatedBio,
          company: updatedCompany,
          team: updatedTeam,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'Update failed' }, { status: 500 });
    }

    if (company?.revenue?.ltm || company?.EBITDA?.ltm) {
      const investors = await Investor.find({ user: currentUser.id });

      // Loop through each investor and calculate the new revenue and EBITDA based on the valuation
      const bulkOperations = investors.map((investor) => {
        const valuation = investor.offeredPrice.valuation;
        const revenue = parseFloat((valuation / user?.company?.revenue.ltm).toFixed(1));
        const EBITDA = parseFloat((valuation / user?.company?.EBITDA.ltm).toFixed(1));

        const clientMetrics = {
          revenue: updatedCompany.revenue.ltm,
          EBITDA: updatedCompany.EBITDA.ltm,
          industry: updatedCompany.industry,
          dealSize: valuation, // Assuming dealSize is based on valuation
        };

        const matchScore = (Investor as InvestorModel).calculateMatchScore(clientMetrics, investor);

        // Return the update object for bulk write
        return {
          updateOne: {
            filter: { _id: investor._id },
            update: {
              $set: {
                'offeredPrice.revenue': revenue,
                'offeredPrice.EBITDA': EBITDA,
                'matchScore.totalScore': matchScore
              },
            },
          },
        };
      });

      if (bulkOperations.length > 0) {
        await Investor.bulkWrite(bulkOperations);
      }
    }

    return NextResponse.json({ message: 'User and respective Investors Updated Successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating user', error: error.message }, { status: 500 });
  }
}
import mongoose, { Schema, Document, Model } from "mongoose";

// Combined interface for all sub-structures in the Investor schema
export interface InvestorInterface extends Document {
	user: mongoose.Schema.Types.ObjectId;
	companyInfo: {
		companyName: string;
		country: string;
		city: string;
		website: string;
		yearFounded: number;
		employeeNumber: number;
		investorType: "Strategic" | "Financial";
		// industry: string;
		description: string;
	};
	investmentBio: {
		industry: string[];
		geography: string[];
		dealsInLTM: number;
		medianDealSize: number;
		AUM: number;
		dealsIn5Y: number;
	};
	targetInfo: {
		revenue: { from: number; to: number };
		EBITDA: { from: number; to: number };
		dealSize: { from: number; to: number };
	};
	paidInfo: {
		valuation: { from: number; to: number };
		revenue: { from: number; to: number };
		EBITDA: { from: number; to: number };
	};
	offeredPrice: {
		valuation: number;
		revenue: number;
		EBITDA: number;
	};
	primaryContact: {
		name: string;
		surname: string;
		email: string;
		phone: string;
		title: string;
	};
	vertical?: string;
	status: string;
	matchScore: {
		revenueScore?: number;
		ebitdaScore?: number;
		dealsScore?: number;
		investorTypeScore?: number;
		industryScore?: number;
		dealSizeScore?: number;
		totalScore?: number;
	};
	createdBy: { type: mongoose.Schema.Types.ObjectId; ref: "User" },
}

// Investor model interface including static methods
export interface InvestorModel extends Model<InvestorInterface> {
	calculateMatchScore(clientMetrics: any, investor: InvestorInterface): number;
}

// Investor schema definition
const investorSchema = new Schema<InvestorInterface>(
	{
		// user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		companyInfo: {
			companyName: { type: String, trim: true, required: true },
			country: { type: String, trim: true, required: true },
			city: { type: String, trim: true, required: true },
			website: { type: String, trim: true, required: true },
			yearFounded: { type: Number, required: true },
			employeeNumber: { type: Number, required: true },
			investorType: { type: String, enum: ["Financial", "Strategic"] },
			// industry: { type: [String], required: true },
			description: { type: String, trim: true, required: true },
		},
		investmentBio: {
			industry: { type: [String], trim: true, required: true },
			geography: { type: [String], trim: true },
			dealsInLTM: { type: Number, required: true },
			medianDealSize: { type: Number, required: true },
			AUM: { type: Number, required: true },
			dealsIn5Y: { type: Number, required: true },
		},
		targetInfo: {
			revenue: {
				from: { type: Number, required: true },
				to: { type: Number, required: true },
			},
			EBITDA: {
				from: { type: Number, required: true },
				to: { type: Number, required: true },
			},
			dealSize: {
				from: { type: Number, required: true },
				to: { type: Number, required: true },
			},
		},
		paidInfo: {
			valuation: {
				from: { type: Number, required: true },
				to: { type: Number, required: true },
			},
			revenue: {
				from: { type: Number, required: true },
				to: { type: Number, required: true },
			},
			EBITDA: {
				from: { type: Number, required: true },
				to: { type: Number, required: true },
			},
		},
		offeredPrice: {
			valuation: { type: Number, required: true },
			revenue: { type: Number, required: true },
			EBITDA: { type: Number, required: true },
		},
		primaryContact: {
			name: { type: String, trim: true, required: true },
			surname: { type: String, trim: true, required: true },
			email: { type: String, trim: true, required: true },
			phone: { type: String, trim: true, required: true },
			title: { type: String, trim: true, required: true },
		},
		vertical: { type: String, trim: true },
		status: {
			type: String,
			enum: [
				"Data Exchange",
				"Initial Offer",
				"Letter of Intent",
				"Due Diligence",
				"Closing",
			],
			default: "Data Exchange",
			required: true,
		},
		matchScore: {
			totalScore: { type: Number, default: 0 },
			revenueScore: { type: Number, default: 0 },
			ebitdaScore: { type: Number, default: 0 },
			dealsScore: { type: Number, default: 0 },
			investorTypeScore: { type: Number, default: 0 },
			industryScore: { type: Number, default: 0 },
		},
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
	},
	{ timestamps: true }
);

// Static method for calculating match scores
investorSchema.statics.calculateMatchScore = function (
	clientMetrics: any,
	investor: InvestorInterface
): number {
	let totalScore = 0;

	if (
		clientMetrics.revenue >= investor.targetInfo.revenue?.from &&
		clientMetrics.revenue <= investor.targetInfo.revenue?.to
	) {
		investor.matchScore.revenueScore = 50;
		totalScore += 50;
	}

	if (
		clientMetrics.EBITDA >= investor.targetInfo.EBITDA.from &&
		clientMetrics.EBITDA <= investor.targetInfo.EBITDA.to
	) {
		investor.matchScore.ebitdaScore = 10;
		totalScore += 10;
	}

	if (investor.investmentBio.dealsInLTM > 3) {
		investor.matchScore.dealsScore = 20;
		totalScore += 20;
	}

	if (investor.companyInfo.investorType === "Strategic") {
		investor.matchScore.investorTypeScore = 10;
		totalScore += 10;
	}

	const industryMatch =
		Array.isArray(investor.investmentBio.industry) &&
		investor.investmentBio.industry.includes(clientMetrics.industry);

	if (industryMatch) {
		investor.matchScore.industryScore = 10;
		totalScore += 10;
	}

	investor.matchScore.totalScore = totalScore;
	return totalScore;
};

// Exporting the Investor model
const Investor =
	mongoose.models.Investor ||
	mongoose.model<InvestorInterface, InvestorModel>("Investor", investorSchema);

export default Investor;

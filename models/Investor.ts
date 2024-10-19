import mongoose, { Schema, Document, Model } from 'mongoose';

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
        investorType: 'Strategic' | 'Financial';
        industry: string;
        description: string;
    };
    investmentBio: {
        industry: string;
        geography: string;
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
    status?: string;
    matchScore: {
        revenueScore?: number;
        ebitdaScore?: number;
        dealsScore?: number;
        investorTypeScore?: number;
        industryScore?: number;
        dealSizeScore?: number;
        totalScore?: number;
    };
}

// Investor model interface including static methods
export interface InvestorModel extends Model<InvestorInterface> {
    calculateMatchScore(clientMetrics: any, investor: InvestorInterface): number;
}

// Investor schema definition
const investorSchema = new Schema<InvestorInterface>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyInfo: {
        companyName: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        website: { type: String, required: true },
        yearFounded: { type: Number, required: true },
        employeeNumber: { type: Number, required: true },
        investorType: { type: String },
        industry: { type: String },
        description: { type: String, required: true },
    },
    investmentBio: {
        industry: { type: String, required: true },
        geography: { type: String, },
        dealsInLTM: { type: Number, required: true },
        medianDealSize: { type: Number, required: true },
        AUM: { type: Number, required: true },
        dealsIn5Y: { type: Number, required: true },
    },
    targetInfo: {
        revenue: { from: { type: Number, required: true }, to: { type: Number, required: true } },
        EBITDA: { from: { type: Number, required: true }, to: { type: Number, required: true } },
        dealSize: { from: { type: Number, required: true }, to: { type: Number, required: true } },
    },
    paidInfo: {
        valuation: { from: { type: Number, required: true }, to: { type: Number, required: true } },
        revenue: { from: { type: Number, required: true }, to: { type: Number, required: true } },
        EBITDA: { from: { type: Number, required: true }, to: { type: Number, required: true } },
    },
    offeredPrice: {
        valuation: { type: Number, required: true },
        revenue: { type: Number, required: true },
        EBITDA: { type: Number, required: true },
    },
    primaryContact: {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        title: { type: String, required: true },
    },
    vertical: { type: String },
    status: { type: String },
    matchScore: {
        totalScore: { type: Number, default: 0 },
        revenueScore: { type: Number, default: 0 },
        ebitdaScore: { type: Number, default: 0 },
        dealsScore: { type: Number, default: 0 },
        investorTypeScore: { type: Number, default: 0 },
        industryScore: { type: Number, default: 0 },
    },
}, { timestamps: true });

// Static method for calculating match scores
investorSchema.statics.calculateMatchScore = function (clientMetrics: any, investor: InvestorInterface): number {
    let totalScore = 0;

    if (clientMetrics.revenue >= investor.targetInfo.revenue?.from && clientMetrics.revenue <= investor.targetInfo.revenue?.to) {
        investor.matchScore.revenueScore = 50;
        totalScore += 50;
    }

    if (clientMetrics.EBITDA >= investor.targetInfo.EBITDA.from && clientMetrics.EBITDA <= investor.targetInfo.EBITDA.to) {
        investor.matchScore.ebitdaScore = 10;
        totalScore += 10;
    }

    if (investor.investmentBio.dealsInLTM > 3) {
        investor.matchScore.dealsScore = 20;
        totalScore += 20;
    }

    if (investor.companyInfo.investorType === 'Strategic') {
        investor.matchScore.investorTypeScore = 10;
        totalScore += 10;
    }

    if (clientMetrics.industry === investor.companyInfo.industry) {
        investor.matchScore.industryScore = 10;
        totalScore += 10;
    }

    investor.matchScore.totalScore = totalScore;
    return totalScore;
};

// Exporting the Investor model
const Investor = mongoose.models.Investor || mongoose.model<InvestorInterface, InvestorModel>('Investor', investorSchema);

export default Investor;

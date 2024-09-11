export interface CompanyInfo {
  companyName: string;
  country: string;
  city: string;
  website: string;
  yearFounded: number;
  employeeNumber: number;
  investorType: string;
  description: string;
}

export interface InvestmentBio {
  industry: string;
  geography: string;
  dealsInLTM: number;
  medianDealSize: number;
  AUM: number;
  dealsIn5Y: number;
}

export interface RevenueEBITDA {
  from: string;
  to: string;
}

export interface TargetInfo {
  revenue: RevenueEBITDA;
  EBITDA: RevenueEBITDA;
  dealSize: RevenueEBITDA;
}

export interface PaidInfo {
  revenue: RevenueEBITDA;
  EBITDA: RevenueEBITDA;
  valuation: RevenueEBITDA;
}

export interface PrimaryContact {
  name: string;
  surname: string;
  email: string;
  phone: string;
  title: string;
}

export interface MatchScore {
  totalScore: number;
  revenueScore: number;
  ebitdaScore: number;
  dealsScore: number;
  investorTypeScore: number;
  industryScore: number;
}

export interface Investor {
  companyInfo: CompanyInfo;
  investmentBio: InvestmentBio;
  targetInfo: TargetInfo;
  paidInfo: PaidInfo;
  primaryContact: PrimaryContact;
  vertical: string;
  status: string;
  matchScore: MatchScore;
  user: string;
  _id: string;
}

// // types.ts

// // Example type definitions
// export interface CompanyInfo {
//   companyName: string;
//   country: string;
//   city: string;
//   website: string;
//   yearFounded: number;
//   employeeNumber: number;
//   investorType: string;
//   description: string;
// }

// export interface InvestmentBio {
//   industry: string;
//   geography: string;
//   dealsInLTM: number;
//   medianDealSize: number;
//   AUM: number;
//   dealsIn5Y: number;
// }

// export interface FinancialInfo {
//   revenue: { from: string; to: string };
//   EBITDA: { from: string; to: string };
//   dealSize?: { from: string; to: string };
//   valuation?: { from: string; to: string };
// }

// export interface PrimaryContact {
//   name: string;
//   surname: string;
//   email: string;
//   phone: string;
//   title: string;
// }

// export interface Investor {
//   companyInfo: CompanyInfo;
//   investmentBio: InvestmentBio;
//   targetInfo: FinancialInfo;
//   paidInfo: FinancialInfo;
//   primaryContact: PrimaryContact;
//   vertical: string;
//   status: string;
//   matchScore: {
//     totalScore: number;
//     revenueScore: number;
//     ebitdaScore: number;
//     dealsScore: number;
//     investorTypeScore: number;
//     industryScore: number;
//   };
// }

// export type Investors = Investor[];
// // Mocked data for Investors
// export const mockedInvestors: Investors = [
//   {
//     companyInfo: {
//       companyName: "Tech Ventures Ltd.",
//       country: "USA",
//       city: "San Francisco",
//       website: "https://techventures.com",
//       yearFounded: 2010,
//       employeeNumber: 150,
//       investorType: "Venture Capital",
//       description:
//         "Investing in early-stage tech startups with high growth potential.",
//     },
//     investmentBio: {
//       industry: "Technology",
//       geography: "North America",
//       dealsInLTM: 20,
//       medianDealSize: 5000000,
//       AUM: 500000000,
//       dealsIn5Y: 100,
//     },
//     targetInfo: {
//       revenue: { from: "$1M", to: "$10M" },
//       EBITDA: { from: "$200K", to: "$2M" },
//     },
//     paidInfo: {
//       revenue: { from: "$2M", to: "$15M" },
//       EBITDA: { from: "$500K", to: "$3M" },
//     },
//     primaryContact: {
//       name: "Alice",
//       surname: "Johnson",
//       email: "alice.johnson@techventures.com",
//       phone: "+1-123-456-7890",
//       title: "Managing Partner",
//     },
//     vertical: "Tech Startups",
//     status: "Active",
//     matchScore: {
//       totalScore: 85,
//       revenueScore: 90,
//       ebitdaScore: 80,
//       dealsScore: 75,
//       investorTypeScore: 85,
//       industryScore: 90,
//     },
//   },
//   {
//     companyInfo: {
//       companyName: "Green Capital",
//       country: "UK",
//       city: "London",
//       website: "https://greencapital.co.uk",
//       yearFounded: 2005,
//       employeeNumber: 75,
//       investorType: "Private Equity",
//       description:
//         "Focusing on sustainable investments and green technologies.",
//     },
//     investmentBio: {
//       industry: "Green Technology",
//       geography: "Europe",
//       dealsInLTM: 15,
//       medianDealSize: 2000000,
//       AUM: 200000000,
//       dealsIn5Y: 60,
//     },
//     targetInfo: {
//       revenue: { from: "$500K", to: "$5M" },
//       EBITDA: { from: "$100K", to: "$1M" },
//     },
//     paidInfo: {
//       revenue: { from: "$1M", to: "$6M" },
//       EBITDA: { from: "$250K", to: "$1.5M" },
//     },
//     primaryContact: {
//       name: "David",
//       surname: "Smith",
//       email: "david.smith@greencapital.co.uk",
//       phone: "+44-20-7946-0958",
//       title: "Investment Director",
//     },
//     vertical: "Sustainable Tech",
//     status: "Active",
//     matchScore: {
//       totalScore: 78,
//       revenueScore: 80,
//       ebitdaScore: 75,
//       dealsScore: 70,
//       investorTypeScore: 80,
//       industryScore: 85,
//     },
//   },
//   {
//     companyInfo: {
//       companyName: "Healthcare Innovations",
//       country: "Canada",
//       city: "Toronto",
//       website: "https://healthcareinnovations.ca",
//       yearFounded: 2012,
//       employeeNumber: 100,
//       investorType: "Corporate Venture",
//       description: "Investing in innovative healthcare solutions and biotech.",
//     },
//     investmentBio: {
//       industry: "Healthcare",
//       geography: "North America",
//       dealsInLTM: 25,
//       medianDealSize: 3500000,
//       AUM: 300000000,
//       dealsIn5Y: 120,
//     },
//     targetInfo: {
//       revenue: { from: "$2M", to: "$20M" },
//       EBITDA: { from: "$400K", to: "$4M" },
//     },
//     paidInfo: {
//       revenue: { from: "$3M", to: "$25M" },
//       EBITDA: { from: "$600K", to: "$5M" },
//     },
//     primaryContact: {
//       name: "Emma",
//       surname: "Brown",
//       email: "emma.brown@healthcareinnovations.ca",
//       phone: "+1-416-555-1234",
//       title: "Senior Investment Manager",
//     },
//     vertical: "Biotech",
//     status: "Active",
//     matchScore: {
//       totalScore: 88,
//       revenueScore: 85,
//       ebitdaScore: 90,
//       dealsScore: 80,
//       investorTypeScore: 88,
//       industryScore: 92,
//     },
//   },
//   {
//     companyInfo: {
//       companyName: "Financial Growth Partners",
//       country: "Australia",
//       city: "Sydney",
//       website: "https://financialgrowth.com.au",
//       yearFounded: 2000,
//       employeeNumber: 200,
//       investorType: "Hedge Fund",
//       description:
//         "Specializes in high-return financial investments and hedge strategies.",
//     },
//     investmentBio: {
//       industry: "Finance",
//       geography: "Asia-Pacific",
//       dealsInLTM: 30,
//       medianDealSize: 10000000,
//       AUM: 800000000,
//       dealsIn5Y: 150,
//     },
//     targetInfo: {
//       revenue: { from: "$5M", to: "$50M" },
//       EBITDA: { from: "$1M", to: "$10M" },
//     },
//     paidInfo: {
//       revenue: { from: "$7M", to: "$60M" },
//       EBITDA: { from: "$1.5M", to: "$12M" },
//     },
//     primaryContact: {
//       name: "John",
//       surname: "Williams",
//       email: "john.williams@financialgrowth.com.au",
//       phone: "+61-2-9876-5432",
//       title: "Chief Investment Officer",
//     },
//     vertical: "High Returns",
//     status: "Active",
//     matchScore: {
//       totalScore: 82,
//       revenueScore: 85,
//       ebitdaScore: 80,
//       dealsScore: 85,
//       investorTypeScore: 82,
//       industryScore: 78,
//     },
//   },
//   {
//     companyInfo: {
//       companyName: "Retail Innovations",
//       country: "Germany",
//       city: "Berlin",
//       website: "https://retailinnovations.de",
//       yearFounded: 2008,
//       employeeNumber: 120,
//       investorType: "Growth Equity",
//       description: "Investing in retail technologies and e-commerce solutions.",
//     },
//     investmentBio: {
//       industry: "Retail",
//       geography: "Europe",
//       dealsInLTM: 18,
//       medianDealSize: 4000000,
//       AUM: 250000000,
//       dealsIn5Y: 80,
//     },
//     targetInfo: {
//       revenue: { from: "$1M", to: "$15M" },
//       EBITDA: { from: "$200K", to: "$3M" },
//     },
//     paidInfo: {
//       revenue: { from: "$2M", to: "$20M" },
//       EBITDA: { from: "$400K", to: "$4M" },
//     },
//     primaryContact: {
//       name: "Sophia",
//       surname: "Müller",
//       email: "sophia.muller@retailinnovations.de",
//       phone: "+49-30-12345678",
//       title: "Investment Associate",
//     },
//     vertical: "E-commerce",
//     status: "Active",
//     matchScore: {
//       totalScore: 80,
//       revenueScore: 75,
//       ebitdaScore: 80,
//       dealsScore: 80,
//       investorTypeScore: 78,
//       industryScore: 82,
//     },
//   },
// ];
// types.ts
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

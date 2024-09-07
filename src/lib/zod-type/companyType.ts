// export type companyType = {
//   companyName: string;
//   country: string;
//   city: string;
//   email: string;
//   website: string;
//   industry: string;
//   foundingYear: string;
//   revenue: string;
//   prevRevenue: string;
//   profit: string;
//   prevProfit: string;
//   ebitda: string;
//   prevEbitda: string;
// };
// companyType.ts
export type companyType = {
  name: string;
  country: string;
  city: string;
  email: string;
  website?: string;
  industry: string;
  foundingYear: string;
  revenue: {
    ltm: string;
    previousYear: string;
  };
  grossProfit: {
    ltm: string;
    previousYear: string;
  };
  EBITDA: {
    ltm: string;
    previousYear: string;
  };
};

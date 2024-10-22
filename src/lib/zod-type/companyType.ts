export type companyType = {
  name: string;
  country: string;
  city: string;
  // email: string;
  website?: string;
  industry: string;
  foundingYear: string;
  revenue?: {
    ltm: string;
    previousYear: string;
  };
  grossProfit?: {
    ltm: string;
    previousYear: string;
  };
  EBITDA?: {
    ltm: string;
    previousYear: string;
  };
};

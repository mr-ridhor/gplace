// export type companyType = {
// 	name: string;
// 	country: string;
// 	city: string;

// 	website?: string;
// 	industry: string;

// 	foundingYear: string;
// 	revenue: {
// 		ltm: string;
// 		previousYear: string;
// 	};
// 	grossProfit: {
// 		ltm: string;
// 		previousYear: string;
// 	};
// 	EBITDA: {
// 		ltm: string;
// 		previousYear: string;
// 	};
// };
export type revenueType = {
	ltm: string;
	previousYear: string;
};
export type grossprofitType = {
	ltm: string;
	previousYear: string;
};
export type ebitdaType = {
	ltm: string;
	previousYear: string;
};
export type companyType = {
	name: string;
	country: string;
	city: string;
	industry: string;
	foundingYear: string;

	website?: string;
	revenue?: revenueType;
	grossProfit?: grossprofitType;
	EBITDA?: ebitdaType;
};

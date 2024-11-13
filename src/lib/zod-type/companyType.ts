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
export type companyType = {
	name: string;
	country: string;
	city: string;
	industry: string;
	foundingYear: string;

	website?: string;

	revenue: {
		ltm: string;
		previousYear?: string;
	};
	grossProfit?: {
		ltm?: string;
		previousYear?: string;
	};
	EBITDA?: {
		ltm?: string;
		previousYear?: string;
	};
};

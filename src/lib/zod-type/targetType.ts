// export type tragetType = {
//   rev: string;
//   ebdt: string;
//   dealsz: string;
//   offeredPrice: string;
// };
import { offeredPriceType } from "./offerPriceType";

// export type tragetType = {
//   rev: string;
//   ebdt: string;
//   dealsz: string;
//   offeredPrice: string;
// };
export type targetType = {
	rev: {
		from: string;
		to: string;
	};
	ebdt: {
		from: string;
		to: string;
	};
	dealsz: {
		from: string;
		to: string;
	};
	valuation: string;
	// offeredPrice: {
	//   valuation: string;
	//   // ebidta?: string;
	//   // revenue?: string;
	// }; // Integrating offeredPriceType here
};

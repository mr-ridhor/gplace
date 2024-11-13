// export type invproType = {
//   invInd: string;
//   invGeo: string;
//   noLTM: string;
// };
export type invproType = {
	invInd: Array<{
		// id: number;
		label: string;
		value: string;
	}>;
	invGeo: Array<{
		// id: number;
		label: string;
		value: string;
	}>;
	noLTM: string;
};

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
// 	companyInfo: {
// 		name: "",
// 		country: "",
// 		city: "",
// 		noEmp: "",
// 		website: "",
// 		investorType: "",
// 		yearFounded: "",
// 		description: "",
// 	},
// 	profile: {
// 		invInd: "",
// 		invGeo: "",
// 		noLTM: "",
// 	},
// 	profile2: {
// 		med: "",
// 		aum: "",
// 		deal: "",
// 	},
// 	target: {
// 		rev: {
// 			from: "",
// 			to: "",
// 		},
// 		ebdt: {
// 			from: "",
// 			to: "",
// 		},
// 		dealsz: {
// 			from: "",
// 			to: "",
// 		},
// 		// offeredPrice: "",
// 	},
// 	price: {
// 		val: {
// 			from: "",
// 			to: "",
// 		},
// 		evRev: {
// 			from: "",
// 			to: "",
// 		},
// 		evEbd: {
// 			from: "",
// 			to: "",
// 		},
// 	},
// 	offeredPriceValuation: 0,
// 	contact: {
// 		name: "",
// 		surname: "",
// 		email: "",
// 		phone: "",
// 		title: "",
// 	},
// 	// paidInfo: {
// 	// 	valuation: {
// 	// 		from: "", // (required)
// 	// 		to: "", // (required)
// 	// 	},
// 	// 	revenue: {
// 	// 		from: "", // (required)
// 	// 		to: "", // (required)
// 	// 	},
// 	// 	EBITDA: {
// 	// 		from: "", // (required)
// 	// 		to: "", // (required)
// 	// 	},
// 	// },
// };

// const addInvestorSlice = createSlice({
// 	name: "addInvestor",
// 	initialState,
// 	reducers: {
// 		setProfile(state, action) {
// 			state.profile = { ...state.profile, ...action.payload };
// 		},
// 		setProfile2(state, action) {
// 			state.profile2 = { ...state.profile2, ...action.payload };
// 		},
// 		setTarget(state, action) {
// 			state.target = { ...state.target, ...action.payload };
// 		},
// 		setPrice(state, action) {
// 			state.price = { ...state.price, ...action.payload };
// 		},
// 		setPaidInfo(state, action) {
// 			state.price = { ...state.price, ...action.payload };
// 		},
// 		setCompanyInfo(state, action) {
// 			state.companyInfo = { ...state.companyInfo, ...action.payload };
// 		},
// 		setContact(state, action) {
// 			state.contact = { ...state.contact, ...action.payload };
// 		},

// 		resetPayload: () => initialState,
// 	},
// });

// export const {
// 	setProfile,
// 	setProfile2,
// 	setTarget,
// 	setPrice,
// 	setCompanyInfo,
// 	setContact,
// 	resetPayload,
// 	// setOfferedPrice,
// } = addInvestorSlice.actions;

// export const getInvestor = (state: any) => state.addInvestor;
// export default addInvestorSlice.reducer;
// addInvestorSlice.ts;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interfaces for your state
interface CompanyInfo {
	name: string;
	country: string;
	city: string;
	noEmp: string;
	website: string;
	investorType: string;
	yearFounded: string;
	description: string;
}

interface Profile {
	invInd: Array<{
		// id: number;
		label: string;
		value: string;
	}>;
	invGeo: string;
	noLTM: string;
}

interface Profile2 {
	med: string;
	aum: string;
	deal: string;
}

interface Target {
	rev: { from: string; to: string };
	ebdt: { from: string; to: string };
	dealsz: { from: string; to: string };
	valuation: string;
}

interface Price {
	val: { from: string; to: string };
	evRev: { from: string; to: string };
	evEbd: { from: string; to: string };
}

interface Contact {
	name: string;
	surname: string;
	email: string;
	phone: string;
	title: string;
}

interface AddInvestorState {
	companyInfo: CompanyInfo;
	profile: Profile;
	profile2: Profile2;
	target: Target;
	price: Price;
	offeredPriceValuation: number;
	contact: Contact;
}

// Define the initial state with the correct types
const initialState: AddInvestorState = {
	companyInfo: {
		name: "",
		country: "",
		city: "",
		noEmp: "",
		website: "",
		investorType: "",
		yearFounded: "",
		description: "",
	},
	profile: {
		invInd: [],
		invGeo: "",
		noLTM: "",
	},
	profile2: {
		med: "",
		aum: "",
		deal: "",
	},
	target: {
		rev: { from: "", to: "" },
		ebdt: { from: "", to: "" },
		dealsz: { from: "", to: "" },
		valuation: "",
	},
	price: {
		val: { from: "", to: "" },
		evRev: { from: "", to: "" },
		evEbd: { from: "", to: "" },
	},
	offeredPriceValuation: 0,
	contact: {
		name: "",
		surname: "",
		email: "",
		phone: "",
		title: "",
	},
};

const addInvestorSlice = createSlice({
	name: "addInvestor",
	initialState,
	reducers: {
		setProfile(state, action: PayloadAction<Partial<Profile>>) {
			state.profile = { ...state.profile, ...action.payload };
		},
		setProfile2(state, action: PayloadAction<Partial<Profile2>>) {
			state.profile2 = { ...state.profile2, ...action.payload };
		},
		setTarget(state, action: PayloadAction<Partial<Target>>) {
			state.target = { ...state.target, ...action.payload };
		},
		setPrice(state, action: PayloadAction<Partial<Price>>) {
			state.price = { ...state.price, ...action.payload };
		},
		setCompanyInfo(state, action: PayloadAction<Partial<CompanyInfo>>) {
			state.companyInfo = { ...state.companyInfo, ...action.payload };
		},
		setContact(state, action: PayloadAction<Partial<Contact>>) {
			state.contact = { ...state.contact, ...action.payload };
		},
		resetPayload: () => initialState,
	},
});

// Export actions and reducer
export const {
	setProfile,
	setProfile2,
	setTarget,
	setPrice,
	setCompanyInfo,
	setContact,
	resetPayload,
} = addInvestorSlice.actions;

export const getInvestor = (state: { addInvestor: AddInvestorState }) =>
	state.addInvestor;
export default addInvestorSlice.reducer;

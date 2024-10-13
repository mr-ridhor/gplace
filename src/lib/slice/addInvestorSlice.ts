import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
		invInd: "",
		invGeo: "",
		noLTM: "",
	},
	profile2: {
		med: "",
		aum: "",
		deal: "",
	},
	target: {
		rev: {
			from: "",
			to: "",
		},
		ebdt: {
			from: "",
			to: "",
		},
		dealsz: {
			from: "",
			to: "",
		},
		// offeredPrice: "",
	},
	price: {
		val: {
			from: "",
			to: "",
		},
		evRev: {
			from: "",
			to: "",
		},
		evEbd: {
			from: "",
			to: "",
		},
	},
	offeredPriceValuation: 0,
	contact: {
		name: "",
		surname: "",
		email: "",
		phone: "",
		title: "",
	},
	paidInfo: {
		valuation: {
			from: "", // (required)
			to: "", // (required)
		},
		revenue: {
			from: "", // (required)
			to: "", // (required)
		},
		EBITDA: {
			from: "", // (required)
			to: "", // (required)
		},
	},
};

const addInvestorSlice = createSlice({
	name: "addInvestor",
	initialState,
	reducers: {
		setProfile(state, action) {
			state.profile = { ...state.profile, ...action.payload };
		},
		setProfile2(state, action) {
			state.profile2 = { ...state.profile2, ...action.payload };
		},
		setTarget(state, action) {
			state.target = { ...state.target, ...action.payload };
		},
		setPrice(state, action) {
			state.price = { ...state.price, ...action.payload };
		},
		setPaidInfo(state, action) {
			state.price = { ...state.price, ...action.payload };
		},
		setCompanyInfo(state, action) {
			state.companyInfo = { ...state.companyInfo, ...action.payload };
		},
		setContact(state, action) {
			state.contact = { ...state.contact, ...action.payload };
		},

		resetPayload: () => initialState,
	},
});

export const {
	setProfile,
	setProfile2,
	setTarget,
	setPrice,
	setCompanyInfo,
	setContact,
	resetPayload,
	// setOfferedPrice,
} = addInvestorSlice.actions;

export const getInvestor = (state: any) => state.addInvestor;
export default addInvestorSlice.reducer;

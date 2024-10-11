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
    rev: "",
    ebdt: "",
    dealsz: "",
    // offeredPrice: "",
  },
  price: {
    val: "",
    evRev: "",
    evEbd: "",
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
    setCompanyInfo(state, action) {
      state.companyInfo = { ...state.companyInfo, ...action.payload };
    },
    setContact(state, action) {
      state.contact = { ...state.contact, ...action.payload };
    },
    // setOfferedPrice(state, action) {
    //   state.contact = { ...state.offeredPrice, ...action.payload };
    // },
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

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInfo: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    linkedIn: "",
    x: "",
    country: "",
    city: "",
    address: "",
    phone: "",
  },
  companyInfo: {
    name: "",
    country: "",
    city: "",
    email: "",
    website: "",
    industry: "",
    foundingYear: "",
    revenue: {
      ltm: "",
      previousYear: "",
    },
    grossProfit: {
      ltm: "",
      previousYear: "",
    },
    EBITDA: {
      ltm: "",
      previousYear: "",
    },
  },
  teamInfo: {
    team1: {
      fullName: "",
      email: "",
    },
    team2: {
      fullName: "",
      email: "",
    },
  },
  credentials: {
    email: "",
    password: "",
  },
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    setCompanyInfo: (state, action) => {
      state.companyInfo = { ...state.companyInfo, ...action.payload };
    },
    setTeamInfo: (state, action) => {
      state.teamInfo = { ...state.teamInfo, ...action.payload };
    },
    setCredentials: (state, action) => {
      state.credentials = { ...state.credentials, ...action.payload };
    },
    reset: (state) => {
      return initialState;
    },
  },
});

export const {
  setPersonalInfo,
  setCompanyInfo,
  setTeamInfo,
  setCredentials,
  reset,
} = registerSlice.actions;
export const getRegister = (state: any) => state.register;
export default registerSlice.reducer;

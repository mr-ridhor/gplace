import { createSlice } from "@reduxjs/toolkit";
import { register } from "module";

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
      role: "",
    },
    team2: {
      fullName: "",
      role: "",
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
  },
});

export const { setPersonalInfo, setCompanyInfo, setTeamInfo, setCredentials } =
  registerSlice.actions;
export const getRegister = (state: any) => state.register;
export default registerSlice.reducer;

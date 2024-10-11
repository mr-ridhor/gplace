import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Investor } from "../data/mocked";

interface InvestorsState {
  investors: Investor[];
  loading: boolean;
  error: string | null;
  searchValue: string;
  selectedCompany: string | null;
  selectedCountries: string[];
  selectedDeals: string | null;
  selectedDealSize: string | null;
  selectedIndustry: string | null;
  selectedGeography: string | null;
  selectedContactTitle: string | null;
}

const initialState: InvestorsState = {
  investors: [],
  loading: false,
  error: null,
  searchValue: "",
  selectedCompany: null,
  selectedCountries: [],
  selectedDeals: null,
  selectedDealSize: null,
  selectedIndustry: null,
  selectedGeography: null,
  selectedContactTitle: null,
};

const investorsSlice = createSlice({
  name: "investors",
  initialState,
  reducers: {
    fetchInvestorsRequest(state) {
      state.loading = true;
    },
    fetchInvestorsSuccess(state, action: PayloadAction<Investor[]>) {
      state.investors = action.payload;
      state.loading = false;
    },
    fetchInvestorsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSelectedCompany(state, action: PayloadAction<string | null>) {
      state.selectedCompany = action.payload;
    },
    setSelectedCountries(state, action: PayloadAction<string[]>) {
      state.selectedCountries = action.payload;
    },
    setSelectedDeals(state, action: PayloadAction<string | null>) {
      state.selectedDeals = action.payload;
    },
    setSelectedDealSize(state, action: PayloadAction<string | null>) {
      state.selectedDealSize = action.payload;
    },
    setSelectedIndustry(state, action: PayloadAction<string | null>) {
      state.selectedIndustry = action.payload;
    },
    setSelectedGeography(state, action: PayloadAction<string | null>) {
      state.selectedGeography = action.payload;
    },
    setSelectedContactTitle(state, action: PayloadAction<string | null>) {
      state.selectedContactTitle = action.payload;
    },
  },
});

export const {
  fetchInvestorsRequest,
  fetchInvestorsSuccess,
  fetchInvestorsFailure,
  setSearchValue,
  setSelectedCompany,
  setSelectedCountries,
  setSelectedDeals,
  setSelectedDealSize,
  setSelectedIndustry,
  setSelectedGeography,
  setSelectedContactTitle,
} = investorsSlice.actions;

export default investorsSlice.reducer;

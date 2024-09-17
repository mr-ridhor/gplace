// lib/slice/panelSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PanelState {
  showFilter: boolean;
  showSearch: boolean;
}

const initialState: PanelState = {
  showFilter: false,
  showSearch: false,
};

const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    toggleFilterPanel: (state) => {
      state.showFilter = !state.showFilter;
      if (state.showFilter) state.showSearch = false; // Close search if filter is opened
    },
    toggleSearchPanel: (state) => {
      state.showSearch = !state.showSearch;
      if (state.showSearch) state.showFilter = false; // Close filter if search is opened
    },
    closeAllPanels: (state) => {
      state.showFilter = false;
      state.showSearch = false;
    },
  },
});

export const { toggleFilterPanel, toggleSearchPanel, closeAllPanels } =
  panelSlice.actions;
export const getPanel = (state: any) => state.panel;
export default panelSlice.reducer;

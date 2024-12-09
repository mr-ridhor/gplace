
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RowState {
  selectedRow: string | null;
  activeTab: string;
}

const initialState: RowState = {
  selectedRow: null,
  activeTab: "investors", // Default to investors
};

const rowSlice = createSlice({
  name: "row",
  initialState,
  reducers: {
    setSelectedRow: (state, action: PayloadAction<string>) => {
      state.selectedRow = action.payload;
      state.activeTab = action.payload; // Switch the active tab to the selected row
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload; // Update the active tab manually
    },
    resetSelectedRow: (state) => {
      state.selectedRow = null;
      state.activeTab = "investors"; // Reset to investors tab
    },
  },
});

export const { setSelectedRow, setActiveTab, resetSelectedRow } =
  rowSlice.actions;
// export const getSelectedRow = (state: any) => state.selectedRow;
export const getSelectedRow = (state: { row: RowState }) =>
  state.row.selectedRow;
export const getActiveTab = (state: { row: RowState }) => state.row.activeTab;

export default rowSlice.reducer;

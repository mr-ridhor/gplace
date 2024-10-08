// store/dataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockedInfoType } from "../data/mockedInfo";
// import { mockedInfoType } from "@/types"; // Import your type

interface DataState {
  data: mockedInfoType[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [], // Initialize with an empty array to prevent undefined errors
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<mockedInfoType[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  dataSlice.actions;
export default dataSlice.reducer;

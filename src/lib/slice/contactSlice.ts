import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockedInfoType } from "../data/mockedInfo";

interface DataState {
	data: mockedInfoType[];
	loading: boolean;
	error: string | null;
}

const initialState: DataState = {
	data: [],
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
		fetchDataSuccess: (state, action: PayloadAction<mockedInfoType>) => {
			state.loading = false;
			// Update the contact with the matching ID or add it
			const index = state.data.findIndex(
				(item) => item._id === action.payload._id
			);
			if (index !== -1) {
				state.data[index] = action.payload; // Update existing contact
			} else {
				state.data.push(action.payload); // Add new contact if not found
			}
		},
		fetchDataFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		deleteContactData(state, action: PayloadAction<string>) {
			state.data = state.data.filter(
				(contact) => contact._id !== action.payload
			);
		},
	},
});

export const {
	fetchDataStart,
	fetchDataSuccess,
	fetchDataFailure,
	deleteContactData,
} = dataSlice.actions;
export default dataSlice.reducer;

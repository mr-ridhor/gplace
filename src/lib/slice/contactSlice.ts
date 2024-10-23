// store/dataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockedInfoType } from "../data/mockedInfo"; // Adjust the import based on your directory structure

interface DataState {
	data: mockedInfoType[]; // Array of mockedInfoType
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
		fetchDataSuccess: (state, action: PayloadAction<mockedInfoType[]>) => {
			state.loading = false;
			state.data = action.payload; // Replace the data with the fetched data
		},
		addContact: (state, action: PayloadAction<mockedInfoType>) => {
			const existingIndex = state.data.findIndex(
				(contact) => contact._id === action.payload._id
			);
			if (existingIndex !== -1) {
				state.data[existingIndex] = action.payload; // Update existing contact
			} else {
				state.data.push(action.payload); // Add new contact if not found
			}
		},
		updateContact(state, action: PayloadAction<mockedInfoType>) {
			const index = state.data.findIndex(
				(contact) => contact._id === action.payload._id
			);
			if (index !== -1) {
				state.data[index] = action.payload;
			}
		},
		fetchDataFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		deleteContactData: (state, action: PayloadAction<string>) => {
			state.data = state.data.filter(
				(contact) => contact._id !== action.payload
			);
		},
	},
});

export const {
	fetchDataStart,
	fetchDataSuccess,
	addContact, // Exporting addContact for adding new contacts
	updateContact,
	fetchDataFailure,
	deleteContactData,
} = dataSlice.actions;

export default dataSlice.reducer;

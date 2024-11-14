import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { contType } from "../zod-type/contType";

// Define mockedInfoType
export type mockedInfoType = {
	name: string;
	title: string;
	email: string;
	phone: string;
	contactType?: string;
	investor?: string;
	_id?: string;
	surname: string;
};

// Async thunk to fetch contacts
export const fetchContacts = createAsyncThunk<mockedInfoType[], string>(
	"contact/fetchContacts",
	async (id) => {
		const response = await fetch(`/api/investors/${id}/contact`);
		if (!response.ok) {
			throw new Error("Failed to fetch contacts");
		}
		return await response.json();
	}
);

interface AddContactPayload {
	investorId: string;
	newContact: contType;
}
export const addContact = createAsyncThunk(
	"contacts/addContact",
	async ({ investorId, newContact }: AddContactPayload) => {
		const response = await axios.post(
			`/api/investors/${investorId}/contact`,
			newContact
		);
		return response.data;
	}
);

// Async thunk to edit a contact
export const editContact = createAsyncThunk(
	"contact/editContact",
	async ({
		investorId,
		id,
		updatedContact,
	}: {
		investorId: string;
		id: string;
		updatedContact: mockedInfoType;
	}) => {
		const response = await axios.put(
			`/api/investors/${investorId}/contact/${id}`,
			updatedContact
		);
		return response.data as mockedInfoType;
	}
);

// Async thunk to delete a contact
export const deleteContact = createAsyncThunk<
	{ id: string; message: string }, // Expected return type
	{ investorId: string; id: string }
>(
	"contact/deleteContact",
	async ({ investorId, id }: { investorId: string; id: string }) => {
		const response = await axios.delete(
			`/api/investors/${investorId}/contact/${id}`
		);
		return {
			id,
			message: response.data.message || "Contact deleted successfully!",
		};
	}
);

// Define initial state type
interface ContactState {
	data: mockedInfoType[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: ContactState = {
	data: [],
	status: "idle",
	error: null,
};

const contactSlice = createSlice({
	name: "contact",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchContacts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchContacts.fulfilled,
				(state, action: PayloadAction<mockedInfoType[]>) => {
					state.status = "succeeded";
					state.data = action.payload;
				}
			)
			.addCase(fetchContacts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to fetch contacts";
			})
			.addCase(
				addContact.fulfilled,
				(state, action: PayloadAction<mockedInfoType>) => {
					state.data.push(action.payload);
				}
			)
			.addCase(
				editContact.fulfilled,
				(state, action: PayloadAction<mockedInfoType>) => {
					const index = state.data.findIndex(
						(contact) => contact._id === action.payload._id
					);
					if (index !== -1) state.data[index] = action.payload;
				}
			)
			.addCase(
				deleteContact.fulfilled,
				(state, action: PayloadAction<{ id: string; message: string }>) => {
					state.data = state.data.filter(
						// (contact) => contact._id !== action.payload
						(contact) => contact._id !== action.payload.id
					);
				}
			);
	},
});

export default contactSlice.reducer;

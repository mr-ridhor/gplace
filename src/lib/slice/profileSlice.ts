import { industries } from "@/lib/data/industry";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Bio {
	firstName: string;
	lastName: string;
	title: string;
	city: string;
	country: string;
	email: string;
	phone: string;
	linkedIn?: string;
	x?: string;
	address: string;
}

export type Company = {
	name: string;
	country: string;
	city: string;
	// email: string;
	website?: string;
	industry: string;

	foundingYear: number;
	revenue: {
		ltm: string;
		previousYear: string;
	};
	grossProfit: {
		ltm: string;
		previousYear: string;
	};
	EBITDA: {
		ltm: string;
		previousYear: string;
	};
};
export interface Team {
	team1?: {
		fullName?: string;
		email?: string;
	};
	team2?: {
		fullName?: string;
		email?: string;
	};
}

interface ProfileState {
	bio?: Bio;
	company?: Company;
	team?: Team;
	credentials?: {
		email: string;
	};
}

const initialState: ProfileState = {};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setProfile: (state, action: PayloadAction<ProfileState>) => {
			return { ...state, ...action.payload };
		},
		updatePersonalInfo: (state, action: PayloadAction<Bio>) => {
			if (state.bio) {
				state.bio = { ...state.bio, ...action.payload };
			}
		},
		updateCompanyInfo: (state, action: PayloadAction<Company>) => {
			if (state.company) {
				state.company = { ...state.company, ...action.payload };
			}
		},
		updateTeamInfo: (state, action: PayloadAction<Team>) => {
			if (state.team) {
				state.team = { ...state.team, ...action.payload };
			}
		},
	},
});

export const {
	setProfile,
	updatePersonalInfo,
	updateCompanyInfo,
	updateTeamInfo,
} = profileSlice.actions;
export const getProfile = (state: any) => state.profile;

export default profileSlice.reducer;

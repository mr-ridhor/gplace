import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Revenue {
	ltm: string;
	previousYear?: string;
}

interface GrossProfit {
	ltm: string;
	previousYear: string;
}

interface EBITDA {
	ltm: string;
	previousYear: string;
}

interface CompanyInfo {
	name: string;
	country: string;
	city: string;
	website: string;
	industry: string;
	industryType: string;
	foundingYear: string;
	revenue: Revenue;
	grossProfit?: GrossProfit;
	EBITDA?: EBITDA;
}

interface TeamMember {
	fullName: string;
	email: string;
}

interface TeamInfo {
	team1: TeamMember;
	team2: TeamMember;
}

interface Credentials {
	email: string;
	password: string;
}

interface PersonalInfo {
	firstName: string;
	lastName: string;
	title: string;
	email: string;
	linkedIn: string;
	x: string;
	country: string;
	city: string;
	address: string;
	phone: string;
	passwors: string;
}

interface RegisterState {
	personalInfo: PersonalInfo;
	companyInfo: CompanyInfo;
	teamInfo: TeamInfo;
	credentials: Credentials;
}

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
		website: "",
		industry: "",
		industryType: "",
		foundingYear: "",
		revenue: {
			ltm: "",
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
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Define the types for the state
// interface Revenue {
// 	ltm: string;
// 	previousYear: string;
// }

// interface GrossProfit {
// 	ltm: string;
// 	previousYear: string;
// }

// interface EBITDA {
// 	ltm: string;
// 	previousYear: string;
// }

// interface CompanyInfo {
// 	name: string;
// 	country: string;
// 	city: string;
// 	website: string;
// 	industry: string;
// 	industryType: string;
// 	foundingYear: string;
// 	revenue: Revenue;
// 	grossProfit: GrossProfit;
// 	EBITDA: EBITDA;
// }

// interface TeamMember {
// 	fullName: string;
// 	email: string;
// }

// interface TeamInfo {
// 	team1: TeamMember;
// 	team2: TeamMember;
// }

// interface Credentials {
// 	email: string;
// 	password: string;
// }

// interface PersonalInfo {
// 	firstName: string;
// 	lastName: string;
// 	title: string;
// 	email: string;
// 	linkedIn: string;
// 	x: string;
// 	country: string;
// 	city: string;
// 	address: string;
// 	phone: string;
// 	password: string;
// 	confirmPass: string;
// }

// interface RegisterState {
// 	personalInfo: PersonalInfo;
// 	companyInfo: CompanyInfo;
// 	teamInfo: TeamInfo;
// 	credentials: Credentials;
// }

// // Define the initial state
// const initialState: RegisterState = {
// 	personalInfo: {
// 		firstName: "",
// 		lastName: "",
// 		title: "",
// 		email: "",
// 		linkedIn: "",
// 		x: "",
// 		country: "",
// 		city: "",
// 		address: "",
// 		phone: "",
// 		password: "",
// 		confirmPass: "",
// 	},
// 	companyInfo: {
// 		name: "",
// 		country: "",
// 		city: "",
// 		website: "",
// 		industry: "",
// 		industryType: "",
// 		foundingYear: "",
// 		revenue: {
// 			ltm: "",
// 			previousYear: "",
// 		},
// 		grossProfit: {
// 			ltm: "",
// 			previousYear: "",
// 		},
// 		EBITDA: {
// 			ltm: "",
// 			previousYear: "",
// 		},
// 	},
// 	teamInfo: {
// 		team1: {
// 			fullName: "",
// 			email: "",
// 		},
// 		team2: {
// 			fullName: "",
// 			email: "",
// 		},
// 	},
// 	credentials: {
// 		email: "",
// 		password: "",
// 	},
// };

// // Create the slice
// const registerSlice = createSlice({
// 	name: "register",
// 	initialState,
// 	reducers: {
// 		setPersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
// 			state.personalInfo = { ...state.personalInfo, ...action.payload };
// 		},
// 		setCompanyInfo: (state, action: PayloadAction<Partial<CompanyInfo>>) => {
// 			state.companyInfo = { ...state.companyInfo, ...action.payload };
// 		},
// 		setTeamInfo: (state, action: PayloadAction<Partial<TeamInfo>>) => {
// 			state.teamInfo = { ...state.teamInfo, ...action.payload };
// 		},
// 		setCredentials: (state, action: PayloadAction<Partial<Credentials>>) => {
// 			state.credentials = { ...state.credentials, ...action.payload };
// 		},
// 		reset: (state) => {
// 			return initialState;
// 		},
// 	},
// });

// export const {
// 	setPersonalInfo,
// 	setCompanyInfo,
// 	setTeamInfo,
// 	setCredentials,
// 	reset,
// } = registerSlice.actions;

// export const getRegister = (state: { register: RegisterState }) =>
// 	state.register;

// export default registerSlice.reducer;

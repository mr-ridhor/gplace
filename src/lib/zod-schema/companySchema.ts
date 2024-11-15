import { z } from "zod";

const numericString = z
	.string()
	.refine((val) => val === "" || /^\d+$/.test(val), {
		message: "Must be a number",
	});

const revenueTypeSchema = z.object({
	ltm: numericString, // Required numeric string
	previousYear: numericString.optional(), // Optional numeric string
});

const grossProfitTypeSchema = z.object({
	ltm: numericString.optional(), // Required numeric string
	previousYear: numericString.optional(), // Optional numeric string
});

const ebitdaTypeSchema = z.object({
	ltm: numericString.optional(), // Required numeric string
	previousYear: numericString.optional(), // Optional numeric string
});
export const companySchema = z.object({
	name: z.string().min(1, "Company name is required"),
	country: z.string().min(1, "Country is required"),
	city: z.string().min(1, "City is required"),
	// email: z.string().email("Invalid email address"),
	website: z.string(),
	industry: z.string().min(1, "Industry is required"),

	foundingYear: z
		.string()
		.regex(/^\d{4}$/, "Founding year must be a valid 4-digit year"),
	revenue: revenueTypeSchema.optional(),
	grossProfit: grossProfitTypeSchema.optional(),
	EBITDA: ebitdaTypeSchema.optional(),
});
const numericStr = z.string().refine((val) => /^\d+$/.test(val), {
	message: "Must be a number between 0 and 9",
});

export const CompanySchema = z.object({
	name: z.string().min(1, "Company name is required"),
	country: z.string().min(1, "Country is required"),
	city: z.string().min(1, "City is required"),
	// email: z.string().email("Invalid email format"),
	website: z.string().optional(),
	industry: z.string().min(1, "Industry is required"),

	foundingYear: z.number().positive("Founding year"),
	revenue: revenueTypeSchema.optional(),
	grossProfit: grossProfitTypeSchema.optional(),
	EBITDA: ebitdaTypeSchema.optional(),
});

import { z } from "zod";

export const invcomSchema = z.object({
	name: z.string().min(1, "Company name is required"),
	country: z.string().min(1, "Country is required"),
	city: z.string().min(1, "City is required"),
	noEmp: z.string().regex(/^\d+$/, "Must be a  number"),
	website: z.string(),
	investorType: z.string().min(1, "Investor type is required"),
	description: z.string().min(1, "Description is required"),
	yearFounded: z.string().regex(/^\d{4}$/, "Must be a valid 4-digit year"),
});

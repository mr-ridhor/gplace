import { z } from "zod";

export const invpro2Schema = z.object({
	med: z
		.string()
		.min(1, "Medium size industry is required")
		.regex(/^\d+$/, "Must be a number"),

	aum: z.string().min(1, "Aum is required").regex(/^\d+$/, "Must be a number"),
	deal: z.string().min(1, "Deal required").regex(/^\d+$/, "Must be a number"),
});

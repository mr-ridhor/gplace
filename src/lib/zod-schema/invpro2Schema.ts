import { z } from "zod";

export const invpro2Schema = z.object({
	med: z
		.string()
		.min(1, "Medium size industry is required")
		.regex(/^\d+$/, "Medium size industry must be a number"),

	aum: z
		.string()
		.min(1, "Aum is required")
		.regex(/^\d+$/, "AUM must be a number"),
	deal: z
		.string()
		.min(1, "Deal required")
		.regex(/^\d+$/, "Deal in 5Y must be a number"),
});

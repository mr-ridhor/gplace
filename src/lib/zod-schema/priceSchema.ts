import { z } from "zod";

export const priceSchema = z.object({
	// val: z.string().min(1, "Valuation is required"),
	// evRev: z.string().min(1, "Ev/Revenue is required"),
	// evEbd: z.string().min(1, "Ev/EbitDa size is required"),
	// // offeredPrice: z.string().min(1, "Offered Price size is required"),

	val: z.object({
		from: z.string().regex(/^\d+$/, "Previous Valuation must be a number"),
		to: z.string().regex(/^\d+$/, "Current Valuation must be a number"),
	}),
	evRev: z.object({
		from: z.string(),
		to: z.string(),
	}),
	evEbd: z.object({
		from: z.string(),
		to: z.string(),
	}),
});

import { z } from "zod";

// export const priceSchema = z.object({

// 	val: z.object({
// 		from: z.string().regex(/^\d+$/, "Must be a number"),
// 		to: z.string().regex(/^\d+$/, "Must be a number"),
// 	}),
// 	evRev: z.object({
// 		from: z.string().regex(/^\d+$/, "Must be a number"),
// 		to: z.string().regex(/^\d+$/, "Must be a number"),
// 	}),
// 	evEbd: z.object({
// 		from: z.string().regex(/^\d+$/, "Must be a number"),
// 		to: z.string().regex(/^\d+$/, "Must be a number"),
// 	}),
// });
export const priceSchema = z.object({
	val: z.object({
		from: z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"),
		to: z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"),
	}),
	evRev: z.object({
		from: z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"),
		to: z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"),
	}),
	evEbd: z.object({
		from: z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"),
		to: z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"),
	}),
});

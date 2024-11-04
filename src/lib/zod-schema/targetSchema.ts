import { z } from "zod";
import { offeredPriceSchema } from "./offeredPriceSchema";

// export const targetSchema = z.object({
//   rev: z.string().min(1, "Revenue is required"),
//   ebdt: z.string().min(1, "Ebitda is required"),
//   dealsz: z.string().min(1, "Deal size is required"),
//   offeredPrice: z.string().min(1, "Offered Price is required"),
// });
// import { z } from "zod";

// Define the Zod schema
export const targetSchema = z.object({
	// rev: z.string().min(1, "Revenue is required"), // Equivalent to Yup's required
	// ebdt: z.string().min(1, "EBITDA is required"),
	// dealsz: z.string().min(1, "Deal size is required"),
	// valuation: z.string().min(1, "Valuation is required"), // Valuation is required
	rev: z.object({
		from: z.string().regex(/^\d+$/, " Previous Revenue from must be a number"),
		to: z.string().regex(/^\d+$/, "Current Revenue to must be a number"),
	}),
	ebdt: z.object({
		from: z.string().regex(/^\d+$/, "Previous EBITDA  must be a number"),
		to: z.string().regex(/^\d+$/, "Current EBITDA to must be a number"),
	}),
	dealsz: z.object({
		from: z.string().regex(/^\d+$/, "Previous Deal size  must be a number"),
		to: z.string().regex(/^\d+$/, "Current Deal size  must be a number"),
	}),
	valuation: z
		.string()
		.min(1, "Valuation is required")
		.regex(/^\d+$/, "Valuation must be a number"),
});

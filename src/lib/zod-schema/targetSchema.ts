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
  rev: z.string().min(1, "Revenue is required"), // Equivalent to Yup's required
  ebdt: z.string().min(1, "EBITDA is required"),
  dealsz: z.string().min(1, "Deal size is required"),
  offeredPrice: z.object({
    valuation: z.number().min(1, "Valuation is required"), // Valuation is required
    ebidta: z.number().optional(), // Optional fields in Zod
    revenue: z.number().optional(),
  }),
});

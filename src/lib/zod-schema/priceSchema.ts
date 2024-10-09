import { z } from "zod";

export const priceSchema = z.object({
  val: z.string().min(1, "Valuation is required"),
  evRev: z.string().min(1, "Ev/Revenue is required"),
  evEbd: z.string().min(1, "Ev/EbitDa size is required"),
  offeredPrice: z.string().min(1, "Offered Price size is required"),
});

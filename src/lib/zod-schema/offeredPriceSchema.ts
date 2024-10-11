import { z } from "zod";

export const offeredPriceSchema = z.object({
  valuation: z.string(),
  ebidta: z.string().optional(),
  revenue: z.string().optional(),
});

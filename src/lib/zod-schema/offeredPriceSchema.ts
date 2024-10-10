import { z } from "zod";

export const offeredPriceSchema = z.object({
  offeredPriceValuation: z.string(),
  ebidta: z.string().optional(),
  revenue: z.string().optional(),
});

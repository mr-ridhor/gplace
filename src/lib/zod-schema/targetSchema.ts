import { z } from "zod";

export const targetSchema = z.object({
  rev: z.string().min(1, "Revenue is required"),
  ebdt: z.string().min(1, "Ebitda is required"),
  dealsz: z.string().min(1, "Deal size is required"),
  offeredPrice: z.string().min(1, "Offered Price size is required"),
});

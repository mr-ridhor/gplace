import { z } from "zod";

export const invpro2Schema = z.object({
  med: z.string().min(1, "Medium size industry is required"),
  aum: z.string().min(1, "Aum is required"),
  deal: z.string().min(1, "Deal required"),
});

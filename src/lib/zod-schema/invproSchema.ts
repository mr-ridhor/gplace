import { z } from "zod";

export const invproSchema = z.object({
  invInd: z.string().min(1, "Investment industry is required"),
  invGeo: z.string().min(1, "Investment geographies is required"),
  noLTM: z.string().min(1, "LTM is required"),
});

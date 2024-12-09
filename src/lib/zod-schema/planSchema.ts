import { z, ZodType } from "zod";
import { planType } from "../zod-type/plan";


export const planSchema: ZodType<planType> = z.object({
  // otpCode: z.string().min(4).max(4, "OTP must be exactly 4 digits"),
  cardNumber:z.string(),
  fulName:z.string(),
  exp_date:z.string(),
  cvv:z.string()
});

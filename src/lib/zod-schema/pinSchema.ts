import { z, ZodType } from "zod";
import { pinType } from "../zod-type/pinType";

export const pinSchema: ZodType<pinType> = z.object({
  otpCode: z.string().min(5).max(5, "OTP must be exactly 5 digits"),
});

import { z, ZodType } from "zod";
import { pinType } from "../zod-type/pinType";

export const pinSchema: ZodType<pinType> = z.object({
  otpCode: z.string().min(4).max(4, "OTP must be exactly 4 digits"),
});

import { z, ZodType } from "zod";
import { emailType } from "../zod-type/emailType";

export const emailSchema: ZodType<emailType> = z.object({
  email: z.string().email("Invalid email address."),
});

import { ZodType, z } from "zod";
import { loginType } from "../zod-type/loginType";

export const loginSchema: ZodType<loginType> = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

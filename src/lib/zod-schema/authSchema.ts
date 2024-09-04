import { ZodType, z } from "zod";
import { authType } from "../zod-type/authType";
// import { authType } from "../zodTypes/authType";

export const authSchema: ZodType<authType> = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPass: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Passwords don't match",
    path: ["confirmPass"],
  });

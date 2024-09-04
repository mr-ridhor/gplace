import { z, ZodType } from "zod";
import { resetType } from "../zod-type/resetType";

export const resetSchema: ZodType<resetType> = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

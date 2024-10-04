import { z, ZodType } from "zod";
import { personalType } from "../zod-type/personalType";
// import { personalType } from "../zodTypes/personalType";

export const personalSchema: ZodType<personalType> = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    title: z.string().min(1, "Title is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    linkedIn: z.string().url("Invalid LinkedIn URL"),
    x: z.string().url("Invalid Twitter URL"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPass: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Passwords don't match",
    path: ["confirmPass"],
  });

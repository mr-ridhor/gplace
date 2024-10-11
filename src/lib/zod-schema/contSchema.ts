import { z } from "zod";

export const contSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  title: z.string().min(1, "Title is required").optional(),
  contactType: z.string().optional(),
});

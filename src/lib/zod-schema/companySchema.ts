// import { z, ZodType } from "zod";
import { companyType } from "../zod-type/companyType";

// export const companySchema: ZodType<companyType> = z.object({
//   companyName: z.string().min(1, "Company name is required"),
//   country: z.string().min(1, "Country is required"),
//   city: z.string().min(1, "City is required"),
//   email: z.string().email("Invalid email address"),
//   website: z.string().url("Invalid website URL"),
//   industry: z.string().min(1, "Industry is required"),
//   foundingYear: z.string().regex(/^\d{4}$/, "Invalid year"),
//   revenue: z.string().min(1, "Revenue is required"),
//   prevRevenue: z.string().min(1, "Previous revenue is required"),
//   profit: z.string().min(1, "Profit is required"),
//   prevProfit: z.string().min(1, "Previous profit is required"),
//   ebitda: z.string().min(1, "EBITDA is required"),
//   prevEbitda: z.string().min(1, "Previous EBITDA is required"),
// });
// companySchema.ts
import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  email: z.string().email("Invalid email address"),
  website: z.string(),
  industry: z.string().min(1, "Industry is required"),
  foundingYear: z
    .string()
    .regex(/^\d{4}$/, "Founding year must be a valid 4-digit year"),
  revenue: z.object({
    ltm: z.string(),
    previousYear: z.string(),
  }),
  grossProfit: z.object({
    ltm: z.string(),
    previousYear: z.string(),
  }),
  EBITDA: z.object({
    ltm: z.string(),
    previousYear: z.string(),
  }),
});

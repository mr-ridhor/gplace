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
	// email: z.string().email("Invalid email address"),
	website: z.string(),
	industry: z.string().min(1, "Industry is required"),
	// industryType: z.string().min(1, "Industry type  is required"),
	foundingYear: z
		.string()
		.regex(/^\d{4}$/, "Founding year must be a valid 4-digit year"),
	revenue: z.object({
		ltm: z.string().regex(/^\d+$/, "Must be a  number").optional(),
		previousYear: z.string().regex(/^\d+$/, "Must be a  number").optional(),
	}),
	grossProfit: z.object({
		ltm: z.string().regex(/^\d+$/, "Must be a  number").optional(),
		previousYear: z.string().regex(/^\d+$/, "Must be a  number").optional(),
	}),
	EBITDA: z.object({
		ltm: z.string().regex(/^\d+$/, "Must be a  number").optional(),
		previousYear: z.string().regex(/^\d+$/, "Must be a  number").optional(),
	}),
});

// const revenueSchema = z.object({
//   ltm: z.string().min(1, "LTM revenue is required"),
//   previousYear: z.string().min(1, "Previous year revenue is required"),
// });

// const grossProfitSchema = z.object({
//   ltm: z.string().min(1, "LTM gross profit is required"),
//   previousYear: z.string().min(1, "Previous year gross profit is required"),
// });

// const ebitdaSchema = z.object({
//   ltm: z.string().min(1, "LTM EBITDA is required"),
//   previousYear: z.string().min(1, "Previous year EBITDA is required"),
// });

// export const CompanySchema = z.object({
//   name: z.string().min(1, "Company name is required"),
//   country: z.string().min(1, "Country is required"),
//   city: z.string().min(1, "City is required"),
//   email: z.string().email("Invalid email format"),
//   website: z.string().url("Invalid website URL").optional(),
//   industry: z.string().min(1, "Industry is required"),
//   foundingYear: z.string().min(1, "Founding year is required"),
//   revenue: revenueSchema,
//   grossProfit: grossProfitSchema,
//   EBITDA: ebitdaSchema,
// });
const revenueSchema = z.object({
	ltm: z.string().regex(/^\d+$/, "Must be a number"),
	previousYear: z.string().regex(/^\d+$/, "Must be a number"),
});

const grossProfitSchema = z.object({
	ltm: z.string().regex(/^\d+$/, "Must be a number"),
	previousYear: z.string().regex(/^\d+$/, "Must be a number"),
});

const ebitdaSchema = z.object({
	ltm: z.string().regex(/^\d+$/, "Must be a number"),
	previousYear: z.string().regex(/^\d+$/, "Must be a number"),
});
const industryOptionSchema = z.object({
	// id: z.number(),
	label: z.string(),
	value: z.string(),
});

export const CompanySchema = z.object({
	name: z.string().min(1, "Company name is required"),
	country: z.string().min(1, "Country is required"),
	city: z.string().min(1, "City is required"),
	email: z.string().email("Invalid email format"),
	website: z.string().optional(),
	industry: z.string().min(1, "Industry is required"),
	// industry: z
	// 	.array(industryOptionSchema)
	// 	.min(1, "At least one Investment industry is required"),
	foundingYear: z.number().positive("Founding year"), // Changed to number
	revenue: revenueSchema,
	grossProfit: grossProfitSchema,
	EBITDA: ebitdaSchema,
});

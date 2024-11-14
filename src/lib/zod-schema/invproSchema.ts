// import { z } from "zod";

// export const invproSchema = z.object({
//   invInd: z.string().min(1, "Investment industry is required"),
//   invGeo: z.string().min(1, "Investment geographies is required"),
//   noLTM: z.string().min(1, "LTM is required"),
// });
import { z } from "zod";

const industryOptionSchema = z.object({
	// id: z.number(),
	label: z.string(),
	value: z.string(),
});
const invGeoSchema = z.object({
	// id: z.number(),
	label: z.string(),
	value: z.string(),
});
export const invproSchema = z.object({
	invInd: z
		.array(industryOptionSchema)
		.min(1, "At least one Investment industry is required"),
	// invGeo: z.string().min(1, "Investment geographies are required"),
	invGeo: z
		.array(invGeoSchema)
		.min(1, "At least one Investment geography is required"),
	noLTM: z
		.string()
		.min(1, "LTM is required")
		.regex(/^\d+$/, "Must be a number"),
});

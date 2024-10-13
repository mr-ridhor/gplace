// import { z, ZodType } from "zod";
// import { teamType } from "../zod-type/teamType";

// export const teamSchema: ZodType<teamType> = z.object({
//   fullName: z.string().optional(),
//   role: z.string().optional(),
//   fullName2: z.string().optional(),
//   role2: z.string().optional(),
// });
// teamSchema.ts
import { z } from "zod";

export const teamSchema = z.object({
	team1: z.object({
		fullName: z.string().optional(),
		// role: z.string().optional(),
		email: z.string().optional(),
	}),
	team2: z.object({
		fullName: z.string().optional(),
		// role: z.string().optional(),
		email: z.string().optional(),
	}),
});

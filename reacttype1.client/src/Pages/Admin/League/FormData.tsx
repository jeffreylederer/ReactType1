import { z } from 'zod';


export const FormDataSchema = z.object({
    leagueName: z.string().min(1, "League Name is required").max(50, "League Nmme has a maximum of 50 characters"),
    active: z.boolean(),
    teamSize: z.coerce.number().gte(1, "Team size is between 1 and 3").lte(3, "Team size is between 1 and 3"),
    tiesAllowed: z.boolean(),
    pointsCount: z.boolean(),
    winPoints: z.coerce.number().gte(1, "Minimum number of points for a tie is 0").lte(3, "Maximum number of points for a winn is 1"),
    tiePoints: z.coerce.number().gte(1, "Minimum number of points for a win is 0").lte(3, "Maximum number of points for a tie is 1"),
    byePoints: z.coerce.number().gte(1, "Minimum number of points for a bye is 0").lte(3, "Maximum number of points for a bye is 1"),
    startWeek: z.coerce.number().gte(1, "Start week is between 1 and 10").lte(10, "Start week is between 1 and 10"),
    pointsLimit: z.boolean(),
    divisions: z.coerce.number().gte(1, "Minimum number of divisions is 1").lte(3, "Maximum number of divisions is 3"),
    playOffs: z.boolean()
});

export type FormData = z.infer<typeof FormDataSchema>;
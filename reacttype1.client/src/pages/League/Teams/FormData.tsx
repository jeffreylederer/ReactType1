import { z } from 'zod';

export const FormDataSchema = z.object({
    id: z.coerce.number(), 
    leagueid: z.coerce.number(),
    skip: z.coerce.number(),
    viceSkip: z.coerce.number().optional(),
    lead: z.coerce.number().optional(),
    teamNo: z.coerce.number(),
    divisionId: z.coerce.number().min(1, "Select a division")
});

export type FormData = z.infer<typeof FormDataSchema>;



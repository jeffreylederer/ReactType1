import { z } from 'zod';


export const UpdateFormDataSchema = z.object({
    id: z.coerce.number(),
    gameDate: z.string(),
    leagueid: z.number(),
    cancelled: z.boolean(),
    playOffs: z.boolean()
});

export type UpdateFormData = z.infer<typeof UpdateFormDataSchema>;



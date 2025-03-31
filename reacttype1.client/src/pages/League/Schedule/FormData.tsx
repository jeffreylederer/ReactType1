import { z } from 'zod';


export const FormDataSchema = z.object({
    gameDate: z.string(),
    leagueid: z.string(),
    cancelled: z.boolean(),
    playOffs: z.boolean()
});

export type FormData = z.infer<typeof FormDataSchema>;



import { z } from 'zod';

export const PlayerFormDataSchema = z.object({
    leagueid: z.number(),
    membershipId: z.coerce.number().min(1, "Select a member")
   
});

export type PlayerFormData = z.infer<typeof PlayerFormDataSchema>;



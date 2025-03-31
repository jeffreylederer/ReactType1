import { z } from 'zod';

export const PlayerFormDataSchema = z.object({
    membershipId: z.coerce.number().min(1, "Select a member"),
    leagueid: z.coerce.number()

   
});

export type PlayerFormData = z.infer<typeof PlayerFormDataSchema>;



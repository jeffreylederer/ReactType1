import { z } from 'zod';


export const UpdateFormDataSchema = z.object({
    id: z.number(),
    roleId: z.coerce.number(),
    displayName: z.string().min(1, "Display name is required").max(50, "Display name is limited to 50 characters"),
    isActive: z.boolean(),
 
});

export type UpdateFormData = z.infer<typeof UpdateFormDataSchema>;
import { z } from 'zod';


export const UpdateFormDataSchema = z.object({
    id: z.coerce.number(),
    password: z.string().email("Must be an email address").min(1, "Password is required").max(50, "Password is limited to 450 characters"),
});

export type UpdateFormData = z.infer<typeof UpdateFormDataSchema>;
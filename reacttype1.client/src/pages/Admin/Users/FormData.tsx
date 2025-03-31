import { z } from 'zod';


export const FormDataSchema = z.object({
    roleId: z.coerce.number(),
    userName: z.string().min(1, "User name is required").max(450,"User name is limited to 450 characters"),
    password: z.string().min(1, "Password is required").max(50, "Password is limited to 450 characters"),
    displayName: z.string().min(1, "Display name is required").max(50, "Display name is limited to 50 characters"),
    isActive: z.boolean()

});

export type FormData = z.infer<typeof FormDataSchema>;
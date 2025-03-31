import { z } from 'zod';


export const FormDataSchema = z.object({
    username: z.string().min(1, "User name is required").max(450,"User name is limited to 450 characters"),
    password: z.string().min(1, "Password is required").max(50, "Password is limited to 450 characters"),
});

export type FormData = z.infer<typeof FormDataSchema>;
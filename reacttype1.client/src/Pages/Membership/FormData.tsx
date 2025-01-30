import { z } from 'zod';


export const FormDataSchema = z.object({

    firstName: z.string().min(1, "First Name is required").max(50, "First Nmme has a maximum of 50 characters"),
    lastName: z.string().min(1, "Last Name is required").max(50, "Last Nmme has a maximum of 50 characters"),
    fullName: z.string(),
    shortname: z.string().max(25, "Short Nmme has a maximum of 25 characters"),
    nickName: z.string(),
    wheelchair: z.boolean()
});

export type FormData = z.infer<typeof FormDataSchema>;



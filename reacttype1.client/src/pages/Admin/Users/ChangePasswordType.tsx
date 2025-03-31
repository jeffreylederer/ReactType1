import { z } from 'zod';


export const ChangePasswordTypeSchema = z
    .object({
        id: z.number(),
        password: z.string().min(6, "password is required and at least 6 characts").max(50, "password is limited to 50 characters"),
        confirmPassword: z.string()
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['confirmPassword'],
            })
        }
    })
    ;

export type ChangePasswordType = z.infer<typeof ChangePasswordTypeSchema>;
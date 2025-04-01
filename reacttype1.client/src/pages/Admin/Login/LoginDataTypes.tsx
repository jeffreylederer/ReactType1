import { z } from 'zod';

// Usered by Login method
export const LoginTypeSchema = z.object({
    username: z.string().email("Must be an email address").min(1, "User name is required").max(450, "User name is limited to 450 characters"),
    password: z.string().min(1, "Password is required").max(50, "Password is limited to 450 characters"),
});

export type LoginType = z.infer<typeof LoginTypeSchema>;



export const RecoverPasswordRequestDataSchema = z.object({
    userName: z.string().email("Must be an email address").min(1, "User name is required"),
    url: z.string()

});

export type RecoverPasswordRequestData = z.infer<typeof RecoverPasswordRequestDataSchema>;


export const  UpdatePasswordDataScheme = z
    .object({
        id: z.number(),
        password: z.string().min(1, "Password is required").max(50, "Password is limited to 450 characters"),
        confirmPassword: z.string()
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ['confirmPassword']
            });
        }
    });

export type UpdatePasswordData = z.infer<typeof UpdatePasswordDataScheme>;
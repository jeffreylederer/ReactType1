import { z } from 'zod';


export const UpdateFormDataSchema = z.object({
    id: z.coerce.number(),
    team1Score: z.coerce.number().min(0, "Team 1's score must be not negative"),
    team2Score: z.coerce.number().min(0, "Team 2's score must be not negative"),
    forfeit: z.coerce.number(),
    team1Win: z.number(),
    team2Win: z.number()
});

export type UpdateFormData = z.infer<typeof UpdateFormDataSchema>;

export const UpdateFormDataSchemaNoPoints = z
    .object({
        id: z.coerce.number(),
        team1Win: z.boolean(),
        team2Win: z.boolean()
    });

export type UpdateFormDataNoPoints = z.infer<typeof UpdateFormDataSchemaNoPoints>;






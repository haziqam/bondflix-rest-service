import {z} from 'zod';

export const LoginSchema = z.object({
    identifier: z.string(),
    password: z.string(),
});
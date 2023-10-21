import {z} from 'zod';

export const RegisterSchema = z.object({
    username: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
});
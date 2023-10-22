import {z} from 'zod';

export const CreateUserSchema = z.object({
    username: z.string().min(1, 'Username must not be empty'),
    name: z.string().min(1, 'Name must not be empty'),
    email: z.string().min(1, 'Email must not be empty'),
    password: z.string().min(1, 'Password must not be empty'),
    isAdmin: z.boolean(),
});

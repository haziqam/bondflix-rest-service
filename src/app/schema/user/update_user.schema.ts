import {z} from 'zod';

export const UpdateUserSchema = z.object({
    username: z.string().min(1, 'Username must not be empty').optional(),
    name: z.string().min(1, 'Name must not be empty').optional(),
    email: z.string().min(1, 'Email must not be empty').optional(),
    password: z.string().min(1, 'Password must not be empty').optional(),
    isAdmin: z.boolean().optional(),
});

import {z} from 'zod';

export const CreateContentSchema = z.object({
    title: z.string().min(1, 'Title must not be empty'),
    creator_id: z.number(),
    description: z.string(),
    release_date: z.date(),
});

import {z} from 'zod';

export const UpdateContentSchema = z.object({
    title: z.string().min(1, 'Title must not be empty').optional(),
    description: z.string().optional(),
    creator_id: z.number().optional(),
    visibility: z.string().optional(),
    content_file_path: z.string().min(1, 'Content file path must not be empty').optional(),
    thumbnail_file_path: z.string().min(1, 'Thumbnail file path must not be empty').optional(),
});

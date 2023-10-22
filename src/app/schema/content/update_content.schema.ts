import {z} from 'zod';

export const UpdateContentSchema = z.object({
    title: z.string().min(1, 'Title must not be empty').optional(),
    description: z.string().optional(),
    release_date: z.string().refine((dateString) => {
        return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(dateString);
    }, {
        message: 'Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ).',
    }),
    content_file_path: z.string().min(1, 'Content file path must not be empty').optional(),
    thumbnail_file_path: z.string().min(1, 'Thumbnail file path must not be empty').optional(),
});

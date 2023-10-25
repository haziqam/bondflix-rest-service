import {z} from 'zod'

export const updateDirectorSchema = z.object({
    name: z.string().min(1, "Directors name may not be empty"),
})
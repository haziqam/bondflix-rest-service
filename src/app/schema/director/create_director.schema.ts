import {z} from 'zod'

export const createDirectorSchema = z.object({
    name: z.string().min(1, "Director name may not be empty"),
})
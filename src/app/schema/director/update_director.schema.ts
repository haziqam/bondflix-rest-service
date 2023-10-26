import {z} from 'zod'

export const UpdateDirectorSchema = z.object({
    name: z.string().min(1, "Director name may not be empty"),
})
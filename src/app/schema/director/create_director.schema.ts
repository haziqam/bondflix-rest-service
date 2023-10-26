import {z} from 'zod'

export const CreateDirectorSchema = z.object({
    name: z.string().min(1, "Director name may not be empty"),
})
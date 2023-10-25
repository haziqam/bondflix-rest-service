import {z} from "zod";

export const createActorSchema = z.object({
    first_name: z.string().min(1, "First name may not be empty"),
    last_name: z.string().min(1, "Last name may not be empty"),
    birth_date: z.string().datetime(),
    gender: z.string()
})

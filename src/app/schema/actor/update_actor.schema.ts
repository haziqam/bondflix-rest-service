import { z } from "zod";

export const updateActorSchema =z.object({
    first_name: z.string().min(1, "First name may not be empty").optional(),
    last_name: z.string().min(1, "Last name may not be empty").optional(),
    birth_date: z.string().datetime().optional(),
    gender: z.string().optional()
})

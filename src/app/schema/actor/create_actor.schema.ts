import {z} from "zod";

export const createActorSchema = z.object({
    name: z.string().min(1, "Actor name may not be empty"),
})

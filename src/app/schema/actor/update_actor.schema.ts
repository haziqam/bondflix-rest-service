import {z} from "zod";

export const UpdateActorSchema =z.object({
    name: z.string().min(1, "Actor name may not be empty"),
})

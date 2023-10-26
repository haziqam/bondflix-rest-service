import {z} from "zod";

export const CreateActorSchema = z.object({
    name: z.string().min(1, "Actor name may not be empty"),
})

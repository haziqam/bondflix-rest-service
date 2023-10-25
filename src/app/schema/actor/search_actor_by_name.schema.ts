import {z} from "zod";

export const SearchActorByNameSchema =z.object({
    name: z.string().min(1, "Actor name may not be empty"),
})
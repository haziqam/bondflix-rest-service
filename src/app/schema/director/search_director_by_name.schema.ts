import {z} from "zod";

export const SearchDirectorByNameSchema =z.object({
    name: z.string().min(1, "Director name may not be empty"),
})
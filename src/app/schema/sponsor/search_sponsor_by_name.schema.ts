import {z} from "zod";

export const SearchSponsorByNameSchema =z.object({
    name: z.string().min(1, "Sponsor name may not be empty"),
})
import {z} from "zod";

export const CreateSponsorSchema = z.object({
    name: z.string().min(1, "Sponsor name may not be empty"),
    sponsor_status: z.enum(["INVIDIDUAL", "ORGANIZATION", "COMPANY", "GOVERNMENT"]),
    link: z.string().url(),
})

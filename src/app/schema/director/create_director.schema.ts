// CREATE TABLE IF NOT EXISTS director (
//     director_id SERIAL PRIMARY KEY,
//     first_name VARCHAR(255) NOT NULL,
//     last_name VARCHAR(50)
// );

import {z} from 'zod'

export const createDirectorSchema = z.object({
    first_name: z.string().min(1, "First name may not be empty"),
    last_name: z.string().min(1, "Last name may not be empty"),
})
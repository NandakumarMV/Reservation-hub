import { z } from 'zod'


export const roleSchema = z.object({
    name: z.string({
        required_error: "Role name is required",
    }).min(3, "Role must be at least 3 characters").max(50, "Role must be at most 50 characters"),
    status: z.boolean().optional()
});
import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        email: z.string().email(),
        username: z.string(),
        password: z.string(),
        handphone: z.string().min(10).max(13)
    })
    
    static readonly LOGIN: ZodType = z.object({
        email: z.string().email(),
        password: z.string()
    })
}
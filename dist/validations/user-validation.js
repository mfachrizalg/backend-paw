import { z } from "zod";
export class UserValidation {
    static REGISTER = z.object({
        email: z.string().email(),
        username: z.string(),
        password: z.string(),
        handphone: z.string().min(10).max(13)
    });
    static LOGIN = z.object({
        email: z.string().email(),
        password: z.string()
    });
}
//# sourceMappingURL=user-validation.js.map
import { z, ZodType } from "zod";

export class MealValidation {
    static readonly GETMEAL: ZodType = z.string({message: "Must not empty!"})
    static readonly ADDMEAL: ZodType = z.object({
        mealDBid: z.string({message: "Must not empty!"}),
        startDate: z.string().datetime({message: "Must be a date!"})
    })
}
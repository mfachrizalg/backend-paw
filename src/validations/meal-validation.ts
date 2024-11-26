import { z, ZodType } from "zod";

export class MealValidation {
    static readonly GETMEAL: ZodType = z.string({message: "Must not empty!"})
}
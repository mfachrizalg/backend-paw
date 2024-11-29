import { z } from "zod";
export class MealValidation {
    static GETMEAL = z.string({ message: "Must not empty!" });
    static BOOKMARKMEAL = z.coerce.string({ message: "Must not empty!" });
    static ADDMEAL = z.object({
        mealDBid: z.string({ message: "Must not empty!" }),
        startDate: z.string().datetime({ message: "Must be a date!" })
    });
}
//# sourceMappingURL=meal-validation.js.map
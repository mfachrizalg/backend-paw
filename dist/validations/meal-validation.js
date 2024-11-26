"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealValidation = void 0;
const zod_1 = require("zod");
class MealValidation {
}
exports.MealValidation = MealValidation;
MealValidation.GETMEAL = zod_1.z.string({ message: "Must not empty!" });
MealValidation.ADDMEAL = zod_1.z.object({
    mealDBid: zod_1.z.string({ message: "Must not empty!" }),
    startDate: zod_1.z.string().datetime({ message: "Must be a date!" })
});
//# sourceMappingURL=meal-validation.js.map
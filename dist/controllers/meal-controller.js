"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealController = void 0;
const meal_service_1 = require("../services/meal-service");
const translate_1 = require("../utils/translate");
class MealController {
    static getMeal(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query;
                const translatedName = yield (0, translate_1.translate)(name);
                const response = yield meal_service_1.MealService.getMeal(translatedName);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static addMealToSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield meal_service_1.MealService.addMealToSchedule(req.body);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.MealController = MealController;
//# sourceMappingURL=meal-controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealRouter = void 0;
const express_1 = __importDefault(require("express"));
const meal_controller_1 = require("../controllers/meal-controller");
exports.mealRouter = express_1.default.Router();
exports.mealRouter.get('/api/meal', meal_controller_1.MealController.getMeal);
exports.mealRouter.post('/api/meal', meal_controller_1.MealController.addMealToSchedule);
//# sourceMappingURL=meal-api.js.map
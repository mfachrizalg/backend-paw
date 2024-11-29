"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealRouter = void 0;
const express_1 = __importDefault(require("express"));
const meal_controller_1 = require("../controllers/meal-controller");
const user_middleware_1 = require("../middlewares/user-middleware");
exports.mealRouter = express_1.default.Router();
exports.mealRouter.get('/api/meal', meal_controller_1.MealController.getMeal);
exports.mealRouter.get('/api/meal/bookmark', user_middleware_1.userMiddleware, meal_controller_1.MealController.getBookmarkedMeals);
exports.mealRouter.post('/api/meal/bookmark/:mealDBid', user_middleware_1.userMiddleware, meal_controller_1.MealController.bookmarkMeal);
exports.mealRouter.delete('/api/meal/bookmark/:mealId', user_middleware_1.userMiddleware, meal_controller_1.MealController.deleteBookmark);
exports.mealRouter.get('/api/meal/schedule', user_middleware_1.userMiddleware, meal_controller_1.MealController.getScheduleMeals);
exports.mealRouter.post('/api/meal/schedule', user_middleware_1.userMiddleware, meal_controller_1.MealController.addMealToSchedule);
exports.mealRouter.delete('/api/meal/schedule/:mealId', user_middleware_1.userMiddleware, meal_controller_1.MealController.deleteSchedule);
//# sourceMappingURL=meal-api.js.map
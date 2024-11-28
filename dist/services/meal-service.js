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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealService = void 0;
const axios_1 = __importDefault(require("axios"));
const validation_1 = require("../validations/validation");
const meal_validation_1 = require("../validations/meal-validation");
const db_1 = require("../db/db");
class MealService {
    static getMeal(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const nameRequest = validation_1.Validation.validate(meal_validation_1.MealValidation.GETMEAL, request);
            return yield axios_1.default.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameRequest}`)
                .then(response => {
                return response.data.meals.map((meal) => {
                    return {
                        mealDBid: meal.idMeal,
                        name: meal.strMeal,
                        image: meal.strMealThumb,
                        ingredients: Object.keys(meal)
                            .filter(key => key.includes("strIngredient") && meal[key])
                            .map(key => meal[key])
                    };
                });
            });
        });
    }
    static addMealToSchedule(request, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const addMealRequest = validation_1.Validation.validate(meal_validation_1.MealValidation.ADDMEAL, request);
            const mealDetail = yield axios_1.default.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${addMealRequest.mealDBid}`)
                .then(response => response.data.meals[0]);
            const ingredients = Object.keys(mealDetail)
                .filter(key => key.includes("strIngredient") && mealDetail[key])
                .map(key => mealDetail[key]);
            yield db_1.prisma.meal.create({
                data: {
                    mealDBid: addMealRequest.mealDBid,
                    startTime: addMealRequest.startDate,
                    ingredients: ingredients.join(","),
                    name: mealDetail.strMeal,
                    image: mealDetail.strMealThumb,
                    instructions: mealDetail.strInstructions,
                    scheduled: true,
                    userId: req.body.userId
                }
            });
            return { message: "Meal added to schedule!" };
        });
    }
    static bookmarkMeal(request, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const mealDBid = validation_1.Validation.validate(meal_validation_1.MealValidation.BOOKMARKMEAL, request);
            yield db_1.prisma.meal.updateMany({
                where: { mealDBid, userId: req.body.userId },
                data: { bookmarked: true }
            });
            return { message: "Meal bookmarked!" };
        });
    }
    static getBookmarkedMeals(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const meals = yield db_1.prisma.meal.findMany({
                where: { userId: req.body.userId, bookmarked: true }
            });
            return meals.map(meal => {
                return {
                    mealDBid: meal.mealDBid,
                    name: meal.name,
                    image: meal.image,
                    ingredients: meal.ingredients.split(",")
                };
            });
        });
    }
    static getScheduleMeals(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const meals = yield db_1.prisma.meal.findMany({
                where: { userId: req.body.userId, scheduled: true }
            });
            return meals.map(meal => {
                return {
                    mealDBid: meal.mealDBid,
                    name: meal.name,
                    image: meal.image,
                    ingredients: meal.ingredients.split(","),
                    startDate: meal.startTime
                };
            });
        });
    }
}
exports.MealService = MealService;
//# sourceMappingURL=meal-service.js.map
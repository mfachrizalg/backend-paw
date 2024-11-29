import axios from "axios";
import { Validation } from "../validations/validation.js";
import { MealValidation } from "../validations/meal-validation.js";
import { prisma } from "../db/db.js";
export class MealService {
    static async getMeal(request) {
        const nameRequest = Validation.validate(MealValidation.GETMEAL, request);
        return await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameRequest}`)
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
    }
    static async addMealToSchedule(request, req) {
        const addMealRequest = Validation.validate(MealValidation.ADDMEAL, request);
        const mealDetail = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${addMealRequest.mealDBid}`)
            .then(response => response.data.meals[0]);
        const ingredients = Object.keys(mealDetail)
            .filter(key => key.includes("strIngredient") && mealDetail[key])
            .map(key => mealDetail[key]);
        const mealId = await prisma.meal.findFirst({
            where: { mealDBid: addMealRequest.mealDBid, userId: req.body.userId, scheduled: true },
            select: { id: true }
        });
        if (!mealId) {
            await prisma.meal.create({
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
        }
        else {
            await prisma.meal.update({
                where: { id: mealId.id },
                data: { startTime: addMealRequest.startDate, scheduled: true }
            });
        }
        return { message: "Meal added to schedule!" };
    }
    static async bookmarkMeal(request, req) {
        const mealDBid = Validation.validate(MealValidation.BOOKMARKMEAL, request);
        const mealId = await prisma.meal.findFirst({
            where: { mealDBid: mealDBid, userId: req.body.userId },
            select: { id: true }
        });
        if (!mealId) {
            const mealDetail = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDBid}`)
                .then(response => response.data.meals[0]);
            const ingredients = Object.keys(mealDetail)
                .filter(key => key.includes("strIngredient") && mealDetail[key])
                .map(key => mealDetail[key]);
            await prisma.meal.create({
                data: {
                    mealDBid: mealDBid,
                    ingredients: ingredients.join(","),
                    name: mealDetail.strMeal,
                    image: mealDetail.strMealThumb,
                    instructions: mealDetail.strInstructions,
                    bookmarked: true,
                    userId: req.body.userId
                }
            });
        }
        else {
            await prisma.meal.update({
                where: { id: mealId.id },
                data: { bookmarked: true }
            });
        }
        return { message: "Meal bookmarked!" };
    }
    static async getBookmarkedMeals(req) {
        const meals = await prisma.meal.findMany({
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
    }
    static async getScheduleMeals(req) {
        const meals = await prisma.meal.findMany({
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
    }
    static async deleteBookmark(request, req) {
        const mealDBid = Validation.validate(MealValidation.BOOKMARKMEAL, request);
        const mealId = await prisma.meal.findFirstOrThrow({
            where: { mealDBid: mealDBid, userId: req.body.userId, bookmarked: true },
            select: { id: true }
        });
        await prisma.meal.update({ where: { id: mealId.id }, data: { bookmarked: false } });
        return { message: "Bookmark deleted!" };
    }
    static async deleteSchedule(request, req) {
        const mealDBid = Validation.validate(MealValidation.BOOKMARKMEAL, request);
        const mealId = await prisma.meal.findFirstOrThrow({
            where: { mealDBid: mealDBid, userId: req.body.userId, scheduled: true },
            select: { id: true }
        });
        await prisma.meal.update({
            where: { id: mealId.id },
            data: { scheduled: false }
        });
        return { message: "Schedule deleted!" };
    }
}
//# sourceMappingURL=meal-service.js.map
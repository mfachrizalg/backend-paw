import { AddMealRequest, AddMealResponse, GetMealResponse } from "../models/meal-model";
import axios from "axios";
import { Validation } from "../validations/validation";
import { MealValidation } from "../validations/meal-validation";
import { prisma } from "../db/db";

export class MealService {
    static async getMeal(request: string) : Promise<GetMealResponse[]> {
        const nameRequest = Validation.validate(MealValidation.GETMEAL, request);
        return await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameRequest}`)
            .then(response => {
                return response.data.meals.map((meal: any) => {
                    return {
                        mealDBid: meal.idMeal,
                        name: meal.strMeal,
                        image: meal.strMealThumb,
                        ingredients: Object.keys(meal)
                            .filter(key => key.includes("strIngredient") && meal[key])
                            .map(key => meal[key])
                    }
            });    
        })
    }

    static async addMealToSchedule(request: AddMealRequest) : Promise<AddMealResponse> {
        const addMealRequest = Validation.validate(MealValidation.ADDMEAL, request);
        const mealDetail = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${addMealRequest.mealDBid}`)
            .then(response => response.data.meals[0]);
        const ingredients = Object.keys(mealDetail)
            .filter(key => key.includes("strIngredient") && mealDetail[key])
            .map(key => mealDetail[key]);
        await prisma.meal.create({
            data: {
                mealDBid: addMealRequest.mealDBid,
                startTime: addMealRequest.startDate,
                ingredients: ingredients.join(","),
                name: mealDetail.strMeal,
                image: mealDetail.strMealThumb,
                instructions: mealDetail.strInstructions,
                userId : "cm3xu1akv0000xxmvzbar42c4"
            }
        });
        return { message: "Meal added to schedule!" };
    }
}
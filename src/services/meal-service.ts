import { GetMealResponse } from "../models/meal-model";
import axios from "axios";
import { Validation } from "../validations/validation";
import { MealValidation } from "../validations/meal-validation";

export class MealService {
    static async getMeal(request: string) : Promise<GetMealResponse[]> {
        const nameRequest = Validation.validate(MealValidation.GETMEAL, request);
        return await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameRequest}`)
            .then(response => {
                return response.data.meals.map((meal: any) => {
                    return {
                        id: meal.idMeal,
                        name: meal.strMeal,
                        image: meal.strMealThumb,
                        ingredients: Object.keys(meal)
                            .filter(key => key.includes("strIngredient") && meal[key])
                            .map(key => meal[key])
                    }
            });    
        })
    }
}
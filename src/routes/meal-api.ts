import express from "express"
import { MealController } from "../controllers/meal-controller"
import { userMiddleware } from "../middlewares/user-middleware"

export const mealRouter = express.Router()
mealRouter.get('/api/meal/', MealController.getMeal);
mealRouter.post('/api/meal/schedule', userMiddleware, MealController.addMealToSchedule);
mealRouter.post('/api/meal/bookmar/:mealDBid', userMiddleware, MealController.bookmarkMeal);
mealRouter.get('/api/meal/bookmark', userMiddleware, MealController.getBookmarkedMeals);
mealRouter.get('/api/meal/schedule', userMiddleware, MealController.getScheduleMeals);

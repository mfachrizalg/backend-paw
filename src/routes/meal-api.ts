import express from 'express';
import { MealController } from "../controllers/meal-controller.js";
import { userMiddleware } from "../middlewares/user-middleware.js";

export const mealRouter = express.Router();
mealRouter.get('/api/meal', MealController.getMeal);
mealRouter.get('/api/meal/bookmark', userMiddleware, MealController.getBookmarkedMeals);
mealRouter.post('/api/meal/bookmark/:mealDBid', userMiddleware, MealController.bookmarkMeal);
mealRouter.delete('/api/meal/bookmark/:mealId', userMiddleware, MealController.deleteBookmark);
mealRouter.get('/api/meal/schedule', userMiddleware, MealController.getScheduleMeals);
mealRouter.post('/api/meal/schedule', userMiddleware, MealController.addMealToSchedule);
mealRouter.delete('/api/meal/schedule/:mealId', userMiddleware, MealController.deleteSchedule);
import express from "express"
import { MealController } from "../controllers/meal-controller"

export const mealRouter = express.Router()
mealRouter.get('/api/meal', MealController.getMeal)

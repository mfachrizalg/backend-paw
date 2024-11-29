import { NextFunction, Request, Response } from "express";
import { MealService } from "../services/meal-service.js";
import { translate } from "../utils/translate.js";

export class MealController {

    static async getMeal(req: Request, res: Response, next: NextFunction) {
        try {
            const name  = req.query.name as string;
            const translatedName = await translate(name);
            const response = await MealService.getMeal(translatedName as string);
            res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    static async addMealToSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await MealService.addMealToSchedule(req.body, req);
            res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    static async bookmarkMeal(req: Request, res: Response, next: NextFunction) {
        try {
            const mealDBid = req.params["mealDBid"];
            const response = await MealService.bookmarkMeal(mealDBid as string, req);
            res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }
    
    static async getBookmarkedMeals(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await MealService.getBookmarkedMeals(req);
            res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    static async getScheduleMeals(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await MealService.getScheduleMeals(req);
            res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    static async deleteBookmark(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await MealService.deleteBookmark(req.params["mealId"], req);
            res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    static async deleteSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await MealService.deleteSchedule(req.params["mealId"], req);
            res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

}

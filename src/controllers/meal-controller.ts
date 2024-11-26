import { NextFunction, Request, Response } from "express";
import { MealService } from "../services/meal-service";
import { translate } from "../utils/translate";

export class MealController {

    static async getMeal(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.query;
            const translatedName = await translate(name as string);
            const response = await MealService.getMeal(translatedName as string);
            res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    static async addMealToSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await MealService.addMealToSchedule(req.body);
            res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }
    
}
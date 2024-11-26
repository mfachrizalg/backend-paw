import { NextFunction, Request, Response } from "express";
import { UserLogin, UserRegister } from "../models/user-model";
import { UserService } from "../services/user-service";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UserRegister = req.body as UserRegister;
            const response = await UserService.register(request);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UserLogin = req.body as UserLogin;
            const response = await UserService.login(request);
            res.cookie(
                "mealify",
                response.token,
                {
                    secure: false,
                    httpOnly: true,
                    maxAge : 1 * 60 * 60 * 1000
                }
            );
            res.status(200).json({message: response.message});
        } catch (error) {
            next(error);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("mealify");
            res.status(200).json({message:"Logout success!"});
        } catch (error) {
            next(error);
        }
    }

}

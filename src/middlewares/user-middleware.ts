import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let cookie = req.cookies["mealify"];
        const header = req.header("Authorization")?.split(" ")[1];
        if (header) cookie = header;
        const decodeJWT: jwt.JwtPayload = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET as string) as jwt.JwtPayload;
        req.body.userId = decodeJWT.id;
        next();
    } catch (error) {
        next(error);
    }   
}

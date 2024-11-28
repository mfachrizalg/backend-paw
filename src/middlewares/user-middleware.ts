import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookie = req.cookies["mealify"];
        if (cookie === undefined) throw new ResponseError(401, "Login required!");
        const decodeJWT: jwt.JwtPayload = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET as string) as jwt.JwtPayload;
        if (decodeJWT === undefined) throw new ResponseError(401, "Unauthorized!");
        req.body.userId = decodeJWT.id;
        next();
    } catch (error) {
        next(error);
    }   
}

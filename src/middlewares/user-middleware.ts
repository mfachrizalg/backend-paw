import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies["mealify"];
    if (!cookie) res.status(401).json({message: "Login required!"});
    const decodeJWT: jwt.JwtPayload = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET as string) as jwt.JwtPayload;
    if (!decodeJWT) res.status(401).json({message: "Invalid token!"});
    req.body.userId = decodeJWT.id;
    next();
}

import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error.js";
import { ZodError } from "zod";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ResponseError) {
        res.status(error.statusCode).json({ errors: error.message });
    } else if (error instanceof ZodError) {
        res.status(400).json({ errors: `Validation Error: ${JSON.stringify(error)}` });
    } else {
        res.status(500).json({ errors: "Internal Server Error" });
    }
}

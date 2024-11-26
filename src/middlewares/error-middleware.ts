import { Request, Response } from "express";
import { ResponseError } from "../error/response-error";
import { ZodError } from "zod";

export const errorMiddleware = async(error: Error, req: Request, res: Response) => {
    if (error instanceof ResponseError) res.status(error.statusCode).json({ errors: error.message });
    else if (error instanceof ZodError) res.status(400).json({ errors: `Validation Error: ${JSON.stringify(error)}` });
    else res.status(500).json({ errors: "Internal Server Error" });
}

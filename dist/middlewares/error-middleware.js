import { ResponseError } from "../error/response-error.js";
import { ZodError } from "zod";
export const errorMiddleware = (error, req, res, next) => {
    if (error instanceof ResponseError) {
        res.status(error.statusCode).json({ errors: error.message });
    }
    else if (error instanceof ZodError) {
        res.status(400).json({ errors: `Validation Error: ${JSON.stringify(error)}` });
    }
    else {
        res.status(500).json({ errors: "Internal Server Error" });
    }
};
//# sourceMappingURL=error-middleware.js.map
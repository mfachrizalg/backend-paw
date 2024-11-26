"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const response_error_1 = require("../error/response-error");
const zod_1 = require("zod");
const errorMiddleware = (error, req, res, next) => {
    if (error instanceof response_error_1.ResponseError) {
        res.status(error.statusCode).json({ errors: error.message });
    }
    else if (error instanceof zod_1.ZodError) {
        res.status(400).json({ errors: `Validation Error: ${JSON.stringify(error)}` });
    }
    else {
        res.status(500).json({ errors: "Internal Server Error" });
    }
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error-middleware.js.map
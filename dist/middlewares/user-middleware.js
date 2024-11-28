"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_error_1 = require("../error/response-error");
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie = req.cookies["mealify"];
        if (cookie === undefined)
            throw new response_error_1.ResponseError(401, "Login required!");
        const decodeJWT = jsonwebtoken_1.default.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        if (decodeJWT === undefined)
            throw new response_error_1.ResponseError(401, "Unauthorized!");
        req.body.userId = decodeJWT.id;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.userMiddleware = userMiddleware;
//# sourceMappingURL=user-middleware.js.map
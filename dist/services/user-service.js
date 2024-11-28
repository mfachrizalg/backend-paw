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
exports.UserService = void 0;
const db_1 = require("../db/db");
const response_error_1 = require("../error/response-error");
const user_validation_1 = require("../validations/user-validation");
const validation_1 = require("../validations/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            const countUser = yield db_1.prisma.user.count({
                where: { username: registerRequest.username }
            });
            if (countUser > 0)
                throw new response_error_1.ResponseError(409, "Username already exists!");
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            yield db_1.prisma.user.create({
                data: registerRequest
            });
            return { message: "User has been registered!" };
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            const user = yield db_1.prisma.user.findUnique({
                where: { email: loginRequest.email },
                select: { id: true, password: true }
            });
            if (!user)
                throw new response_error_1.ResponseError(400, "Invalid email or password!");
            const isPasswordMatch = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isPasswordMatch)
                throw new response_error_1.ResponseError(400, "Invalid email or password!");
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1h",
            });
            yield db_1.prisma.user.update({
                where: { id: user.id },
                data: { token: token }
            });
            return { token, message: "Login success!" };
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map
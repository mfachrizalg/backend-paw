"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/api/register', user_controller_1.UserController.register);
exports.userRouter.post('/api/login', user_controller_1.UserController.login);
exports.userRouter.get('/api/logout', user_controller_1.UserController.logout);

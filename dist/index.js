"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error-middleware");
const user_api_1 = require("./routes/user-api");
const meal_api_1 = require("./routes/meal-api");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(user_api_1.userRouter);
app.use(meal_api_1.mealRouter);
app.use(error_middleware_1.errorMiddleware);
app.get('/', (req, res) => {
    res.send('Welcome to the meal planner API!');
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map
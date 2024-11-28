"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error-middleware");
const user_api_1 = require("./routes/user-api");
const meal_api_1 = require("./routes/meal-api");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const allowedOrigins = ['https://mealify-roan.vercel.app', 'http://localhost:3000', 'https://backend-paw-delta.vercel.app'];
const isDevelopment = process.env.NODE_ENV === 'development';
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (isDevelopment) {
            // Allow all origins in development
            callback(null, true);
        }
        else {
            // In production, check if the origin is allowed
            if (origin && allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
    methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With"
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
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
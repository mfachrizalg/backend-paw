import express, { Request, Response } from 'express';
import { errorMiddleware } from './middlewares/error-middleware';
import { userRouter } from './routes/user-api';
import { mealRouter } from './routes/meal-api';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const allowedOrigins = ['https://mealify-roan.vercel.app', 'http://localhost:3000']
const corsOptions: CorsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin || '')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With"
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(mealRouter);
app.use(errorMiddleware);
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the meal planner API!');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
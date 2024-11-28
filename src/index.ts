import express, { Request, Response } from 'express';
import { errorMiddleware } from './middlewares/error-middleware';
import { userRouter } from './routes/user-api';
import { mealRouter } from './routes/meal-api';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const corsOptions = {
    credentials: true,
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
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
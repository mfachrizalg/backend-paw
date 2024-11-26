import express from 'express';
import { errorMiddleware } from './src/middlewares/error-middleware';
import { userRouter } from './src/routes/user-api';
import { mealRouter } from './src/routes/meal-api';

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(mealRouter);
app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
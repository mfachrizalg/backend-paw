import express from 'express';
import { UserController } from '../controllers/user-controller.js';

export const userRouter = express.Router();
userRouter.post('/api/register', UserController.register);
userRouter.post('/api/login', UserController.login);
userRouter.get('/api/logout', UserController.logout);

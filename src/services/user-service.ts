import { prisma } from "../db/db";
import { ResponseError } from "../error/response-error";
import { UserLogin, UserRegister, UserRegisterResponse, UserLoginResponse } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {

    static async register(request: UserRegister) : Promise<UserRegisterResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const countUser = await prisma.user.count({
            where : { username: registerRequest.username }
        });
        if (countUser > 0) throw new ResponseError(409, "Username already exists!");
        
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
        await prisma.user.create({
            data: registerRequest
        });
        return { message: "User has been registered!" };
    }

    static async login(request: UserLogin) : Promise<UserLoginResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        const user = await prisma.user.findUnique({
            where: { email: loginRequest.email },
            select : { id: true, password: true }
        });
        if (!user) throw new ResponseError(400, "Invalid email or password!");

        const isPasswordMatch = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordMatch) throw new ResponseError(400, "Invalid email or password!");
        const token = jwt.sign(
            { id: user.id }, 
            process.env.ACCESS_TOKEN_SECRET as string,
            {
                expiresIn: "1h",
            }
        );
        await prisma.user.update({
            where: { id: user.id },
            data: { token: token }
        })
        return {
            token: token,
            message: "Login success!"
        };
    }
}
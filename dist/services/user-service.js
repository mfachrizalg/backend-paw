import { prisma } from "../db/db.js";
import { ResponseError } from "../error/response-error.js";
import { UserValidation } from "../validations/user-validation.js";
import { Validation } from "../validations/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class UserService {
    static async register(request) {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);
        const countUser = await prisma.user.count({
            where: { username: registerRequest.username }
        });
        if (countUser > 0)
            throw new ResponseError(409, "Username already exists!");
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
        await prisma.user.create({
            data: registerRequest
        });
        return { message: "User has been registered!" };
    }
    static async login(request) {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);
        const user = await prisma.user.findUnique({
            where: { email: loginRequest.email },
            select: { id: true, password: true }
        });
        if (!user)
            throw new ResponseError(400, "Invalid email or password!");
        const isPasswordMatch = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordMatch)
            throw new ResponseError(400, "Invalid email or password!");
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
        });
        await prisma.user.update({
            where: { id: user.id },
            data: { token: token }
        });
        return {
            token: token,
            message: "Login success!"
        };
    }
}
//# sourceMappingURL=user-service.js.map
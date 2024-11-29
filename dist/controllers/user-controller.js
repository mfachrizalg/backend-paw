import { UserService } from "../services/user-service.js";
export class UserController {
    static async register(req, res, next) {
        try {
            const request = req.body;
            const response = await UserService.register(request);
            res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const request = req.body;
            const response = await UserService.login(request);
            res.cookie("mealify", response.token, {
                secure: false,
                httpOnly: true,
                maxAge: 1 * 60 * 60 * 1000
            });
            res.header("Authorization", response.token);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async logout(req, res, next) {
        try {
            res.clearCookie("mealify");
            res.status(200).json({ message: "Logout success!" });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=user-controller.js.map
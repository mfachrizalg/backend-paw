import jwt from "jsonwebtoken";
export const userMiddleware = async (req, res, next) => {
    try {
        let cookie = req.cookies["mealify"];
        const header = req.header("Authorization")?.split(" ")[1];
        if (header)
            cookie = header;
        const decodeJWT = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        req.body.userId = decodeJWT.id;
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user-middleware.js.map
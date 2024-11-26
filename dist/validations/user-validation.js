"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTER = zod_1.z.object({
    email: zod_1.z.string().email(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    handphone: zod_1.z.string().min(10).max(13)
});
UserValidation.LOGIN = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
//# sourceMappingURL=user-validation.js.map
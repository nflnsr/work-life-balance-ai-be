"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name is required"),
    email: zod_1.z.email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 8 characters long"),
    confirmPassword: zod_1.z
        .string()
        .min(8, "Confirm password must be at least 8 characters long")
        .optional(),
    phone: zod_1.z.string().min(10, "Phone number must be at least 10 digits long"),
    gender: zod_1.z.enum(["male", "female"], "Gender is required"),
    isStudent: zod_1.z.coerce.boolean("isStudent is required"),
    age: zod_1.z.number().min(1, "Age is required"),
    field: zod_1.z.string().min(2, "Field is required"),
    hobbies: zod_1.z.string().optional(),
});

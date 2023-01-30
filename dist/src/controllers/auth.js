"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const validation_error_1 = require("../errors/validation-error");
const prisma_client_1 = require("../lib/prisma-client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const not_found_error_1 = require("../errors/not-found-error");
const unautenticated_error_1 = require("../errors/unautenticated-error");
const registerSchema = zod_1.z.object({
    user_name: zod_1.z.string().min(1, { message: "name is required" }),
    email: zod_1.z
        .string()
        .min(1, { message: "email is required" })
        .email({ message: "provide valid email address" }),
    password: zod_1.z.string().min(1, { message: "password is required" }),
    role: zod_1.z.string().optional(),
    // avatar: z.string().optional(),
});
const registerUser = async (req, res) => {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new validation_error_1.ValidationError(errorMessage);
    }
    const data = validation.data;
    const user = await prisma_client_1.prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
    if (user != null) {
        throw new validation_error_1.ValidationError("User with that email is exist");
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await prisma_client_1.prisma.user.create({
            data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
        });
        if (!user)
            throw new validation_error_1.ValidationError("Problem z rejestracją");
        const employeeProfile = await prisma_client_1.prisma.employee.create({
            data: {
                id_user: user.id_user,
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                country: "",
                province: "",
                postal_code: "",
                city: "",
                street: "",
            },
        });
        if (!employeeProfile)
            throw new validation_error_1.ValidationError("Problem z rejestracją profilu");
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
const loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, { message: "email is required" })
        .email({ message: "provide valid email address" }),
    password: zod_1.z.string().min(1, { message: "password is required" }),
});
const loginUser = async (req, res) => {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new validation_error_1.ValidationError(errorMessage);
    }
    const { email, password } = validation.data;
    const user = await prisma_client_1.prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (user == null) {
        throw new not_found_error_1.NotFoundError("No user with that email");
    }
    const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
    if (isPasswordCorrect) {
        const token = jsonwebtoken_1.default.sign({
            exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
            data: {
                user_id: user.id_user,
                login: user.user_name,
                avatar: user.avatar,
            },
        }, process.env.SESSION_SECRET);
        res.status(200).json({
            user: {
                id_user: user.id_user,
                user_name: user.user_name,
                role: user.role,
                avatar: user.avatar,
            },
            token,
        });
    }
    else {
        throw new unautenticated_error_1.UnautenticatedError("Wrong email or password");
    }
};
exports.default = {
    registerUser,
    loginUser,
};
//# sourceMappingURL=auth.js.map
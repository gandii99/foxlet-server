"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const patchSchema = zod_1.z.object({
    user_name: zod_1.z.string().min(1, { message: "name is required" }).optional(),
    email: zod_1.z
        .string()
        .min(1, { message: "email is required" })
        .email({ message: "provide valid email address" })
        .optional(),
    password: zod_1.z.preprocess((val) => (val && typeof val === "string" && val.length > 1 && val) || undefined, zod_1.z.string().min(1, { message: "password is required" }).optional()),
    role: zod_1.z.string().optional(),
    avatar: zod_1.z.string().optional(),
});
const getAllUsers = async (req, res) => {
    const users = await prisma_client_1.prisma.user.findMany({
        select: {
            id_user: true,
            email: true,
            user_name: true,
            role: true,
        },
    });
    res.status(201).json(users);
};
const getSelectedUsers = async (req, res) => {
    const usersId = req.params.id
        .split(",")
        .map((e) => parseInt(e))
        .filter((e) => !isNaN(e));
    const users = await prisma_client_1.prisma.user.findMany({
        where: {
            id_user: { in: usersId },
            // id_user: { in: usersId },
        },
        select: {
            id_user: true,
            email: true,
            user_name: true,
            role: true,
        },
    });
    res.status(201).json(users);
};
const getMyUserProfile = async (req, res) => {
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const company = await prisma_client_1.prisma.user.findFirst({
        select: {
            id_user: true,
            user_name: true,
            email: true,
            role: true,
            avatar: true,
        },
        where: {
            id_user: currentLoggedUser,
        },
    });
    res.status(200).json(company);
};
const updateMyUserProfileData = async (req, res) => {
    const validation = patchSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const currentLoggedUser = req.user;
    const body = validation.data;
    if (body === null || body === void 0 ? void 0 : body.password) {
        const hashedPassword = await bcrypt_1.default.hash(body.password, 10);
        body.password = hashedPassword;
    }
    const user = await prisma_client_1.prisma.user.update({
        where: {
            id_user: currentLoggedUser,
        },
        data: body,
    });
    res.status(201).json(user);
};
const deactivateMyProfile = async (req, res) => {
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const deletedUser = await prisma_client_1.prisma.user.update({
        data: { active: false },
        where: {
            id_user: currentLoggedUser,
        },
    });
    res.status(200).json(deletedUser);
};
const deleteMyAccount = async (req, res) => {
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const tabToTransaction = [];
    const pallets = await prisma_client_1.prisma.pallet.findMany({
        where: {
            employee: {
                id_user: currentLoggedUser,
            },
        },
    });
    if (pallets.length > 0) {
        tabToTransaction.push(prisma_client_1.prisma.pallet.deleteMany({
            where: {
                employee: {
                    id_user: currentLoggedUser,
                },
            },
        }));
    }
    const employee = await prisma_client_1.prisma.employee.findUnique({
        where: {
            id_user: currentLoggedUser,
        },
    });
    if (employee) {
        tabToTransaction.push(prisma_client_1.prisma.employee.delete({
            where: {
                id_user: currentLoggedUser,
            },
        }));
    }
    const user = await prisma_client_1.prisma.user.findUnique({
        where: {
            id_user: currentLoggedUser,
        },
    });
    if (user) {
        tabToTransaction.push(prisma_client_1.prisma.user.delete({ where: { id_user: currentLoggedUser } }));
    }
    else {
        throw Error("No user to deleted");
    }
    const deleted = await prisma_client_1.prisma.$transaction(tabToTransaction);
    res.status(200).json(deleted);
};
exports.default = {
    getAllUsers,
    getSelectedUsers,
    getMyUserProfile,
    deactivateMyProfile,
    deleteMyAccount,
    updateMyUserProfileData,
};
//# sourceMappingURL=users.js.map
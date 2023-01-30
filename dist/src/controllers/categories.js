"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const createCategorySchema = zod_1.z.object({
    category_name: zod_1.z.string(),
    description: zod_1.z.string(),
});
const createCategory = async (req, res) => {
    const validation = createCategorySchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const body = validation.data;
    const pallet = await prisma_client_1.prisma.category.create({
        data: body,
    });
    res.status(201).json(pallet);
};
const getAllCategories = async (req, res) => {
    console.log(req.user);
    const categories = await prisma_client_1.prisma.category.findMany();
    res.status(201).json(categories);
};
exports.default = {
    createCategory,
    getAllCategories,
};
//# sourceMappingURL=categories.js.map
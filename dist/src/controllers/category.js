"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const createSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
});
const createCategory = async (req, res) => {
    const validation = createSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const body = validation.data;
    const category = await prisma_client_1.prisma.category.create({
        data: { category_name: body.name, description: body.description },
    });
    res.status(201).json(category);
};
const getAllCategories = async (req, res) => {
    console.log(req.user);
    const categories = await prisma_client_1.prisma.category.findMany();
    res.status(201).json(categories);
};
const getSelectedCategories = async (req, res) => {
    const categoriesId = req.params.id
        .split(",")
        .map((e) => parseInt(e))
        .filter((e) => !isNaN(e));
    const categories = await prisma_client_1.prisma.category.findMany({
        where: {
            id_category: { in: categoriesId },
        },
    });
    res.status(201).json(categories);
};
exports.default = {
    createCategory,
    getAllCategories,
    getSelectedCategories,
};
//# sourceMappingURL=category.js.map
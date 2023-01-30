"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const createSchema = zod_1.z.object({
    product_name: zod_1.z.string(),
    id_category: zod_1.z.number(),
    EAN: zod_1.z.string(),
    ASIN: zod_1.z.string(),
    description: zod_1.z.string(),
});
const createProduct = async (req, res) => {
    const validation = createSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const body = validation.data;
    const product = await prisma_client_1.prisma.product.create({
        data: body,
    });
    res.status(201).json(product);
};
const getAllProducts = async (req, res) => {
    const products = await prisma_client_1.prisma.product.findMany({
        select: {
            id_product: true,
            id_category: true,
            image: true,
            product_name: true,
            description: true,
            EAN: true,
            ASIN: true,
            category: {
                select: {
                    category_name: true,
                    id_category: true,
                    description: true,
                },
            },
        },
        orderBy: [
            {
                id_category: "asc",
            },
            {
                product_name: "asc",
            },
        ],
    });
    res.status(201).json(products);
};
const getMyProducts = async (req, res) => {
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    //Ilość sztuk
    const products = await prisma_client_1.prisma.product.findMany({
        select: {
            id_product: true,
            id_category: true,
            image: true,
            product_name: true,
            description: true,
            EAN: true,
            ASIN: true,
            category: {
                select: {
                    category_name: true,
                    id_category: true,
                    description: true,
                },
            },
            batch: {
                select: {
                    quantity_in_stock: true,
                    description: true,
                },
            },
        },
        where: {
            batch: {
                some: {
                    pallet: {
                        employee: {
                            id_user: currentLoggedUser,
                        },
                    },
                },
            },
            AND: {
                batch: {
                    some: {
                        quantity_in_stock: {
                            gt: 0,
                        },
                    },
                },
            },
        },
        orderBy: [
            {
                id_category: "asc",
            },
            {
                product_name: "asc",
            },
        ],
    });
    res.status(201).json(products);
};
const getSelectedProducts = async (req, res) => {
    console.log(req.params.id);
    const productsId = req.params.id
        .split(",")
        .map((e) => parseInt(e))
        .filter((e) => !isNaN(e));
    const employees = await prisma_client_1.prisma.product.findMany({
        where: {
            id_product: { in: productsId },
        },
    });
    res.status(201).json(employees);
};
exports.default = {
    createProduct,
    getAllProducts,
    getMyProducts,
    getSelectedProducts,
};
//# sourceMappingURL=products.js.map
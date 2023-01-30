"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const createSchema = zod_1.z.object({
    id_product: zod_1.z.number(),
    id_condition: zod_1.z.number(),
    id_pallet: zod_1.z.number(),
    batch_name: zod_1.z.string().optional(),
    quantity_in_delivery: zod_1.z.number(),
    quantity_in_stock: zod_1.z.number(),
    purchase_price: zod_1.z.number().optional(),
    selling_price: zod_1.z.number(),
    description: zod_1.z.string().optional(),
});
const createBatch = async (req, res) => {
    const validation = createSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const body = validation.data;
    const batch = await prisma_client_1.prisma.batch.create({
        data: {
            id_product: body.id_product,
            id_condition: body.id_condition,
            id_pallet: body.id_pallet,
            batch_name: body.batch_name,
            quantity_in_delivery: body.quantity_in_delivery,
            quantity_in_stock: body.quantity_in_stock,
            purchase_price: body.purchase_price,
            selling_price: body.selling_price,
            description: body.description,
        },
    });
    res.status(201).json(batch);
};
const deleteBatch = async (req, res) => {
    const batchesId = req.params.id
        .split(",")
        .map((e) => parseInt(e))
        .filter((e) => !isNaN(e));
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const batch = await prisma_client_1.prisma.batch.deleteMany({
        where: {
            id_batch: {
                in: batchesId,
            },
            pallet: {
                employee: {
                    id_user: currentLoggedUser,
                },
            },
        },
    });
    res.status(201).json(batch);
};
const getAllBatches = async (req, res) => {
    console.log(req.user);
    const palettes = await prisma_client_1.prisma.batch.findMany();
    res.status(201).json(palettes);
};
const getMybatches = async (req, res) => {
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const batches = await prisma_client_1.prisma.batch.findMany({
        select: {
            id_batch: true,
            batch_name: true,
            quantity_in_delivery: true,
            quantity_in_stock: true,
            purchase_price: true,
            selling_price: true,
            description: true,
            condition: true,
            pallet: true,
            product: {
                select: {
                    product_name: true,
                    image: true,
                    EAN: true,
                    ASIN: true,
                    description: true,
                    category: {
                        select: {
                            category_name: true,
                            description: true,
                            id_category: true,
                        },
                    },
                },
            },
        },
        where: {
            quantity_in_stock: {
                gt: 0,
            },
            pallet: {
                employee: {
                    id_user: currentLoggedUser,
                },
            },
        },
    });
    res.status(200).json(batches);
};
const getMybatchesOutOfStock = async (req, res) => {
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const batches = await prisma_client_1.prisma.batch.findMany({
        select: {
            id_batch: true,
            batch_name: true,
            quantity_in_delivery: true,
            quantity_in_stock: true,
            purchase_price: true,
            selling_price: true,
            description: true,
            condition: true,
            pallet: true,
            product: {
                select: {
                    product_name: true,
                    image: true,
                    EAN: true,
                    ASIN: true,
                    description: true,
                    category: {
                        select: {
                            category_name: true,
                            description: true,
                            id_category: true,
                        },
                    },
                },
            },
        },
        where: {
            quantity_in_stock: {
                lte: 0,
            },
            pallet: {
                employee: {
                    id_user: currentLoggedUser,
                },
            },
        },
    });
    res.status(200).json(batches);
};
exports.default = {
    createBatch,
    deleteBatch,
    getAllBatches,
    getMybatches,
    getMybatchesOutOfStock,
};
//# sourceMappingURL=batches.js.map
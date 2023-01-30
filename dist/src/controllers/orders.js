"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const createOrderSchema = zod_1.z.object({
    id_client: zod_1.z.number(),
    order_date: zod_1.z.string().min(1),
    order_price: zod_1.z.number(),
    comments: zod_1.z.string().optional(),
    batches: zod_1.z.array(zod_1.z.object({
        id_batch: zod_1.z.number(),
        quantity_in_order: zod_1.z.number(),
    })),
});
const patchOrderSchema = zod_1.z.object({
    id_client: zod_1.z.number().optional(),
    order_date: zod_1.z.string().min(1).optional(),
    order_price: zod_1.z.number().optional(),
    comments: zod_1.z.number().optional(),
});
const createOrder = async (req, res) => {
    const validation = createOrderSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const body = validation.data;
    const currentLoggedUser = req.user;
    console.log("currentLoggedUser", currentLoggedUser);
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const employee = await prisma_client_1.prisma.employee.findUnique({
        where: {
            id_user: currentLoggedUser,
        },
    });
    if (!employee) {
        throw new errors_1.CustomError("Employee not exists");
    }
    body.batches.map(async (batch) => {
        const currentBatch = await prisma_client_1.prisma.batch.findFirst({
            where: {
                id_batch: batch.id_batch,
            },
        });
        if (currentBatch &&
            currentBatch.quantity_in_stock < batch.quantity_in_order) {
            res.status(404).json({
                error: {
                    message: `Not enough product in stock ${currentBatch === null || currentBatch === void 0 ? void 0 : currentBatch.id_batch}`,
                },
            });
        }
    });
    const order = await prisma_client_1.prisma.order.create({
        select: {
            id_order: true,
            batch_order: {
                select: {
                    id_batch: true,
                    quantity_in_order: true,
                },
            },
        },
        data: {
            id_client: body.id_client,
            order_date: body.order_date,
            order_price: body.order_price,
            comments: body.comments,
            batch_order: {
                createMany: {
                    data: body.batches,
                },
            },
            order_status: {
                create: {
                    id_status: 1,
                    id_employee: employee.id_employee,
                    timestamp: new Date(),
                },
            },
        },
    });
    if (order) {
        const batchTransaction = [];
        order.batch_order.map((batch) => {
            const updateResult = prisma_client_1.prisma.batch.update({
                data: {
                    quantity_in_stock: {
                        decrement: batch.quantity_in_order,
                    },
                },
                where: {
                    id_batch: batch.id_batch,
                },
            });
            batchTransaction.push(updateResult);
        });
        const updateBatchQuantityInStockTransaction = await prisma_client_1.prisma.$transaction(batchTransaction);
        if (updateBatchQuantityInStockTransaction.length <= 0) {
            await prisma_client_1.prisma.order.delete({
                where: {
                    id_order: order.id_order,
                },
            });
        }
    }
    res.status(201).json(order);
};
const getMyOrders = async (req, res) => {
    console.log(req.user);
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const orders = await prisma_client_1.prisma.order.findMany({
        select: {
            id_order: true,
            order_date: true,
            order_price: true,
            comments: true,
            order_status: {
                select: {
                    id_order_status: true,
                    id_status: true,
                    id_employee: true,
                    timestamp: true,
                    comments: true,
                },
                orderBy: [
                    {
                        timestamp: "desc",
                    },
                ],
                take: 1,
            },
            client: true,
            batch_order: {
                select: {
                    quantity_in_order: true,
                    id_batch: true,
                    batch: {
                        select: {
                            selling_price: true,
                            purchase_price: true,
                            batch_name: true,
                            condition: true,
                            product: {
                                select: {
                                    id_product: true,
                                    product_name: true,
                                    image: true,
                                    EAN: true,
                                    ASIN: true,
                                    category: true,
                                },
                            },
                        },
                    },
                },
            },
        },
        where: {
            order_status: {
                some: {
                    employee: {
                        id_user: currentLoggedUser,
                    },
                },
            },
        },
    });
    res.status(201).json(orders);
};
const deleteOrder = async (req, res) => {
    const orderId = Number(req.params.id);
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const order = await prisma_client_1.prisma.order.delete({
        include: {
            batch_order: {
                include: {
                    batch: {
                        select: {
                            id_batch: true,
                        },
                    },
                },
            },
        },
        where: {
            id_order: orderId,
        },
    });
    if (order) {
        order.batch_order.map(async (batch) => {
            console.log("quantity_in_order", batch.quantity_in_order);
            console.log("id_batch", batch.id_batch);
            await prisma_client_1.prisma.batch.update({
                data: {
                    quantity_in_stock: {
                        increment: batch.quantity_in_order,
                    },
                },
                where: {
                    id_batch: batch.id_batch,
                },
            });
        });
    }
    res.status(201).json(order);
};
exports.default = {
    createOrder,
    getMyOrders,
    deleteOrder,
};
//# sourceMappingURL=orders.js.map
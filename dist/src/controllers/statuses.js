"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const createSchema = zod_1.z.object({
    id_status: zod_1.z.number(),
    id_order: zod_1.z.number(),
    comments: zod_1.z.string().optional(),
});
const getAllStatuses = async (req, res) => {
    const statuses = await prisma_client_1.prisma.status.findMany();
    res.status(201).json(statuses);
};
const getOrderStatus = async (req, res) => {
    const orderId = Number(req.params.id);
    const statuses = await prisma_client_1.prisma.order_Status.findFirst({
        where: {
            id_order: orderId,
        },
        orderBy: [
            {
                timestamp: "desc",
            },
        ],
        take: 1,
    });
    res.status(201).json(statuses);
};
const updateStatus = async (req, res) => {
    const validation = createSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const currentLoggedUser = req.user;
    const body = validation.data;
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
    const statuses = await prisma_client_1.prisma.order_Status.create({
        data: Object.assign(Object.assign({}, body), { timestamp: new Date(), id_employee: employee.id_employee }),
    });
    res.status(201).json(statuses);
};
exports.default = {
    getAllStatuses,
    getOrderStatus,
    updateStatus,
};
//# sourceMappingURL=statuses.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const createSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1),
    last_name: zod_1.z.string().min(1),
    supplier_name: zod_1.z.string().optional(),
    NIP: zod_1.z.preprocess((val) => (val && typeof val === "string" && val.length > 1 && val) || undefined, zod_1.z.string().min(10, { message: "password is required" }).optional()),
    REGON: zod_1.z.preprocess((val) => (val && typeof val === "string" && val.length > 1 && val) || undefined, zod_1.z.string().min(10, { message: "password is required" }).optional()),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    country: zod_1.z.string().min(1),
    province: zod_1.z.string().min(1),
    postal_code: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    street: zod_1.z.string().min(1),
});
const createSupplier = async (req, res) => {
    const validation = createSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const employee = await prisma_client_1.prisma.employee.findUnique({
        where: { id_user: currentLoggedUser },
    });
    if (!employee) {
        throw Error("No employee in request object");
    }
    const body = validation.data;
    const supplier = await prisma_client_1.prisma.supplier.create({
        data: Object.assign(Object.assign({}, body), { id_employee: employee.id_employee }),
    });
    res.status(201).json(supplier);
};
const getMySuppliers = async (req, res) => {
    console.log(req.user);
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const employee = await prisma_client_1.prisma.employee.findUnique({
        where: { id_user: currentLoggedUser },
    });
    if (!employee) {
        throw Error("No employee in request object");
    }
    const suppliers = await prisma_client_1.prisma.supplier.findMany({
        where: {
            id_employee: employee.id_employee,
        },
    });
    res.status(201).json(suppliers);
};
const getAllSuppliers = async (req, res) => {
    console.log(req.user);
    const supplers = await prisma_client_1.prisma.supplier.findMany();
    res.status(201).json(supplers);
};
const getSelectedSuppliers = async (req, res) => {
    console.log(req.params.id);
    const suppliersId = req.params.id
        .split(",")
        .map((e) => parseInt(e))
        .filter((e) => !isNaN(e));
    const suppliers = await prisma_client_1.prisma.supplier.findMany({
        where: {
            id_supplier: { in: suppliersId },
        },
    });
    res.status(201).json(suppliers);
};
const deleteSupplier = async (req, res) => {
    const supplierId = Number(req.params.id);
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const pallet = await prisma_client_1.prisma.supplier.deleteMany({
        where: {
            id_supplier: supplierId,
            employee: {
                id_user: currentLoggedUser,
            },
        },
    });
    res.status(201).json(pallet);
};
exports.default = {
    createSupplier,
    getMySuppliers,
    getAllSuppliers,
    getSelectedSuppliers,
    deleteSupplier,
};
//# sourceMappingURL=suppliers.js.map
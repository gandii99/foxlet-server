"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const createSchema = zod_1.z.object({
    id_supplier: zod_1.z.number(),
    pallet_name: zod_1.z.string().optional(),
    purchase_price: zod_1.z.number(),
    purchase_date: zod_1.z.string().min(1),
    delivery_date: zod_1.z.string().min(1),
});
const patchSchema = zod_1.z.object({
    id_supplier: zod_1.z.number().optional(),
    pallet_name: zod_1.z.string().optional(),
    purchase_price: zod_1.z.number().optional(),
    purchase_date: zod_1.z.string().min(1).optional(),
    delivery_date: zod_1.z.string().min(1).optional(),
});
const createPallet = async (req, res) => {
    const validation = createSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const body = validation.data;
    const currentLoggedUser = req.user;
    const employee = await prisma_client_1.prisma.employee.findMany({
        where: {
            id_user: currentLoggedUser,
        },
    });
    const pallet = await prisma_client_1.prisma.pallet.create({
        data: {
            id_supplier: body.id_supplier,
            id_employee: employee[0].id_employee,
            purchase_price: body.purchase_price,
            pallet_name: body.pallet_name,
            purchase_date: new Date().toISOString(),
            delivery_date: new Date().toISOString(),
        },
    });
    res.status(201).json(pallet);
};
const getAllPalettes = async (req, res) => {
    console.log(req.user);
    const palettes = await prisma_client_1.prisma.pallet.findMany();
    res.status(201).json(palettes);
};
const deletePallet = async (req, res) => {
    const palletsId = req.params.id
        .split(",")
        .map((e) => parseInt(e))
        .filter((e) => !isNaN(e));
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const pallet = await prisma_client_1.prisma.pallet.deleteMany({
        where: {
            id_pallet: {
                in: palletsId,
            },
            employee: {
                id_user: currentLoggedUser,
            },
        },
    });
    res.status(201).json(pallet);
};
const getSelectedPalettes = async (req, res) => {
    console.log(req.params.id);
    const palettesId = req.params.id
        .split(",")
        .map((e) => parseInt(e))
        .filter((e) => !isNaN(e));
    const palettes = await prisma_client_1.prisma.pallet.findMany({
        select: {
            id_pallet: true,
            pallet_name: true,
            purchase_price: true,
            purchase_date: true,
            delivery_date: true,
            supplier: true,
            batch: {
                select: {
                    id_batch: true,
                    batch_name: true,
                    quantity_in_delivery: true,
                    quantity_in_stock: true,
                    purchase_price: true,
                    selling_price: true,
                    description: true,
                    condition: true,
                    product: true,
                },
            },
        },
        where: {
            id_pallet: { in: palettesId },
        },
    });
    // res.status(201).json(palettes);
    // res.status(201).json(
    //   palettes.forEach((pallet) => ({
    //     ...pallet,
    //     purchase_date: pallet.purchase_date.toISOString(),
    //     delivery_date: pallet.delivery_date.toISOString(),
    //   }))
    // );
    palettes.forEach((pallet) => (Object.assign(Object.assign({}, pallet), { purchase_date: pallet.purchase_date.toISOString(), delivery_date: pallet.delivery_date.toISOString() })));
    res.status(201).json(palettes);
};
const getMyPallets = async (req, res) => {
    console.log(req.user);
    const currentLoggedUser = req.user;
    const pallets = await prisma_client_1.prisma.pallet.findMany({
        select: {
            id_pallet: true,
            pallet_name: true,
            purchase_price: true,
            purchase_date: true,
            delivery_date: true,
            supplier: true,
            batch: {
                select: {
                    id_batch: true,
                    batch_name: true,
                    quantity_in_delivery: true,
                    quantity_in_stock: true,
                    purchase_price: true,
                    selling_price: true,
                    description: true,
                    condition: true,
                    product: true,
                },
            },
        },
        where: {
            employee: {
                id_user: currentLoggedUser,
            },
        },
    });
    console.log(pallets);
    pallets.forEach((pallet) => (Object.assign(Object.assign({}, pallet), { purchase_date: pallet.purchase_date.toISOString(), delivery_date: pallet.delivery_date.toISOString() })));
    res.status(201).json(pallets);
};
const updatePallet = async (req, res) => {
    const validation = patchSchema.safeParse(req.body);
    const palettesId = parseInt(req.params.id);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const currentLoggedUser = req.user;
    const body = validation.data;
    const user = await prisma_client_1.prisma.pallet.update({
        where: {
            id_pallet: palettesId,
        },
        data: Object.assign(Object.assign({}, body), { purchase_date: new Date(body.purchase_date || new Date()), delivery_date: new Date(body.delivery_date || new Date()) }),
    });
    res.status(201).json(user);
};
exports.default = {
    createPallet,
    deletePallet,
    getAllPalettes,
    getSelectedPalettes,
    getMyPallets,
    updatePallet,
};
//# sourceMappingURL=pallets.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const types_1 = require("./types");
const createClient = async (req, res) => {
    const validation = types_1.createClientSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const body = validation.data;
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No client id in request object");
    }
    const employee = await prisma_client_1.prisma.employee.findFirst({
        where: {
            id_user: currentLoggedUser,
        },
    });
    const client = await prisma_client_1.prisma.client.create({
        data: Object.assign(Object.assign({}, body), { id_employee: employee === null || employee === void 0 ? void 0 : employee.id_employee }),
    });
    res.status(201).json(client);
};
const getMyClients = async (req, res) => {
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const clients = await prisma_client_1.prisma.client.findMany({
        select: {
            id_client: true,
            id_user: true,
            id_employee: true,
            first_name: true,
            last_name: true,
            client_name: true,
            NIP: true,
            REGON: true,
            phone: true,
            email: true,
            country: true,
            province: true,
            postal_code: true,
            city: true,
            street: true,
        },
        where: {
            employee: {
                id_user: currentLoggedUser,
            },
        },
    });
    res.status(200).json(clients);
};
const getAllClients = async (req, res) => {
    console.log(req.user);
    const palettes = await prisma_client_1.prisma.company.findMany();
    res.status(201).json(palettes);
};
const getSelectedClient = async (req, res) => {
    console.log(req.params.id);
    const companiesId = req.params.id
        .split(",")
        .map((e) => parseInt(e))
        .filter((e) => !isNaN(e));
    const employees = await prisma_client_1.prisma.company.findMany({
        where: {
            id_company: { in: companiesId },
        },
    });
    res.status(201).json(employees);
};
const updateMyClient = async (req, res) => {
    const validation = types_1.patchComapnySchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const body = validation.data;
    const employee = await prisma_client_1.prisma.company.updateMany({
        where: {
            employee: {
                some: { id_user: currentLoggedUser },
            },
        },
        data: body,
    });
    res.status(201).json(employee);
};
const deleteClient = async (req, res) => {
    const clientId = Number(req.params.id);
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    console.log("clientId", clientId, currentLoggedUser);
    const pallet = await prisma_client_1.prisma.client.deleteMany({
        where: {
            id_client: clientId,
            employee: {
                id_user: currentLoggedUser,
            },
        },
    });
    res.status(201).json(pallet);
};
exports.default = {
    createClient,
    getAllClients,
    getSelectedClient,
    getMyClients,
    updateMyClient,
    deleteClient,
};
//# sourceMappingURL=clients.js.map
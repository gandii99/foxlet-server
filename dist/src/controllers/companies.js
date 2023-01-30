"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const types_1 = require("./types");
const createCompany = async (req, res) => {
    const validation = types_1.createCompanySchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const body = validation.data;
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const owner = await prisma_client_1.prisma.employee.findUnique({
        where: {
            id_user: currentLoggedUser,
        },
    });
    if (!owner || !owner.id_employee) {
        throw new errors_1.CustomError("This owner is not exist");
    }
    const company = await prisma_client_1.prisma.company.create({
        data: {
            id_owner: owner.id_employee,
            first_name: body.first_name,
            last_name: body.last_name,
            company_name: body.company_name,
            NIP: body.NIP,
            REGON: body.REGON,
            phone: body.phone,
            email: body.email,
            country: body.country,
            province: body.province,
            postal_code: body.postal_code,
            city: body.city,
            street: body.street,
        },
    });
    console.log("created palett");
    const employee = await prisma_client_1.prisma.employee.updateMany({
        where: {
            id_user: currentLoggedUser,
        },
        data: {
            id_company: company.id_company,
        },
    });
    res.status(201).json(company);
};
const getAllCompanies = async (req, res) => {
    console.log(req.user);
    const palettes = await prisma_client_1.prisma.company.findMany();
    res.status(201).json(palettes);
};
const getSelectedCompanies = async (req, res) => {
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
const getMyCompan = async (req, res) => {
    console.log(req.params.id);
    console.log("getMyCompanProfile");
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const company = await prisma_client_1.prisma.company.findFirst({
        select: {
            id_company: true,
            id_owner: true,
            first_name: true,
            last_name: true,
            company_name: true,
            NIP: true,
            REGON: true,
            phone: true,
            email: true,
            country: true,
            province: true,
            postal_code: true,
            city: true,
            street: true,
            employee: {
                where: { id_user: currentLoggedUser },
            },
        },
        where: {
            employee: {
                some: {
                    id_user: currentLoggedUser,
                },
            },
        },
    });
    res.status(200).json(company);
};
const updateMyCompany = async (req, res) => {
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
const switchMyCompany = async (req, res) => {
    console.log(req.body);
    const validation = types_1.switchComapnySchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const body = validation.data;
    if (body.id_company) {
        const company = await prisma_client_1.prisma.company.findMany({
            where: {
                id_company: body.id_company,
            },
        });
        if (!company) {
            throw new errors_1.CustomError("This company not exists");
        }
    }
    console.log("body.id_company: ", body.id_company);
    const employee = await prisma_client_1.prisma.employee.updateMany({
        where: {
            id_user: currentLoggedUser,
        },
        data: {
            id_company: body.id_company || null,
        },
    });
    if (!employee) {
        throw new errors_1.CustomError("This employee not exists");
    }
    res.status(201).json(employee);
};
const deleteMyCompany = async (req, res) => {
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const company = await prisma_client_1.prisma.company.deleteMany({
        where: {
            id_owner: currentLoggedUser,
        },
    });
    res.status(201).json(company);
};
exports.default = {
    createCompany,
    getAllCompanies,
    getSelectedCompanies,
    getMyCompan,
    updateMyCompany,
    deleteMyCompany,
    switchMyCompany,
};
//# sourceMappingURL=companies.js.map
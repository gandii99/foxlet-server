"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const types_1 = require("./types");
const createEmployee = async (req, res) => {
    const validation = types_1.createEmployeeSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const body = validation.data;
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const employee = await prisma_client_1.prisma.employee.create({
        data: {
            id_company: (body === null || body === void 0 ? void 0 : body.id_company) || undefined,
            id_user: currentLoggedUser,
            first_name: body.first_name,
            last_name: body.last_name,
            PESEL: body.PESEL || undefined,
            phone: body.phone,
            email: body.email,
            country: body.country,
            province: body.province,
            postal_code: body.postal_code,
            city: body.city,
            street: body.street,
        },
    });
    res.status(201).json(employee);
};
const getAllEmployees = async (req, res) => {
    console.log(req.user);
    const employees = await prisma_client_1.prisma.employee.findMany();
    res.status(201).json(employees);
};
const getMyEmployeeProfile = async (req, res) => {
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    console.log("currentLoggedUser", currentLoggedUser);
    const employee = await prisma_client_1.prisma.employee.findFirst({
        where: {
            id_user: currentLoggedUser,
        },
    });
    res.status(200).json(employee);
};
const updateMyEmployeeProfileData = async (req, res) => {
    const validation = types_1.patchEmployeeSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const currentLoggedUser = req.user;
    if (!currentLoggedUser) {
        throw Error("No user id in request object");
    }
    const body = validation.data;
    console.log("test");
    console.log(Object.assign({ id_company: (body === null || body === void 0 ? void 0 : body.id_company) || undefined }, body));
    const employee = await prisma_client_1.prisma.employee.updateMany({
        where: {
            id_user: currentLoggedUser,
        },
        data: Object.assign(Object.assign({}, body), { id_company: (body === null || body === void 0 ? void 0 : body.id_company) || undefined, phone: (body === null || body === void 0 ? void 0 : body.phone) || "" }),
    });
    res.status(200).json(employee);
};
const getSelectedEmployees = async (req, res) => {
    console.log(req.params.id);
    const employeesId = req.params.id
        .split(",")
        .map((e) => parseInt(e))
        .filter((e) => !isNaN(e));
    const employees = await prisma_client_1.prisma.employee.findMany({
        where: {
            id_user: { in: employeesId },
        },
    });
    res.status(201).json(employees);
};
exports.default = {
    createEmployee,
    getAllEmployees,
    getSelectedEmployees,
    getMyEmployeeProfile,
    updateMyEmployeeProfileData,
};
//# sourceMappingURL=employees.js.map
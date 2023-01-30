"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchClientSchema = exports.createClientSchema = exports.patchEmployeeSchema = exports.createEmployeeSchema = exports.switchComapnySchema = exports.patchComapnySchema = exports.createCompanySchema = void 0;
const zod_1 = require("zod");
exports.createCompanySchema = zod_1.z.object({
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    company_name: zod_1.z.string(),
    NIP: zod_1.z.string(),
    REGON: zod_1.z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string(),
    country: zod_1.z.string(),
    province: zod_1.z.string(),
    postal_code: zod_1.z.string(),
    city: zod_1.z.string(),
    street: zod_1.z.string(),
});
exports.patchComapnySchema = zod_1.z.object({
    first_name: zod_1.z.string().optional(),
    last_name: zod_1.z.string().optional(),
    company_name: zod_1.z.string().optional(),
    NIP: zod_1.z.string().optional(),
    REGON: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    province: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    street: zod_1.z.string().optional(),
});
exports.switchComapnySchema = zod_1.z.object({
    id_company: zod_1.z.number().nullable(),
});
exports.createEmployeeSchema = zod_1.z.object({
    id_company: zod_1.z.number().optional(),
    // id_user: z.number(),
    first_name: zod_1.z.string().min(1, { message: "name is required" }),
    last_name: zod_1.z.string().min(1, { message: "lastName is required" }),
    PESEL: zod_1.z.preprocess((val) => val || undefined, zod_1.z.string().min(11, { message: "Pesel is required" }).optional()),
    phone: zod_1.z
        .string()
        .min(9, { message: "Phone number is too short" })
        .max(12, { message: "Phone number is too long" }),
    email: zod_1.z
        .string()
        .min(1, { message: "email is required" })
        .email({ message: "provide valid email address" }),
    country: zod_1.z.string(),
    province: zod_1.z.string(),
    postal_code: zod_1.z.string(),
    city: zod_1.z.string(),
    street: zod_1.z.string(),
});
exports.patchEmployeeSchema = zod_1.z.object({
    id_company: zod_1.z.number().optional(),
    // id_user: z.number().optional(),
    first_name: zod_1.z.string().min(1, { message: "name is required" }).optional(),
    last_name: zod_1.z.string().min(1, { message: "lastName is required" }).optional(),
    PESEL: zod_1.z.string().length(11, { message: "PESEL is invalid" }).optional(),
    phone: zod_1.z.preprocess((val) => (val ? val : null), zod_1.z.string().min(9).max(12).nullable()),
    email: zod_1.z
        .string()
        .min(1, { message: "email is required" })
        .email({ message: "provide valid email address" })
        .optional(),
    country: zod_1.z.string().optional(),
    province: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    street: zod_1.z.string().optional(),
});
exports.createClientSchema = zod_1.z.object({
    id_user: zod_1.z.number().optional(),
    id_employee: zod_1.z.number().optional(),
    first_name: zod_1.z.string().optional(),
    last_name: zod_1.z.string().optional(),
    client_name: zod_1.z.string().optional(),
    NIP: zod_1.z.string().optional(),
    REGON: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    province: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    street: zod_1.z.string().optional(),
});
exports.patchClientSchema = zod_1.z.object({
    id_user: zod_1.z.number().optional(),
    first_name: zod_1.z.string().optional(),
    last_name: zod_1.z.string().optional(),
    company_name: zod_1.z.string().optional(),
    NIP: zod_1.z.string().optional(),
    REGON: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    province: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    street: zod_1.z.string().optional(),
});
//# sourceMappingURL=types.js.map
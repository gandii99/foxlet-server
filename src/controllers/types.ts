import { z } from "zod";

export const createCompanySchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  company_name: z.string(),
  NIP: z.string(),
  REGON: z.string(),
  phone: z.string(),
  email: z.string(),
  country: z.string(),
  province: z.string(),
  postal_code: z.string(),
  city: z.string(),
  street: z.string(),
});

export const patchComapnySchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company_name: z.string().optional(),
  NIP: z.string().optional(),
  REGON: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  country: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
});

export const switchComapnySchema = z.object({
  id_company: z.number().nullable(),
});

export const createEmployeeSchema = z.object({
  id_company: z.number().optional(),
  // id_user: z.number(),
  first_name: z.string().min(1, { message: "name is required" }),
  last_name: z.string().min(1, { message: "lastName is required" }),
  PESEL: z.preprocess(
    (val) => val || undefined,
    z.string().min(11, { message: "Pesel is required" }).optional()
  ),
  phone: z
    .string()
    .min(9, { message: "Phone number is too short" })
    .max(12, { message: "Phone number is too long" }),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "provide valid email address" }),
  country: z.string(),
  province: z.string(),
  postal_code: z.string(),
  city: z.string(),
  street: z.string(),
});

export const patchEmployeeSchema = z.object({
  id_company: z.number().optional(),
  // id_user: z.number().optional(),
  first_name: z.string().min(1, { message: "name is required" }).optional(),
  last_name: z.string().min(1, { message: "lastName is required" }).optional(),
  PESEL: z.string().length(11, { message: "PESEL is invalid" }).optional(),
  phone: z.preprocess(
    (val) => (val ? val : null),
    z.string().min(9).max(12).nullable()
  ),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "provide valid email address" })
    .optional(),
  country: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
});

export const createClientSchema = z.object({
  id_user: z.number().optional(),
  id_employee: z.number().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  client_name: z.string().optional(),
  NIP: z.string().optional(),
  REGON: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  country: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
});

export const patchClientSchema = z.object({
  id_user: z.number().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company_name: z.string().optional(),
  NIP: z.string().optional(),
  REGON: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  country: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
});

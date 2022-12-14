import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { number, z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  id_company: z.number().optional(),
  // id_user: z.number(),
  first_name: z.string().min(1, { message: "name is required" }),
  last_name: z.string().min(1, { message: "lastName is required" }),
  PESEL: z.string().length(11, { message: "PESEL is invalid" }),
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

const patchSchema = z.object({
  id_company: z.number().optional(),
  // id_user: z.number().optional(),
  first_name: z.string().min(1, { message: "name is required" }).optional(),
  last_name: z.string().min(1, { message: "lastName is required" }).optional(),
  PESEL: z.string().length(11, { message: "PESEL is invalid" }).optional(),
  phone: z
    .string()
    .min(9, { message: "Phone number is too short" })
    .max(12, { message: "Phone number is too long" })
    .optional(),
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

const createEmployee = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const currentLoggedUser = req.user;

  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const employee = await prisma.employee.create({
    data: {
      id_company: body?.id_company || undefined,
      id_user: currentLoggedUser,
      first_name: body.first_name,
      last_name: body.last_name,
      PESEL: body.PESEL,
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
const getAllEmployees = async (req: Request, res: Response) => {
  console.log(req.user);
  const employees = await prisma.employee.findMany();
  res.status(201).json(employees);
};

const getMyEmployeeProfile = async (req: Request, res: Response) => {
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  console.log("currentLoggedUser", currentLoggedUser);
  const employee = await prisma.employee.findFirst({
    where: {
      id_user: currentLoggedUser,
    },
  });
  res.status(200).json(employee);
};

const updateMyEmployeeProfileData = async (req: Request, res: Response) => {
  const validation = patchSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }
  const currentLoggedUser = req.user;

  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const body = validation.data;
  console.log("test");
  console.log({
    id_company: body?.id_company || undefined,
    ...body,
  });

  const employee = await prisma.employee.updateMany({
    where: {
      id_user: currentLoggedUser,
    },
    data: {
      id_company: body?.id_company || undefined,
      ...body,
    },
  });
  res.status(200).json(employee);
};

const getSelectedEmployees = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const employeesId = req.params.id
    .split(",")
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));
  const employees = await prisma.employee.findMany({
    where: {
      id_user: { in: employeesId },
    },
  });
  res.status(201).json(employees);
};

export default {
  createEmployee,
  getAllEmployees,
  getSelectedEmployees,
  getMyEmployeeProfile,
  updateMyEmployeeProfileData,
};

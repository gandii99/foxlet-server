import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { number, z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";
import { createEmployeeSchema, patchEmployeeSchema } from "./types";

const createEmployee = async (req: Request, res: Response) => {
  const validation = createEmployeeSchema.safeParse(req.body);

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
  const validation = patchEmployeeSchema.safeParse(req.body);

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
      ...body,
      id_company: body?.id_company || undefined,
      phone: body?.phone || "",
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

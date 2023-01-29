import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { CustomError, ValidationError } from "../errors";
import {
  createClientSchema,
  patchComapnySchema,
  patchEmployeeSchema,
  switchComapnySchema,
} from "./types";

const createClient = async (req: Request, res: Response) => {
  const validation = createClientSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No client id in request object");
  }

  const employee = await prisma.employee.findFirst({
    where: {
      id_user: currentLoggedUser,
    },
  });

  const client = await prisma.client.create({
    data: { ...body, id_employee: employee?.id_employee },
  });

  res.status(201).json(client);
};

const getMyClients = async (req: Request, res: Response) => {
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const clients = await prisma.client.findMany({
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

const getAllClients = async (req: Request, res: Response) => {
  console.log(req.user);
  const palettes = await prisma.company.findMany();
  res.status(201).json(palettes);
};

const getSelectedClient = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const companiesId = req.params.id
    .split(",")
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));
  const employees = await prisma.company.findMany({
    where: {
      id_company: { in: companiesId },
    },
  });
  res.status(201).json(employees);
};

const updateMyClient = async (req: Request, res: Response) => {
  const validation = patchComapnySchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const body = validation.data;

  const employee = await prisma.company.updateMany({
    where: {
      employee: {
        some: { id_user: currentLoggedUser },
      },
    },
    data: body,
  });
  res.status(201).json(employee);
};

const deleteClient = async (req: Request, res: Response) => {
  const clientId = Number(req.params.id);

  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  console.log("clientId", clientId, currentLoggedUser);
  const pallet = await prisma.client.deleteMany({
    where: {
      id_client: clientId,
      employee: {
        id_user: currentLoggedUser,
      },
    },
  });
  res.status(201).json(pallet);
};

export default {
  createClient,
  getAllClients,
  getSelectedClient,
  getMyClients,
  updateMyClient,
  deleteClient,
};

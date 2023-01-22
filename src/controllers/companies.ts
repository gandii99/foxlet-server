import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { CustomError, ValidationError } from "../errors";
import {
  createCompanySchema,
  patchComapnySchema,
  patchEmployeeSchema,
  switchComapnySchema,
} from "./types";

const createCompany = async (req: Request, res: Response) => {
  const validation = createCompanySchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const owner = await prisma.employee.findUnique({
    where: {
      id_user: currentLoggedUser,
    },
  });

  if (!owner || !owner.id_employee) {
    throw new CustomError("This owner is not exist");
  }

  const company = await prisma.company.create({
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
  const employee = await prisma.employee.updateMany({
    where: {
      id_user: currentLoggedUser,
    },
    data: {
      id_company: company.id_company,
    },
  });
  res.status(201).json(company);
};

const getAllCompanies = async (req: Request, res: Response) => {
  console.log(req.user);
  const palettes = await prisma.company.findMany();
  res.status(201).json(palettes);
};

const getSelectedCompanies = async (req: Request, res: Response) => {
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

const getMyCompan = async (req: Request, res: Response) => {
  console.log(req.params.id);
  console.log("getMyCompanProfile");
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const company = await prisma.company.findFirst({
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

const updateMyCompany = async (req: Request, res: Response) => {
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

const switchMyCompany = async (req: Request, res: Response) => {
  console.log(req.body);
  const validation = switchComapnySchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const body = validation.data;

  if (body.id_company) {
    const company = await prisma.company.findMany({
      where: {
        id_company: body.id_company,
      },
    });

    if (!company) {
      throw new CustomError("This company not exists");
    }
  }
  console.log("body.id_company: ", body.id_company);
  const employee = await prisma.employee.updateMany({
    where: {
      id_user: currentLoggedUser,
    },
    data: {
      id_company: body.id_company || null,
    },
  });
  if (!employee) {
    throw new CustomError("This employee not exists");
  }

  res.status(201).json(employee);
};
const deleteMyCompany = async (req: Request, res: Response) => {
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const company = await prisma.company.deleteMany({
    where: {
      id_owner: currentLoggedUser,
    },
  });
  res.status(201).json(company);
};

export default {
  createCompany,
  getAllCompanies,
  getSelectedCompanies,
  getMyCompan,
  updateMyCompany,
  deleteMyCompany,
  switchMyCompany,
};

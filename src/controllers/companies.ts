import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
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
const patchSchema = z.object({
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

const createCompany = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const pallet = await prisma.company.create({
    data: {
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
  res.status(201).json(pallet);
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

const getMyCompanProfile = async (req: Request, res: Response) => {
  console.log(req.params.id);
  console.log("getMyCompanProfile");
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const company = await prisma.company.findFirst({
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

const updateMyCompanyProfileData = async (req: Request, res: Response) => {
  const validation = patchSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }
  const currentLoggedUser = req.user;

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

export default {
  createCompany,
  getAllCompanies,
  getSelectedCompanies,
  getMyCompanProfile,
  updateMyCompanyProfileData,
};

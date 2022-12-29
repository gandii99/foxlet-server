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

const createCategory = async (req: Request, res: Response) => {
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

const getAllCategories = async (req: Request, res: Response) => {
  console.log(req.user);
  const palettes = await prisma.company.findMany();
  res.status(201).json(palettes);
};

const getSelectedCategories = async (req: Request, res: Response) => {
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

export default {
  createCategory,
  getAllCategories,
  getSelectedCategories,
};

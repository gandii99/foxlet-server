import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  supplier_name: z.string(),
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

const createSupplier = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const supplier = await prisma.supplier.create({
    data: {
      first_name: body.first_name,
      last_name: body.last_name,
      supplier_name: body.supplier_name,
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
  res.status(201).json(supplier);
};

interface UserType {
  user_name: string;
  email: string;
  password: string;
  role: string;
}

const getMySuppliers = async (req: Request, res: Response) => {
  console.log(req.user);
  const currentLoggedUser = req.user;

  const suppliers = await prisma.supplier.findMany({
    where: {
      pallet: {
        some: {
          employee: {
            id_user: currentLoggedUser,
          },
        },
      },
    },
  });
  res.status(201).json(suppliers);
};

const getAllSuppliers = async (req: Request, res: Response) => {
  console.log(req.user);
  const supplers = await prisma.supplier.findMany();
  res.status(201).json(supplers);
};

const getSelectedSuppliers = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const suppliersId = req.params.id
    .split(",")
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));
  const suppliers = await prisma.supplier.findMany({
    where: {
      id_supplier: { in: suppliersId },
    },
  });
  res.status(201).json(suppliers);
};

export default {
  createSupplier,
  getMySuppliers,
  getAllSuppliers,
  getSelectedSuppliers,
};

import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  supplier_name: z.string().optional(),
  NIP: z.preprocess(
    (val) =>
      (val && typeof val === "string" && val.length > 1 && val) || undefined,
    z.string().min(10, { message: "password is required" }).optional()
  ),

  REGON: z.preprocess(
    (val) =>
      (val && typeof val === "string" && val.length > 1 && val) || undefined,
    z.string().min(10, { message: "password is required" }).optional()
  ),
  phone: z.string().optional(),
  email: z.string().optional(),
  country: z.string().min(1),
  province: z.string().min(1),
  postal_code: z.string().min(1),
  city: z.string().min(1),
  street: z.string().min(1),
});

const createSupplier = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const supplier = await prisma.supplier.create({
    data: body,
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

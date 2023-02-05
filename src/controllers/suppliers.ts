import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";
const x = {
  NIP: "08989878",
  REGON: "",
  city: "Tarnów",
  country: "Polska",
  email: "",
  first_name: "Testowa paleta",
  last_name: "08989878",
  phone: "",
  postal_code: "33-170",
  province: "Małopolska",
  street: "Ogrodowa 6",
  supplier_name: "",
};
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

  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const employee = await prisma.employee.findUnique({
    where: { id_user: currentLoggedUser },
  });

  if (!employee) {
    throw Error("No employee in request object");
  }

  const body = validation.data;

  const supplier = await prisma.supplier.create({
    data: { ...body, id_employee: employee.id_employee },
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
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const employee = await prisma.employee.findUnique({
    where: { id_user: currentLoggedUser },
  });

  if (!employee) {
    throw Error("No employee in request object");
  }

  const suppliers = await prisma.supplier.findMany({
    where: {
      id_employee: employee.id_employee,
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

const deleteSupplier = async (req: Request, res: Response) => {
  const supplierId = Number(req.params.id);

  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const pallet = await prisma.supplier.deleteMany({
    where: {
      id_supplier: supplierId,
      employee: {
        id_user: currentLoggedUser,
      },
    },
  });
  res.status(201).json(pallet);
};

export default {
  createSupplier,
  getMySuppliers,
  getAllSuppliers,
  getSelectedSuppliers,
  deleteSupplier,
};

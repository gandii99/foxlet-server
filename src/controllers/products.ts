import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  product_name: z.string(),
  EAN: z.string(),
  ASIN: z.string(),
  description: z.string(),
});

const createProduct = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const product = await prisma.product.create({
    data: {
      product_name: body.product_name,
      EAN: body.EAN,
      ASIN: body.ASIN,
      description: body.description,
    },
  });
  res.status(201).json(product);
};

const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.status(201).json(products);
};

const getSelectedProducts = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const productsId = req.params.id
    .split(",")
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));
  const employees = await prisma.product.findMany({
    where: {
      id_product: { in: productsId },
    },
  });
  res.status(201).json(employees);
};

export default {
  createProduct,
  getAllProducts,
  getSelectedProducts,
};

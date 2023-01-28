import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  product_name: z.string(),
  id_category: z.number(),
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
    data: body,
  });
  res.status(201).json(product);
};

const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    select: {
      id_product: true,
      id_category: true,
      image: true,
      product_name: true,
      description: true,
      EAN: true,
      ASIN: true,
      category: {
        select: {
          category_name: true,
          id_category: true,
          description: true,
        },
      },
    },
    orderBy: [
      {
        id_category: "asc",
      },
      {
        product_name: "asc",
      },
    ],
  });
  res.status(201).json(products);
};

const getMyProducts = async (req: Request, res: Response) => {
  const currentLoggedUser = req.user;

  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  //Ilość sztuk
  const products = await prisma.product.findMany({
    select: {
      id_product: true,
      id_category: true,
      image: true,
      product_name: true,
      description: true,
      EAN: true,
      ASIN: true,
      category: {
        select: {
          category_name: true,
          id_category: true,
          description: true,
        },
      },
      batch: {
        select: {
          quantity_in_stock: true,
          description: true,
        },
      },
    },
    where: {
      batch: {
        some: {
          pallet: {
            employee: {
              id_user: currentLoggedUser,
            },
          },
        },
      },
      AND: {
        batch: {
          some: {
            quantity_in_stock: {
              gt: 0,
            },
          },
        },
      },
    },
    orderBy: [
      {
        id_category: "asc",
      },
      {
        product_name: "asc",
      },
    ],
  });
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
  getMyProducts,
  getSelectedProducts,
};

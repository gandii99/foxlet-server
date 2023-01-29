import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  id_product: z.number(),
  id_condition: z.number(),
  id_pallet: z.number(),
  batch_name: z.string().optional(),
  quantity_in_delivery: z.number(),
  quantity_in_stock: z.number(),
  purchase_price: z.number().optional(),
  selling_price: z.number(),
  description: z.string().optional(),
});

const createBatch = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const batch = await prisma.batch.create({
    data: {
      id_product: body.id_product,
      id_condition: body.id_condition,
      id_pallet: body.id_pallet,
      batch_name: body.batch_name,
      quantity_in_delivery: body.quantity_in_delivery,
      quantity_in_stock: body.quantity_in_stock,
      purchase_price: body.purchase_price,
      selling_price: body.selling_price,
      description: body.description,
    },
  });
  res.status(201).json(batch);
};

const deleteBatch = async (req: Request, res: Response) => {
  const batchesId = req.params.id
    .split(",")
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));

  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const batch = await prisma.batch.deleteMany({
    where: {
      id_batch: {
        in: batchesId,
      },
      pallet: {
        employee: {
          id_user: currentLoggedUser,
        },
      },
    },
  });
  res.status(201).json(batch);
};

const getAllBatches = async (req: Request, res: Response) => {
  console.log(req.user);
  const palettes = await prisma.batch.findMany();
  res.status(201).json(palettes);
};

const getMybatches = async (req: Request, res: Response) => {
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const batches = await prisma.batch.findMany({
    select: {
      id_batch: true,
      batch_name: true,
      quantity_in_delivery: true,
      quantity_in_stock: true,
      purchase_price: true,
      selling_price: true,
      description: true,
      condition: true,
      pallet: true,
      product: {
        select: {
          product_name: true,
          image: true,
          EAN: true,
          ASIN: true,
          description: true,
          category: {
            select: {
              category_name: true,
              description: true,
              id_category: true,
            },
          },
        },
      },
    },
    where: {
      quantity_in_stock: {
        gt: 0,
      },
      pallet: {
        employee: {
          id_user: currentLoggedUser,
        },
      },
    },
  });

  res.status(200).json(batches);
};
const getMybatchesOutOfStock = async (req: Request, res: Response) => {
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const batches = await prisma.batch.findMany({
    select: {
      id_batch: true,
      batch_name: true,
      quantity_in_delivery: true,
      quantity_in_stock: true,
      purchase_price: true,
      selling_price: true,
      description: true,
      condition: true,
      pallet: true,
      product: {
        select: {
          product_name: true,
          image: true,
          EAN: true,
          ASIN: true,
          description: true,
          category: {
            select: {
              category_name: true,
              description: true,
              id_category: true,
            },
          },
        },
      },
    },
    where: {
      quantity_in_stock: {
        lte: 0,
      },
      pallet: {
        employee: {
          id_user: currentLoggedUser,
        },
      },
    },
  });

  res.status(200).json(batches);
};

export default {
  createBatch,
  deleteBatch,
  getAllBatches,
  getMybatches,
  getMybatchesOutOfStock,
};

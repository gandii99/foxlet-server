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
  const batches = await prisma.batch.findFirst({
    where: {
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
  getAllBatches,
  getMybatches,
};

import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  id_supplier: z.number(),
  id_employee: z.number(),
  purchase_price: z.number(),
  purchase_date: z.string().min(1),
  delivery_date: z.string().min(1),
});

const createPallet = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const pallet = await prisma.pallet.create({
    data: {
      id_supplier: body.id_supplier,
      id_employee: body.id_employee,
      purchase_price: body.purchase_price,
      purchase_date: new Date().toISOString(),
      delivery_date: new Date().toISOString(),
    },
  });
  res.status(201).json(pallet);
};

const getAllPalettes = async (req: Request, res: Response) => {
  console.log(req.user);
  const palettes = await prisma.pallet.findMany();
  res.status(201).json(palettes);
};

const getSelectedPalettes = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const palettesId = req.params.id
    .split(",")
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));
  const palettes = await prisma.pallet.findMany({
    where: {
      id_pallet: { in: palettesId },
    },
  });
  res.status(201).json(palettes);
};

export default {
  createPallet,
  getAllPalettes,
  getSelectedPalettes,
};

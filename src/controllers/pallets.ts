import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  id_supplier: z.number(),
  id_employee: z.number().optional(),
  pallet_name: z.string().optional(),
  purchase_price: z.number(),
  purchase_date: z.string().min(1),
  delivery_date: z.string().min(1),
});

const patchSchema = z.object({
  id_supplier: z.number().optional(),
  id_employee: z.number().optional(),
  pallet_name: z.string().optional(),
  purchase_price: z.number().optional(),
  purchase_date: z.string().min(1).optional(),
  delivery_date: z.string().min(1).optional(),
});

const createPallet = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;
  const currentLoggedUser = req.user;

  const employee = await prisma.employee.findMany({
    where: {
      id_user: currentLoggedUser,
    },
  });

  const pallet = await prisma.pallet.create({
    data: {
      id_supplier: body.id_supplier,
      id_employee: employee[0].id_employee,
      purchase_price: body.purchase_price,
      pallet_name: body.pallet_name,
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
  // const palettes = await prisma.pallet.findMany({
  //   where: {
  //     id_pallet: { in: palettesId },
  //   },
  // });

  const palettes = await prisma.pallet.findMany({
    select: {
      id_pallet: true,
      pallet_name: true,
      purchase_price: true,
      purchase_date: true,
      delivery_date: true,
      supplier: true,
      batch: {
        select: {
          batch_name: true,
          quantity_in_delivery: true,
          quantity_in_stock: true,
          purchase_price: true,
          selling_price: true,
          description: true,
          condition: true,
          product: true,
        },
      },
    },
    where: {
      id_pallet: { in: palettesId },
    },
  });
  // res.status(201).json(palettes);
  // res.status(201).json(
  //   palettes.forEach((pallet) => ({
  //     ...pallet,
  //     purchase_date: pallet.purchase_date.toISOString(),
  //     delivery_date: pallet.delivery_date.toISOString(),
  //   }))
  // );
  palettes.forEach((pallet) => ({
    ...pallet,
    purchase_date: pallet.purchase_date.toISOString(),
    delivery_date: pallet.delivery_date.toISOString(),
  }));

  res.status(201).json(palettes);
};

const getMyPallets = async (req: Request, res: Response) => {
  console.log(req.user);
  const currentLoggedUser = req.user;

  const pallets = await prisma.pallet.findMany({
    select: {
      id_pallet: true,
      pallet_name: true,
      purchase_price: true,
      purchase_date: true,
      delivery_date: true,
      supplier: true,
      batch: {
        select: {
          id_batch: true,
          batch_name: true,
          quantity_in_delivery: true,
          quantity_in_stock: true,
          purchase_price: true,
          selling_price: true,
          description: true,
          condition: true,
          product: true,
        },
      },
    },
    where: {
      employee: {
        id_user: currentLoggedUser,
      },
    },
  });
  console.log(pallets);

  pallets.forEach((pallet) => ({
    ...pallet,
    purchase_date: pallet.purchase_date.toISOString(),
    delivery_date: pallet.delivery_date.toISOString(),
  }));
  res.status(201).json(pallets);
};

const updatePallet = async (req: Request, res: Response) => {
  const validation = patchSchema.safeParse(req.body);
  const palettesId = parseInt(req.params.id);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }
  const currentLoggedUser = req.user;

  const body = validation.data;
  console.log("test", body);
  // let purchase_date_transformed = new Date(body.purchase_date).toISOString();
  // if (typeof body?.purchase_date && typeof body?.purchase_date == "string") {
  //   purchase_date_transformed = new Date(body.purchase_date).toISOString();
  // }

  // let delivery_date_transformed = new Date().toISOString();
  // if (typeof body?.delivery_date && typeof body?.delivery_date == "string") {
  //   delivery_date_transformed = new Date(body.delivery_date).toISOString();
  // }

  const user = await prisma.pallet.update({
    where: {
      id_pallet: palettesId,
    },
    data: {
      ...body,
      purchase_date: new Date(body.purchase_date || new Date()),
      delivery_date: new Date(body.delivery_date || new Date()),
    },
  });
  res.status(201).json(user);
};

export default {
  createPallet,
  getAllPalettes,
  getSelectedPalettes,
  getMyPallets,
  updatePallet,
};

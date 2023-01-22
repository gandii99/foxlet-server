import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createCategorySchema = z.object({
  category_name: z.string(),
  description: z.string(),
});

const createCategory = async (req: Request, res: Response) => {
  const validation = createCategorySchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const pallet = await prisma.category.create({
    data: body,
  });
  res.status(201).json(pallet);
};

const getAllCategories = async (req: Request, res: Response) => {
  console.log(req.user);
  const categories = await prisma.category.findMany();
  res.status(201).json(categories);
};

export default {
  createCategory,
  getAllCategories,
};

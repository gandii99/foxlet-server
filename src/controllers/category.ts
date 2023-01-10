import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const createCategory = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const category = await prisma.category.create({
    data: { category_name: body.name, description: body.description },
  });
  res.status(201).json(category);
};

const getAllCategories = async (req: Request, res: Response) => {
  console.log(req.user);
  const categories = await prisma.category.findMany();
  res.status(201).json(categories);
};

const getSelectedCategories = async (req: Request, res: Response) => {
  const categoriesId = req.params.id
    .split(",")
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));
  const categories = await prisma.category.findMany({
    where: {
      id_category: { in: categoriesId },
    },
  });
  res.status(201).json(categories);
};

export default {
  createCategory,
  getAllCategories,
  getSelectedCategories,
};

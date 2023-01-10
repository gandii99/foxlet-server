import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  condition_name: z.string(),
  description: z.string(),
});

const createCondition = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const pallet = await prisma.condition.create({
    data: {
      condition_name: body.condition_name,
      description: body.description,
    },
  });
  res.status(201).json(pallet);
};

const getAllConditions = async (req: Request, res: Response) => {
  console.log(req.user);
  const conditions = await prisma.condition.findMany();
  res.status(201).json(conditions);
};

// const getSelectedConditions = async (req: Request, res: Response) => {
//   console.log(req.params.id);
//   const companiesId = req.params.id
//     .split(",")
//     .map((e) => parseInt(e))
//     .filter((e) => !isNaN(e));
//   const conditions = await prisma.condition.findMany({
//     where: {
//       id_company: { in: companiesId },
//     },
//   });
//   res.status(201).json(conditions);
// };

export default {
  createCondition,
  getAllConditions,
  //   getSelectedConditions,
};

import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { CustomError, ValidationError } from "../errors";

const createSchema = z.object({
  id_status: z.number(),
  id_order: z.number(),
  comments: z.string().optional(),
});

const getAllStatuses = async (req: Request, res: Response) => {
  const statuses = await prisma.status.findMany();
  res.status(201).json(statuses);
};

const getOrderStatus = async (req: Request, res: Response) => {
  const orderId = Number(req.params.id);

  const statuses = await prisma.order_Status.findFirst({
    where: {
      id_order: orderId,
    },
    orderBy: [
      {
        timestamp: "desc",
      },
    ],
    take: 1,
  });
  res.status(201).json(statuses);
};

const updateStatus = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const currentLoggedUser = req.user;
  const body = validation.data;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      id_user: currentLoggedUser,
    },
  });

  if (!employee) {
    throw new CustomError("Employee not exists");
  }

  const statuses = await prisma.order_Status.create({
    data: {
      ...body,
      timestamp: new Date(),
      id_employee: employee.id_employee,
    },
  });
  res.status(201).json(statuses);
};

export default {
  getAllStatuses,
  getOrderStatus,
  updateStatus,
};

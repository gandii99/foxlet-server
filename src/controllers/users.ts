import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "provide valid email address" }),
  password: z.string().min(1, { message: "password is required" }),
  role: z.string(),
});

const getAllUsers = async (req: Request, res: Response) => {
  console.log(req.user);
  const users = await prisma.user.findMany({
    select: {
      id_user: true,
      email: true,
      name: true,
      role: true,
    },
  });
  res.status(201).json(users);
};

const getSelectedUsers = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const usersId = req.params.id
    .split(",")
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));
  const users = await prisma.user.findMany({
    where: {
      id_user: { in: usersId },
    },
    select: {
      id_user: true,
      email: true,
      name: true,
      role: true,
    },
  });
  res.status(201).json(users);
};

export default {
  getAllUsers,
  getSelectedUsers,
};

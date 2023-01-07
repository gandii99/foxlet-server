import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";
import bcrypt from "bcrypt";

const createSchema = z.object({
  user_name: z.string().min(1, { message: "name is required" }),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "provide valid email address" }),
  password: z.string().min(1, { message: "password is required" }),
  role: z.string(),
});

const patchSchema = z.object({
  user_name: z.string().min(1, { message: "name is required" }).optional(),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "provide valid email address" })
    .optional(),
  password: z.string().min(1, { message: "password is required" }).optional(),
  role: z.string().optional(),
});

const getAllUsers = async (req: Request, res: Response) => {
  console.log(req.user);
  const users = await prisma.user.findMany({
    select: {
      id_user: true,
      email: true,
      user_name: true,
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
      // id_user: { in: usersId },
    },
    select: {
      id_user: true,
      email: true,
      user_name: true,
      role: true,
    },
  });
  res.status(201).json(users);
};

const getMyUserProfile = async (req: Request, res: Response) => {
  console.log("getMyUserProfile", req.user);
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const company = await prisma.user.findFirst({
    where: {
      id_user: currentLoggedUser,
    },
  });

  res.status(200).json(company);
};

const updateMyUserProfileData = async (req: Request, res: Response) => {
  const validation = patchSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }
  const currentLoggedUser = req.user;

  const body = validation.data;

  if (body?.password) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
  }

  const user = await prisma.user.update({
    where: {
      id_user: currentLoggedUser,
    },
    data: body,
  });
  res.status(201).json(user);
};

export default {
  getAllUsers,
  getSelectedUsers,
  getMyUserProfile,
  updateMyUserProfileData,
};

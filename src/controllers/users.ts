import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";
import bcrypt from "bcrypt";

const patchSchema = z.object({
  user_name: z.string().min(1, { message: "name is required" }).optional(),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "provide valid email address" })
    .optional(),
  password: z.preprocess(
    (val) =>
      (val && typeof val === "string" && val.length > 1 && val) || undefined,
    z.string().min(1, { message: "password is required" }).optional()
  ),
  role: z.string().optional(),
  avatar: z.string().optional(),
});

const getAllUsers = async (req: Request, res: Response) => {
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
  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const company = await prisma.user.findFirst({
    select: {
      id_user: true,
      user_name: true,
      email: true,
      role: true,
      avatar: true,
    },
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

const deactivateMyProfile = async (req: Request, res: Response) => {
  const currentLoggedUser = req.user;

  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const deletedUser = await prisma.user.update({
    data: { active: false },
    where: {
      id_user: currentLoggedUser,
    },
  });

  res.status(200).json(deletedUser);
};

const deleteMyAccount = async (req: Request, res: Response) => {
  const currentLoggedUser = req.user;

  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const tabToTransaction = [];

  const pallets = await prisma.pallet.findMany({
    where: {
      employee: {
        id_user: currentLoggedUser,
      },
    },
  });

  if (pallets.length > 0) {
    tabToTransaction.push(
      prisma.pallet.deleteMany({
        where: {
          employee: {
            id_user: currentLoggedUser,
          },
        },
      })
    );
  }

  const employee = await prisma.employee.findUnique({
    where: {
      id_user: currentLoggedUser,
    },
  });

  if (employee) {
    tabToTransaction.push(
      prisma.employee.delete({
        where: {
          id_user: currentLoggedUser,
        },
      })
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id_user: currentLoggedUser,
    },
  });

  if (user) {
    tabToTransaction.push(
      prisma.user.delete({ where: { id_user: currentLoggedUser } })
    );
  } else {
    throw Error("No user to deleted");
  }

  const deleted = await prisma.$transaction(tabToTransaction);
  res.status(200).json(deleted);
};

export default {
  getAllUsers,
  getSelectedUsers,
  getMyUserProfile,
  deactivateMyProfile,
  deleteMyAccount,
  updateMyUserProfileData,
};

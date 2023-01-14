import { Request, Response } from "express";
import { string, z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors/validation-error";
import { prisma } from "../lib/prisma-client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NotFoundError } from "../errors/not-found-error";
import { UnautenticatedError } from "../errors/unautenticated-error";

const registerSchema = z.object({
  user_name: z.string().min(1, { message: "name is required" }),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "provide valid email address" }),
  password: z.string().min(1, { message: "password is required" }),
  role: z.string(),
  avatar: z.string().optional(),
});

const registerUser = async (req: Request, res: Response) => {
  const validation = registerSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const data = validation.data;

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch {
    res.status(500).json("CustomErr");
  }
};

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "provide valid email address" }),
  password: z.string().min(1, { message: "password is required" }),
});

const loginUser = async (req: Request, res: Response) => {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const { email, password } = validation.data;
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  console.log(user);

  if (user == null) {
    throw new NotFoundError("No user with that email");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log("proccessss", process.env.SESSION_SECRET);

  if (isPasswordCorrect) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
        data: {
          user_id: user.id_user,
          login: user.user_name,
          avatar: user.avatar,
        },
      },
      process.env.SESSION_SECRET!
    );
    res.status(200).json({
      user: {
        id: user.id_user,
        name: user.user_name,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } else {
    throw new UnautenticatedError("Wrong email or password");
  }
};

export default {
  registerUser,
  loginUser,
};

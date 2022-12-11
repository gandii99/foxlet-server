import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { string, z } from "zod";
import { generateErrorMessage } from "zod-error";
import { ValidationError } from "../errors";

const createSchema = z.object({
  idFirmy: z.number(),
  idUzytkownika: z.number(),
  imie: z.string().min(1, { message: "name is required" }),
  nazwisko: z.string().min(1, { message: "lastName is required" }),
  PESEL: z.string().length(11, { message: "PESEL is invalid" }),
  telefon: z
    .string()
    .min(9, { message: "Phone number is too short" })
    .max(12, { message: "Phone number is too long" }),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "provide valid email address" }),
  kraj: z.string(),
  wojewodztwo: z.string(),
  kodPocztowy: z.string(),
  miasto: z.string(),
  ulica: z.string(),
  numerDomu: z.string(),
  numerLokalu: z.string(),
});

const create = async (req: Request, res: Response) => {
  const validation = createSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;

  const user = await prisma.pracownik.create({
    data: {
      id_firmy: body.idFirmy,
      id_uzytkownika: body.idUzytkownika,
      imie: body.imie,
      nazwisko: body.nazwisko,
      PESEL: body.PESEL,
      email: body.email,
      telefon: body.telefon,
      kraj: body.kraj,
      wojewodztwo: body.wojewodztwo,
      kod_pocztowy: body.kodPocztowy,
      miasto: body.miasto,
      ulica: body.ulica,
      numer_domu: body.numerDomu,
      numer_lokalu: body.numerLokalu,
    },
  });
  res.status(201).json(user);
};

export default {
  create,
};

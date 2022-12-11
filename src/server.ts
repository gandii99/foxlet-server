import express from "express";
require("express-async-errors");
import cors from "cors";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import employeesRoutes from "./routes/employees";
import { errorHandlerMiddleware } from "./middlewares";
import * as dotenv from "dotenv";
import authMiddleware from "./middlewares/is-logged";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000/",
  })
);

const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(morgan("tiny"));

app.get("/", async (req: Request, res: Response) => {
  // const companies = await prisma.firma.findMany();
  res.json("Server works!");
});

app.use("/api/auth", authRoutes);

app.use(authMiddleware);

app.use("/api/employees", employeesRoutes);
// app.use("/api/users, authRoutes");
// app.use("/api/products, authRoutes");
// app.use("/api/pallettes, authRoutes");

/*
-
-
-
-
-
*/

app.use(errorHandlerMiddleware);

app.listen(5000, () => {
  console.log("Application started on port 5000!");
});

// app.post("/companies", async (req: Request, res: Response) => {
//   const company = {
//     imie: "Radosław",
//     nazwisko: "Urban",
//     nazwa: "Foxlet",
//     NIP: "1231231231", //10 cyfr
//     REGON: "Radek", //10 cyfr
//     telefon: "536290099",
//     email: "urban_radoslaw@o2.pl",
//     kraj: "Polska",
//     wojewodztwo: "Małopolska",
//     kod_pocztowy: "33-180",
//     miasto: "Gromnik",
//     ulica: "Okulickiego",
//     numer_domu: "4",
//     numer_lokalu: "",
//   };

//   await prisma.firma.create({
//     data: company,
//   });

//   res.json("Firma została utworzona!");
// });

// app.post("/users", async (req: Request, res: Response) => {
//   const user = {
//     email: "urban_radoslaw@o2.pl",
//     haslo: "1234",
//     nazwa: "Gandi",
//     rola: "Pracownik",
//   };
//   try {
//     await prisma.uzytkownik.create({
//       data: user,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Użytkownik został utworzony!");
// });

// app.post("/employes", async (req: Request, res: Response) => {
//   const employee = {
//     id_firmy: 1,
//     id_uzytkownika: 1,
//     imie: "Radosław",
//     nazwisko: "Urban",
//     PESEL: "12312312312",
//     telefon: "536290099",
//     email: "urban_radoslaw@o2.pl",
//     kraj: "Polska",
//     wojewodztwo: "Małopolska",
//     kod_pocztowy: "33-180",
//     miasto: "Gromnik",
//     ulica: "Okulickiego",
//     numer_domu: "4",
//     numer_lokalu: "",
//   };
//   try {
//     await prisma.pracownik.create({
//       data: employee,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Pracownik został utworzony!");
// });

// app.post("/suppliers", async (req: Request, res: Response) => {
//   const supplier = {
//     imie: "Radosław",
//     nazwisko: "Urban",
//     nazwa: "KaufNet",
//     NIP: "1231231231",
//     REGON: "1231231231",
//     telefon: "536290099",
//     email: "radoslaw_urban@o2.pl",
//     kraj: "Polska",
//     wojewodztwo: "Małopolska",
//     kod_pocztowy: "33-180",
//     miasto: "Gromnik",
//     ulica: "Okulickiego",
//     numer_domu: "4",
//     numer_lokalu: "",
//   };
//   await prisma.dostawca.create({
//     data: supplier,
//   });
//   res.json("Dostawca został utworzony!");
// });

// app.post("/palettes", async (req: Request, res: Response) => {
//   const palette = {
//     id_dostawcy: 1,
//     id_pracownika: 1,
//     cena_zakupu: 23.99,
//     data_zakupu: new Date("2021-09-27"),
//     data_dostawy: new Date("2016-06-22"),
//   };
//   try {
//     await prisma.paleta.create({
//       data: palette,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Paleta została utworzona!");
// });

// app.post("/categories", async (req: Request, res: Response) => {
//   const categorie = {
//     nazwa: "Elektronika",
//     opis: "Rzeczy elektroniczne.",
//   };
//   try {
//     await prisma.kategoria.create({
//       data: categorie,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Kategoria została utworzona!");
// });

// app.post("/products", async (req: Request, res: Response) => {
//   const product = {
//     nazwa: "Sony Playstation 4 SLIM",
//     EAN: "7427257517342",
//     ASIN: "7427257517342",
//     Opis: "Konsola do gier",
//   };
//   try {
//     await prisma.produkt.create({
//       data: product,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Produkt została utworzona!");
// });

// app.post("/categories-products", async (req: Request, res: Response) => {
//   const categories_products = {
//     id_produktu: 1,
//     id_kategorii: 1,
//   };
//   try {
//     await prisma.kategoria_Produktu.create({
//       data: categories_products,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Kategoria została dodana do produktu!");
// });

// app.post("/statuses", async (req: Request, res: Response) => {
//   const status = {
//     nazwa: "Przyjęto",
//     opis: "Zamówienie przyjęte do realizacji.",
//   };
//   try {
//     await prisma.status.create({
//       data: status,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Status został utworzony!");
// });

// app.post("/states", async (req: Request, res: Response) => {
//   const state = {
//     nazwa: "Uszkodzone",
//     opis: "Produkt uszkodzony.",
//   };
//   try {
//     await prisma.stan.create({
//       data: state,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Stan został utworzony!");
// });

// app.post("/batches", async (req: Request, res: Response) => {
//   const batch = {
//     id_produktu: 1,
//     id_stanu: 1,
//     id_palety: 1,
//     ilosc_w_dostawie: 5,
//     ilosc_w_magazynie: 4,
//     cena_zakupu: 24.3,
//     cena_sprzedazy: 52.99,
//     opis: "Konsole lekko porysowane, sprawne",
//   };
//   try {
//     await prisma.partia.create({
//       data: batch,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Partia została utworzona!");
// });

// app.post("/customers", async (req: Request, res: Response) => {
//   const customer = {
//     id_uzytkownika: 1,
//     imie: "Radosław",
//     nazwisko: "Urban",
//     nazwa_firmy: "FoxletKlient",
//     NIP: "1231231231",
//     REGON: "1231231231",
//     telefon: "536290099",
//     email: "urban_radoslaw@o2.pl",
//     kraj: "Polska",
//     wojewodztwo: "Małopolska",
//     kod_pocztowy: "33-180",
//     miasto: "Gromnik",
//     ulica: "Okulickiego",
//     numer_domu: "4",
//     numer_lokalu: "",
//   };
//   try {
//     await prisma.klient.create({
//       data: customer,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Klient został utworzony!");
// });

// app.post("/orders", async (req: Request, res: Response) => {
//   const order = {
//     id_klienta: 1,
//     data_zamowienia: new Date("2021-09-27"),
//     cena_zamowienia: 256.3,
//     uwagi: "",
//   };
//   try {
//     await prisma.zamowienie.create({
//       data: order,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Zamówienie został utworzone!");
// });

// app.post("/banches-products", async (req: Request, res: Response) => {
//   const categories_products = {
//     id_produktu: 1,
//     id_kategorii: 1,
//   };
//   try {
//     await prisma.kategoria_Produktu.create({
//       data: categories_products,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       res.json(err.message);
//     }
//   }
//   res.json("Kategoria została dodana do produktu!");
// });

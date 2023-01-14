import express from "express";
require("express-async-errors");
import cors from "cors";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import employeesRoutes from "./routes/employees";
import palletsRoutes from "./routes/pallets";
import companiesRoutes from "./routes/companies";
import suppliersRoutes from "./routes/suppliers";
import productsRoutes from "./routes/products";
import usersRoutes from "./routes/users";
import conditionsRoutes from "./routes/conditions";
import batchesRoutes from "./routes/batches";
import imagesRoutes from "./routes/images";
import { errorHandlerMiddleware } from "./middlewares";
import * as dotenv from "dotenv";
import authMiddleware from "./middlewares/is-logged";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
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
app.use("/api/pallets", palletsRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/conditions", conditionsRoutes);
app.use("/api/batches", batchesRoutes);
app.use("/api/images", imagesRoutes);

app.use(errorHandlerMiddleware);

app.listen(5000, () => {
  console.log("Application started on port 5000!");
});

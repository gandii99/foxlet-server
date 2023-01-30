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
import clientsRoutes from "./routes/clients";
import categoriesRoutes from "./routes/categories";
import ordersRoutes from "./routes/orders";
import statusesRoutes from "./routes/statuses";
import { errorHandlerMiddleware } from "./middlewares";
import * as dotenv from "dotenv";
import authMiddleware from "./middlewares/is-logged";
import { prisma } from "./lib/prisma-client";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://foxlet-client.onrender.com"],
  })
);

const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(morgan("tiny"));
// async function initData() {
//   const category = await prisma.category.findMany();
//   if (category.length <= 0) {
//     const statuses = await prisma.status.createMany({
//       data: order_status_database,
//     });
//     const conditions = await prisma.condition.createMany({
//       data: product_condition_database,
//     });
//     const categories = await prisma.category.createMany({
//       data: product_categories_database,
//     });
//     const products = await prisma.product.createMany({
//       data: products_database,
//     });
//   }
// }
// initData();

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
app.use("/api/clients", clientsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/statuses", statusesRoutes);

app.use(errorHandlerMiddleware);

export default app;

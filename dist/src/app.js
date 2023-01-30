"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const employees_1 = __importDefault(require("./routes/employees"));
const pallets_1 = __importDefault(require("./routes/pallets"));
const companies_1 = __importDefault(require("./routes/companies"));
const suppliers_1 = __importDefault(require("./routes/suppliers"));
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
const conditions_1 = __importDefault(require("./routes/conditions"));
const batches_1 = __importDefault(require("./routes/batches"));
const clients_1 = __importDefault(require("./routes/clients"));
const categories_1 = __importDefault(require("./routes/categories"));
const orders_1 = __importDefault(require("./routes/orders"));
const statuses_1 = __importDefault(require("./routes/statuses"));
const middlewares_1 = require("./middlewares");
const dotenv = __importStar(require("dotenv"));
const is_logged_1 = __importDefault(require("./middlewares/is-logged"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
}));
const jsonParser = body_parser_1.default.json();
app.use(jsonParser);
app.use((0, morgan_1.default)("tiny"));
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
app.get("/", async (req, res) => {
    // const companies = await prisma.firma.findMany();
    res.json("Server works!");
});
app.use("/api/auth", auth_1.default);
app.use(is_logged_1.default);
app.use("/api/employees", employees_1.default);
app.use("/api/pallets", pallets_1.default);
app.use("/api/companies", companies_1.default);
app.use("/api/suppliers", suppliers_1.default);
app.use("/api/products", products_1.default);
app.use("/api/users", users_1.default);
app.use("/api/conditions", conditions_1.default);
app.use("/api/batches", batches_1.default);
app.use("/api/clients", clients_1.default);
app.use("/api/categories", categories_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/statuses", statuses_1.default);
app.use(middlewares_1.errorHandlerMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map
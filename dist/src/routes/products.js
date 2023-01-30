"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("../controllers/products"));
const router = (0, express_1.Router)();
router.post("/", products_1.default.createProduct);
router.get("/", products_1.default.getAllProducts);
router.get("/my-products", products_1.default.getMyProducts);
router.get("/:id", products_1.default.getSelectedProducts);
exports.default = router;
//# sourceMappingURL=products.js.map
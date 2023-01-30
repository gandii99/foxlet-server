"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suppliers_1 = __importDefault(require("../controllers/suppliers"));
const router = (0, express_1.Router)();
router.post("/", suppliers_1.default.createSupplier);
router.get("/", suppliers_1.default.getAllSuppliers);
router.get("/my-suppliers", suppliers_1.default.getMySuppliers);
router.delete("/my-suppliers/:id", suppliers_1.default.deleteSupplier);
router.get("/:id", suppliers_1.default.getSelectedSuppliers);
exports.default = router;
//# sourceMappingURL=suppliers.js.map
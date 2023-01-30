"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = __importDefault(require("../controllers/orders"));
const router = (0, express_1.Router)();
router.post("/", orders_1.default.createOrder);
router.delete("/:id", orders_1.default.deleteOrder);
router.get("/my-orders", orders_1.default.getMyOrders);
exports.default = router;
//# sourceMappingURL=orders.js.map
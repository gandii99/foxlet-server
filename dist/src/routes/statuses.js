"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statuses_1 = __importDefault(require("../controllers/statuses"));
const router = (0, express_1.Router)();
router.get("/", statuses_1.default.getAllStatuses);
router.get("/:id", statuses_1.default.getOrderStatus);
router.post("/", statuses_1.default.updateStatus);
exports.default = router;
//# sourceMappingURL=statuses.js.map
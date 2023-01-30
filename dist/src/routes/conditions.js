"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conditions_1 = __importDefault(require("../controllers/conditions"));
const router = (0, express_1.Router)();
router.post("/", conditions_1.default.createCondition);
router.get("/", conditions_1.default.getAllConditions);
exports.default = router;
//# sourceMappingURL=conditions.js.map
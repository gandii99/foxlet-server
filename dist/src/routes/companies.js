"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companies_1 = __importDefault(require("../controllers/companies"));
const router = (0, express_1.Router)();
router.post("/", companies_1.default.createCompany);
router.get("/", companies_1.default.getAllCompanies);
router.patch("/my-company", companies_1.default.updateMyCompany);
router.get("/my-company", companies_1.default.getMyCompan);
router.delete("/my-company", companies_1.default.deleteMyCompany);
router.patch("/switch-company", companies_1.default.switchMyCompany);
router.get("/:id", companies_1.default.getSelectedCompanies);
exports.default = router;
//# sourceMappingURL=companies.js.map
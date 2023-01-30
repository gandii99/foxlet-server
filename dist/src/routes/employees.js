"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_1 = __importDefault(require("../controllers/employees"));
const router = (0, express_1.Router)();
router.post("/", employees_1.default.createEmployee);
router.get("/", employees_1.default.getAllEmployees);
router.get("/my-employee-profile", employees_1.default.getMyEmployeeProfile);
router.patch("/my-employee-profile", employees_1.default.updateMyEmployeeProfileData);
router.get("/:id", employees_1.default.getSelectedEmployees);
exports.default = router;
//# sourceMappingURL=employees.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_1 = __importDefault(require("../controllers/clients"));
const router = (0, express_1.Router)();
router.post("/", clients_1.default.createClient);
router.get("/", clients_1.default.getAllClients);
router.patch("/my-clients/:id", clients_1.default.updateMyClient);
router.delete("/my-clients/:id", clients_1.default.deleteClient);
router.get("/my-clients", clients_1.default.getMyClients);
router.get("/:id", clients_1.default.getSelectedClient);
exports.default = router;
//# sourceMappingURL=clients.js.map
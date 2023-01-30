"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pallets_1 = __importDefault(require("../controllers/pallets"));
const router = (0, express_1.Router)();
router.post("/", pallets_1.default.createPallet);
router.get("/", pallets_1.default.getAllPalettes);
router.get("/my-pallets", pallets_1.default.getMyPallets);
router.patch("/:id", pallets_1.default.updatePallet);
router.delete("/:id", pallets_1.default.deletePallet);
router.get("/:id", pallets_1.default.getSelectedPalettes);
exports.default = router;
//# sourceMappingURL=pallets.js.map
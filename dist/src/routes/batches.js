"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const batches_1 = __importDefault(require("../controllers/batches"));
const router = (0, express_1.Router)();
router.post("/", batches_1.default.createBatch);
router.get("/", batches_1.default.getAllBatches);
router.delete("/:id", batches_1.default.deleteBatch);
router.get("/my-batches", batches_1.default.getMybatches);
router.get("/my-batches-sold", batches_1.default.getMybatchesOutOfStock);
exports.default = router;
//# sourceMappingURL=batches.js.map
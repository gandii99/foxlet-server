import { Router } from "express";
import batchesRouter from "../controllers/batches";

const router = Router();

router.post("/", batchesRouter.createBatch);
router.get("/", batchesRouter.getAllBatches);
router.delete("/:id", batchesRouter.deleteBatch);
router.get("/my-batches", batchesRouter.getMybatches);

export default router;

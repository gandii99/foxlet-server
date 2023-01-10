import { Router } from "express";
import batchesRouter from "../controllers/batches";

const router = Router();

router.post("/", batchesRouter.createBatch);
router.get("/", batchesRouter.getAllBatches);
router.patch("/my-batches", batchesRouter.getMybatches);

export default router;

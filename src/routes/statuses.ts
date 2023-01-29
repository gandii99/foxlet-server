import { Router } from "express";
import statusesRoutes from "../controllers/statuses";

const router = Router();

router.get("/", statusesRoutes.getAllStatuses);
router.get("/:id", statusesRoutes.getOrderStatus);
router.post("/", statusesRoutes.updateStatus);

export default router;

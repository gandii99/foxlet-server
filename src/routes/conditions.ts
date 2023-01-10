import { Router } from "express";
import conditionsRoutes from "../controllers/conditions";

const router = Router();

router.post("/", conditionsRoutes.createCondition);
router.get("/", conditionsRoutes.getAllConditions);

export default router;

import { Router } from "express";
import suppliersRouter from "../controllers/suppliers";

const router = Router();

router.post("/", suppliersRouter.createSupplier);
router.get("/", suppliersRouter.getAllSuppliers);
router.get("/my-suppliers", suppliersRouter.getMySuppliers);
router.get("/:id", suppliersRouter.getSelectedSuppliers);

export default router;

import { Router } from "express";
import suppliersRouter from "../controllers/suppliers";

const router = Router();

router.post("/", suppliersRouter.createSupplier);
router.get("/", suppliersRouter.getAllSuppliers);
router.get("/my-suppliers", suppliersRouter.getMySuppliers);
router.delete("/my-suppliers/:id", suppliersRouter.deleteSupplier);
router.get("/:id", suppliersRouter.getSelectedSuppliers);

export default router;

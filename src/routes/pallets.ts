import { Router } from "express";
import palletsRouter from "../controllers/pallets";

const router = Router();

router.post("/", palletsRouter.createPallet);
router.get("/", palletsRouter.getAllPalettes);
router.get("/my-pallets", palletsRouter.getMyPallets);
router.patch("/:id", palletsRouter.updatePallet);
router.delete("/:id", palletsRouter.deletePallet);
router.get("/:id", palletsRouter.getSelectedPalettes);

export default router;

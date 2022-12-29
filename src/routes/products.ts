import { Router } from "express";
import productsRouter from "../controllers/products";

const router = Router();

router.post("/", productsRouter.createProduct);
router.get("/", productsRouter.getAllProducts);
router.get("/:id", productsRouter.getSelectedProducts);

export default router;

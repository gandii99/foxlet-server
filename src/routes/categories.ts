import { Router } from "express";
import categoriesRouter from "../controllers/categories";

const router = Router();

router.post("/", categoriesRouter.createCategory);
router.get("/", categoriesRouter.getAllCategories);

export default router;

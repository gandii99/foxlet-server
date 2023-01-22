import { Router } from "express";
import companiesRouter from "../controllers/companies";

const router = Router();

router.post("/", companiesRouter.createCompany);
router.get("/", companiesRouter.getAllCompanies);
router.patch("/my-company", companiesRouter.updateMyCompany);
router.get("/my-company", companiesRouter.getMyCompan);
router.delete("/my-company", companiesRouter.deleteMyCompany);
router.patch("/switch-company", companiesRouter.switchMyCompany);
router.get("/:id", companiesRouter.getSelectedCompanies);

export default router;

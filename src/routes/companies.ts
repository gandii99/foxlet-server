import { Router } from "express";
import companiesRouter from "../controllers/companies";

const router = Router();

router.post("/", companiesRouter.createCompany);
router.get("/", companiesRouter.getAllCompanies);
router.get("/my-company-profile", companiesRouter.getMyCompanProfile);
router.get("/:id", companiesRouter.getSelectedCompanies);

export default router;

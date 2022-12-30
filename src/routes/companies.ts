import { Router } from "express";
import companiesRouter from "../controllers/companies";

const router = Router();

router.post("/", companiesRouter.createCompany);
router.get("/", companiesRouter.getAllCompanies);
router.patch("/my-company-profile", companiesRouter.updateMyCompanyProfileData);
router.get("/my-company-profile", companiesRouter.getMyCompanProfile);
router.get("/:id", companiesRouter.getSelectedCompanies);

export default router;

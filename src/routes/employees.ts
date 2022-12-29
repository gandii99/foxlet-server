import { Router } from "express";
import employeesRouter from "../controllers/employees";

const router = Router();

router.post("/", employeesRouter.createEmployee);
router.get("/", employeesRouter.getAllEmployees);
router.get("/my-employee-profile", employeesRouter.getMyEmployeeProfile);
router.get("/:id", employeesRouter.getSelectedEmployees);

export default router;
